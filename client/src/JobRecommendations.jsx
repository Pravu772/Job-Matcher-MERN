import React from "react";
import axios from "axios";

const JobRecommendations = ({ jobs }) => {
  const handleSave = async (job) => {
    try {
      await axios.post("http://localhost:5000/api/saved-jobs", {
        title: job.title,
        matchedSkills: job.matchedSkills,
      });
      alert(` Saved "${job.title}" successfully!`);
    } catch (err) {
      console.error("Error saving job:", err);
      alert(" Failed to save job.");
    }
  };

  if (!jobs || !jobs.length) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4"> Top Job Recommendations</h2>

      <div className="row">
        {jobs.slice(0, 3).map((job, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">
                  <strong>Matched Skills:</strong>{" "}
                  <span className="text-primary">
                    {job.matchedSkills?.join(", ") || "N/A"}
                  </span>
                </p>
                <button
                  onClick={() => handleSave(job)}
                  className="btn btn-success btn-sm"
                >
                   Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
