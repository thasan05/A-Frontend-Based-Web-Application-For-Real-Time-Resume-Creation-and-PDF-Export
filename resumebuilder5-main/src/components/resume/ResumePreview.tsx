import { useEffect, useRef, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Layout } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { TemplateType } from "@/types/resume";

const PAGE_W = 595;
const PAGE_H = 842;

const ResumePreview = () => {
  const { resumeData, template, setTemplate } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      setScale(Math.min(1, w / PAGE_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setExporting(true);

    // Clone the resume element into body with NO transforms
    // so html2canvas captures the full-resolution, untransformed DOM
    const original = previewRef.current;
    const clone = original.cloneNode(true) as HTMLElement;

    clone.style.position = "fixed";
    clone.style.top = "-99999px";
    clone.style.left = "-99999px";
    clone.style.width = `${PAGE_W}px`;
    clone.style.minHeight = `${PAGE_H}px`;
    clone.style.transform = "none";
    clone.style.transformOrigin = "top left";
    clone.style.zIndex = "-9999";
    clone.style.overflow = "visible";
    clone.style.backgroundColor = "#ffffff";

    document.body.appendChild(clone);

    // Give the browser a moment to paint the clone
    await new Promise((r) => setTimeout(r, 150));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: PAGE_W,
        height: clone.scrollHeight,
        windowWidth: PAGE_W,
      });

      // Verify we got real canvas data before handing to jsPDF
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("html2canvas returned an empty canvas.");
      }

      // Draw white background explicitly (prevents transparency → JPEG artifact)
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.fullName || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Export failed — check the console for details.");
    } finally {
      document.body.removeChild(clone);
      setExporting(false);
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case "modern": return <ModernTemplate data={resumeData} />;
      case "minimal": return <MinimalTemplate data={resumeData} />;
      case "professional": return <ProfessionalTemplate data={resumeData} />;
      case "creative": return <CreativeTemplate data={resumeData} />;
      default: return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 glass border-b border-border/50">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={template} onValueChange={(v) => setTemplate(v as TemplateType)}>
            <SelectTrigger className="w-32 sm:w-40 rounded-full border-border/60 bg-card/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="classic">✦ Classic</SelectItem>
              <SelectItem value="modern">◆ Modern</SelectItem>
              <SelectItem value="minimal">○ Minimal</SelectItem>
              <SelectItem value="professional">▲ Professional</SelectItem>
              <SelectItem value="creative">✺ Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleExportPDF}
          disabled={exporting}
          size="sm"
          className="gradient-bg hover:opacity-90 text-primary-foreground rounded-full shadow-elegant gap-1.5"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">{exporting ? "Exporting…" : "Export PDF"}</span>
          <span className="sm:hidden">{exporting ? "…" : "PDF"}</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-3 sm:p-6 lg:p-8">
        <div ref={wrapRef} className="mx-auto w-full max-w-[595px]">
          <div style={{ height: PAGE_H * scale, width: "100%", position: "relative" }}>
            <div
              ref={previewRef}
              className="bg-white shadow-elegant rounded-lg overflow-hidden animate-fade-in"
              style={{
                width: PAGE_W,
                minHeight: PAGE_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;