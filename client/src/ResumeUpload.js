import React, { useState } from "react";
import axios from "axios";
import JobRecommendations from "./JobRecommendations"; // ✅ Reuse your component

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setExtractedText(res.data.text);
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Resume Upload</h2>

      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {extractedText && (
        <div className="card mt-4 p-3 shadow-sm">
          <h4 className="mb-3"> Extracted Text</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>{extractedText}</pre>
        </div>
      )}

      {/* ✅ Job Recommendations */}
      <div className="mt-4">
        <JobRecommendations jobs={recommendations} />
      </div>
    </div>
  );
}

export default ResumeUpload;
