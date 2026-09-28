import { useState } from "react";

function ImageNotes() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("Detailed");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const isImage = selectedFile.type.startsWith("image/");
    const isPDF = selectedFile.type === "application/pdf";

    if (!isImage && !isPDF) {
      alert("Please select an image or PDF file.");
      return;
    }

    setFile(selectedFile);
    setNotes("");

    if (isImage) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreview(fileUrl);
    } else {
      setPreview("");
    }
  };

  const generateNotes = () => {
    if (!file) {
      alert("Please upload an image or PDF first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const fileType =
        file.type === "application/pdf"
          ? "PDF"
          : "Image";

      const generatedNotes = `
StudyAI ${fileType} to Notes

File:
${file.name}

Language:
${language}

Notes Style:
${style}

File uploaded successfully.

StudyAI is ready to process this study material.

After real AI integration, StudyAI will analyze the uploaded ${fileType.toLowerCase()} and create:

• Important concepts
• Definitions
• Key points
• Examples
• Exam-focused notes
• Quick revision points
• Step-by-step explanations
• Important questions

The real AI document analysis system will be connected during the final AI integration stage.
      `.trim();

      setNotes(generatedNotes);
      setLoading(false);
    }, 900);
  };

  const copyNotes = async () => {
    if (!notes) {
      return;
    }

    await navigator.clipboard.writeText(notes);
    alert("Notes copied successfully.");
  };

  const saveNotes = () => {
    if (!notes) {
      return;
    }

    const savedNotes =
      JSON.parse(
        localStorage.getItem("studyAI_savedNotes")
      ) || [];

    savedNotes.push({
      id: Date.now(),
      subject: "File Notes",
      topic: file?.name || "Uploaded File",
      notes,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "studyAI_savedNotes",
      JSON.stringify(savedNotes)
    );

    alert("Notes saved successfully.");
  };

  const clearFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
    setNotes("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "60px",
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
          maxWidth: "1100px",
          margin: "auto",
          padding: "60px 25px 90px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
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
            📚 FILE TO NOTES
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-2px",
              marginBottom: "15px",
            }}
          >
            Turn Images & PDFs Into Study Notes
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
              lineHeight: "1.7",
            }}
          >
            Upload a textbook image or PDF and prepare it
            for AI-powered study notes.
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(280px, 0.9fr) minmax(320px, 1.1fr)",
            gap: "25px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "22px",
              padding: "28px",
              boxShadow:
                "0 12px 35px rgba(15, 23, 42, 0.05)",
            }}
          >
            <h2>📤 Upload Study Material</h2>

            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "230px",
                marginTop: "20px",
                padding: "25px",
                border: "2px dashed #bfdbfe",
                borderRadius: "16px",
                background: "#f8fbff",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "50px" }}>
                📚
              </div>

              <strong
                style={{
                  marginTop: "12px",
                }}
              >
                Choose an image or PDF
              </strong>

              <span
                style={{
                  color: "#9ca3af",
                  marginTop: "7px",
                  fontSize: "13px",
                }}
              >
                JPG, PNG, WEBP or PDF
              </span>

              <input
                type="file"
                accept="image/*,.pdf,application/pdf"
                onChange={handleFile}
                style={{
                  display: "none",
                }}
              />
            </label>

            {file && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  background: "#f3f4f6",
                  borderRadius: "10px",
                  fontSize: "13px",
                }}
              >
                📎 <strong>{file.name}</strong>
                <br />
                <span
                  style={{
                    color: "#6b7280",
                  }}
                >
                  {file.type === "application/pdf"
                    ? "PDF document"
                    : "Image file"}
                </span>
              </div>
            )}

            <label
              style={{
                display: "block",
                marginTop: "22px",
                marginBottom: "8px",
                fontWeight: "700",
              }}
            >
              Language
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <option>English</option>
              <option>Punjabi</option>
              <option>Punjabi-English</option>
            </select>

            <label
              style={{
                display: "block",
                marginTop: "18px",
                marginBottom: "8px",
                fontWeight: "700",
              }}
            >
              Notes Style
            </label>

            <select
              value={style}
              onChange={(e) =>
                setStyle(e.target.value)
              }
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <option>Detailed</option>
              <option>Quick Revision</option>
              <option>Exam Focused</option>
              <option>Step-by-step</option>
            </select>

            <button
              onClick={generateNotes}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "24px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                padding: "14px",
                borderRadius: "11px",
                fontWeight: "800",
                cursor: loading
                  ? "wait"
                  : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "⏳ Processing..."
                : "✨ Create Notes"}
            </button>

            {file && (
              <button
                onClick={clearFile}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #d1d5db",
                  background: "#ffffff",
                  color: "#374151",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🗑️ Remove File
              </button>
            )}
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "22px",
              padding: "28px",
              boxShadow:
                "0 12px 35px rgba(15, 23, 42, 0.05)",
            }}
          >
            <h2>
              {file?.type === "application/pdf"
                ? "📄 PDF Selected"
                : "🖼️ Image Preview"}
            </h2>

            <div
              style={{
                minHeight: "300px",
                marginTop: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                background: "#fcfcfd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Uploaded study material"
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                  }}
                />
              ) : file?.type ===
                "application/pdf" ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "70px",
                    }}
                  >
                    📄
                  </div>

                  <h3
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    PDF Ready
                  </h3>

                  <p
                    style={{
                      color: "#6b7280",
                      marginTop: "8px",
                    }}
                  >
                    {file.name}
                  </p>

                  <p
                    style={{
                      color: "#9ca3af",
                      marginTop: "10px",
                      fontSize: "13px",
                    }}
                  >
                    The PDF is ready for AI processing.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#9ca3af",
                    padding: "30px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "55px",
                    }}
                  >
                    📚
                  </div>

                  <p
                    style={{
                      marginTop: "12px",
                    }}
                  >
                    Your uploaded file will appear here.
                  </p>
                </div>
              )}
            </div>

            {notes && (
              <>
                <h2
                  style={{
                    marginTop: "28px",
                  }}
                >
                  📖 Generated Notes
                </h2>

                <div
                  style={{
                    marginTop: "15px",
                    padding: "20px",
                    background: "#fcfcfd",
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                  }}
                >
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      fontFamily: "Arial, sans-serif",
                      lineHeight: "1.7",
                      color: "#374151",
                    }}
                  >
                    {notes}
                  </pre>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={copyNotes}
                    style={{
                      flex: 1,
                      border: "1px solid #d1d5db",
                      background: "#ffffff",
                      padding: "12px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={saveNotes}
                    style={{
                      flex: 1,
                      border: "1px solid #d1d5db",
                      background: "#ffffff",
                      padding: "12px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    💾 Save
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ImageNotes;