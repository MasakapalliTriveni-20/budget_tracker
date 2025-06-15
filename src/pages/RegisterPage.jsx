import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("Account already exists.");
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully!");
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      if (onLogin) onLogin();
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-300 to-purple-400">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
