import React, { useRef, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

const Preview = ({ data, onOverflowChange }) => {
  const { personalInfo, sections } = data;
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const checkOverflowAndScale = () => {
      if (containerRef.current) {
        // A4 height is roughly 1122px at 96dpi, but we use the fixed height from CSS
        const isOverflowing =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasOverflow(isOverflowing);
        if (onOverflowChange) {
          onOverflowChange(isOverflowing);
        }
      }

      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;
        // A4 width in pixels is roughly 794px at 96dpi.
        const a4Width = 794;
        if (wrapperWidth < a4Width) {
          setScale(wrapperWidth / a4Width);
        } else {
          setScale(1);
        }
      }
    };

    checkOverflowAndScale();
    // Re-check on content changes or window resize
    const observer = new ResizeObserver(checkOverflowAndScale);
    if (containerRef.current) observer.observe(containerRef.current);
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [data, onOverflowChange]);

  // A4 original height is 1122px. We adjust wrapper height so the scaled document doesn't leave huge empty space.
  const scaledHeight = 1122 * scale;

  return (
    <div className="relative group w-full flex justify-center" ref={wrapperRef} style={{ height: `${scaledHeight}px` }}>
      <div
        id="cv-preview"
        ref={containerRef}
        className="page-a4 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 origin-top transition-transform duration-300 bg-white absolute top-0"
        style={{ 
          color: "#1e293b",
          transform: `scale(${scale})`
        }}
      >
        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
          <h1
            className="text-3xl font-bold uppercase tracking-tight"
            style={{ color: "#0f172a" }}>
            {personalInfo.name}
          </h1>
          <p className="font-semibold mt-1 mb-3" style={{ color: "#1d4ed8" }}>
            {personalInfo.title}
          </p>
          <div
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm"
            style={{ color: "#475569" }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.id}>
              <h2
                className="text-base font-bold uppercase tracking-wider border-b border-slate-300 mb-2"
                style={{ color: "#0f172a" }}>
                {section.title}
              </h2>

              {section.type === "text" && (
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: "#334155" }}>
                  {section.content}
                </p>
              )}

              {section.type === "list" && (
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-bold" style={{ color: "#0f172a" }}>
                          {item.company}
                        </h3>
                        <span
                          className="font-medium italic"
                          style={{ color: "#64748b" }}>
                          {item.startDate} — {item.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span
                          className="font-semibold italic"
                          style={{ color: "#334155" }}>
                          {item.position}
                        </span>
                        <span
                          className="text-xs uppercase"
                          style={{ color: "#64748b" }}>
                          {item.location}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className="leading-relaxed whitespace-pre-wrap"
                          style={{ color: "#475569" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "tags" && (
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {section.items.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm"
                      style={{ color: "#334155" }}>
                      {tag}
                      {i < section.items.length - 1 ? " •" : ""}
                    </span>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
