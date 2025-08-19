import React, { useState } from "react";
import axios from "axios";

function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage(res.data.message || "Registered successfully!");
      setForm({ name: "", email: "", password: "" });

      if (onRegister) onRegister(); // ✅ After successful register, go to login
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" id="register">
      <h2 className="text-center mb-4"> Register</h2>
      <form
        onSubmit={handleRegister}
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter a password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
