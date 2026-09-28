import { useState } from "react";
import { jsPDF } from "jspdf";

function PDF() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const downloadPDF = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter PDF title and study material.");
      return;
    }

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(title, margin, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(
      content,
      maxWidth
    );

    let y = 40;

    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(line, margin, y);
      y += 7;
    });

    const fileName =
      title.replace(/[^a-z0-9]/gi, "_") ||
      "StudyAI_Notes";

    doc.save(`${fileName}.pdf`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          height: "72px",
          padding: "0 7%",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            border: "1px solid #d1d5db",
            background: "#ffffff",
            padding: "10px 16px",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          ← Home
        </button>

        <div
          style={{
            fontSize: "23px",
            fontWeight: "800",
          }}
        >
          🎓 StudyAI
        </div>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "60px 25px 90px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            📄 PDF MAKER
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-2px",
              marginBottom: "15px",
            }}
          >
            Create Your Study PDF
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
              lineHeight: "1.7",
            }}
          >
            Add your study material and download it as a PDF.
          </p>
        </div>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "22px",
            padding: "30px",
            boxShadow:
              "0 12px 35px rgba(15, 23, 42, 0.05)",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            PDF Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Class 12 Biology Notes"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: "700",
              marginTop: "22px",
              marginBottom: "8px",
            }}
          >
            Study Material
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your notes, answers or study material here..."
            rows="18"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              lineHeight: "1.6",
              resize: "vertical",
              fontFamily: "Arial, sans-serif",
              outline: "none",
            }}
          />

          <button
            onClick={downloadPDF}
            style={{
              width: "100%",
              marginTop: "22px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              padding: "15px",
              borderRadius: "11px",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            📥 Download PDF
          </button>
        </section>
      </main>
    </div>
  );
}

export default PDF;