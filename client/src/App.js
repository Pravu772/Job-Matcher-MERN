import React, { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import SavedJobs from "./SavedJobs";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState("upload");

  return (
    <div className="container my-4">
      {/* Navbar with section change handler */}
      <Navbar setActiveSection={setActiveSection} />

      {/* Upload Section */}
      {activeSection === "upload" && (
        <div className="card p-4 mb-4 shadow-sm">
          <ResumeUpload />
        </div>
      )}

      {/* Saved Jobs Section */}
      {activeSection === "saved" && (
        <div className="card p-4 mb-4 shadow-sm">
          <SavedJobs />
        </div>
      )}

      {/* Register Section */}
      {activeSection === "register" && (
        <div className="card p-4 mb-4 shadow-sm">
          <RegisterForm />
        </div>
      )}

      {/* Login Section */}
      {activeSection === "login" && (
        <div className="card p-4 mb-4 shadow-sm">
          <LoginForm setActiveSection={setActiveSection} />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-muted mt-4">
        <small>© {new Date().getFullYear()} Job Matcher. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
