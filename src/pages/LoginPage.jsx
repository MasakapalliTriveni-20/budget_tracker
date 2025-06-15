import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check against registered users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(found));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
        style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', width: '100%', maxWidth: 400 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          style={{ width: '100%', padding: '12px 16px', marginBottom: 16, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          style={{ width: '100%', padding: '12px 16px', marginBottom: 16, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          style={{ width: '100%', background: '#6366f1', color: '#fff', padding: 12, borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer' }}
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
