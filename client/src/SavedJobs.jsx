import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/saved-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch saved jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/saved-jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/saved-jobs/${id}`, {
        title: editedTitle,
      });
      setJobs(
        jobs.map((job) =>
          job._id === id ? { ...job, title: editedTitle } : job
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> Saved Jobs</h2>

      {loading ? (
        <p className="text-center">⏳ Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-muted">No saved jobs found.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-6 mb-4" key={job._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {editingId === job._id ? (
                    <>
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="form-control mb-2"
                      />
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => saveEdit(job._id)}
                          className="btn btn-success btn-sm"
                        >
                           Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="btn btn-secondary btn-sm"
                        >
                           Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{job.title}</h5>
                      <p className="card-text text-muted">
                        <strong>Skills:</strong>{" "}
                        <span className="text-primary">
                          {job.matchedSkills.join(", ")}
                        </span>
                      </p>
                      <p
                        className="text-end text-secondary"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Saved on: {new Date(job.savedAt).toLocaleString()}
                      </p>
                      <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                          onClick={() => startEditing(job._id, job.title)}
                          className="btn btn-warning btn-sm"
                        >
                           Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-danger btn-sm"
                        >
                           Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
