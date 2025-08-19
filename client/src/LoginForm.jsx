import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setActiveSection }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      setMessage(res.data.message || "Login successful!");
      localStorage.setItem("token", res.data.token);
      setForm({ email: "", password: "" });

      // ✅ Automatically redirect to Upload section after 1s
      setTimeout(() => {
        setActiveSection("upload");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> Login</h2>
      <form
        onSubmit={handleLogin}
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label className="form-label">Email address</label>
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
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("register");
            }}
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
