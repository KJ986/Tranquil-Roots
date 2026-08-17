import { useState } from "react";
import "../styles/Auth.css";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to log in."
        );
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

 
    return (
  <main className="auth-page">
    <section className="auth-card">
      <p className="auth-eyebrow">
        Welcome to Tranquil Roots
      </p>

      <h1>Welcome Back</h1>

      <p className="auth-subtitle">
        Sign in to continue your wellness journey.
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <button
          className="button button--primary auth-submit"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="auth-switch">
        New to Tranquil Roots?{" "}
        <Link to="/register">
    Create an account
  </Link>
          Create an account
    
      </p>
    </section>
  </main>
);
  
}

export default Login;