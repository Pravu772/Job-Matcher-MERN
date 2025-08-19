import React, { useEffect, useState } from "react";
import axios from "axios";

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/saved-jobs") // ⚠️ Adjust route if needed
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/saved-jobs/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  return (
    <div>
      <h4 className="mb-3">💼 All Saved Jobs</h4>
      <ul className="list-group">
        {jobs.map((job) => (
          <li key={job._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{job.title}</strong> <br />
              <small>Matched Skills: {job.matchedSkills?.join(", ")}</small>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsList;
