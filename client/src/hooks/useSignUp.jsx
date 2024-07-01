import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setError } from "../redux/slices/error.slice";
import { setLoading } from "../redux/slices/loading.slice";
import { setSuccess } from "../redux/slices/success.slice";
import { setUser } from "../redux/slices/user.slice";
import { signup } from "../api/auth.api";

export default function useSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSigupClick = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const res = await signup({ name, email, password });
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      dispatch(setUser(res.user));
      dispatch(setSuccess(res.message));
      navigate("/dashboard");
    }
    dispatch(setLoading(false));
  };

  return {
    handleSigupClick,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  };
}
