import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
    <main className="login-page">
      <h1>Welcome Back</h1>

      <p>
        Sign in to continue your Tranquil Roots wellness journey.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p>{message}</p>}

        <button
          className="button button--primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}

export default Login;