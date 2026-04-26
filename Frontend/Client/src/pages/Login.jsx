import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    const res = await loginUser(form);

    console.log("LOGIN RESPONSE:", res.data); // 👈 debug

    // ✅ Save token
    localStorage.setItem("token", res.data.token);

    // 🔥 SAFE SAVE (even if backend thoda different ho)
    const userData = res.data.user || {
      name: res.data.name,
      email: res.data.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // 🔥 IMPORTANT (force UI update)
    window.location.href = "/dashboard";

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <LoginForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;