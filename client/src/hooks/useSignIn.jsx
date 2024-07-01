import { useDispatch, useSelector } from "react-redux";
import { signin } from "../api/auth.api";
import { setLoading } from "../redux/slices/loading.slice";
import { setError } from "../redux/slices/error.slice";
import { setUser } from "../redux/slices/user.slice";
import { useState } from "react";
import { setSuccess } from "../redux/slices/success.slice";
import { useNavigate } from "react-router-dom";

export default function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSiginClick = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const res = await signin({ email, password });
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      dispatch(setUser(res.user));
      dispatch(setSuccess(res.message));
      navigate("/dashboard")
    }
    dispatch(setLoading(false));
  };

  return {
    handleSiginClick,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  };
}
