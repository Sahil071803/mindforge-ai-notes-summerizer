import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <RegisterForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Register;