import React, { useState } from "react";
import axios from "axios";
import JobRecommendations from "./JobRecommendations";
import { useNavigate } from "react-router-dom"; // ✅ import here

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // ✅ add hook

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Choose a file first!");
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setExtractedText(res.data.text);
      setJobs([]); // reset old recommendations
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/job/recommend",
        { resumeText: extractedText }
      );
      setJobs(res.data.recommendedJobs);
    } catch (err) {
      alert("Recommender error");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2>📄 Upload Your Resume</h2>

      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Uploading…" : "Upload"}
      </button>

      {/* 🔁 Go to Saved Jobs Button */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => navigate("/saved-jobs")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
           View Saved Jobs
        </button>
      </div>

      {/* Show extracted text */}
      {extractedText && (
        <>
          <div style={{ marginTop: "1.5rem" }}>
            <h3> Extracted Text</h3>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "1rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {extractedText}
            </pre>
          </div>

          {/* Button to fetch job matches */}
          <button onClick={getRecommendations} style={{ marginTop: "1rem" }}>
            Get Job Recommendations
          </button>
        </>
      )}

      {/* Render recommended jobs */}
      <JobRecommendations jobs={jobs} />
    </div>
  );
};

export default ResumeUpload;
