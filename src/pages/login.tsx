import { useState } from "react";
import authServices from "../services/auth.services";
import AuthForm from "../components/auth/AuthForm";
import FormInput from "../components/auth/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import authImg from "../assets/images/auth-img.png";
import Logo from "../assets/images/logo.png";
import { setCredentials } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

const Login = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(0);
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            if (value.length < 8) {
                setPasswordError("Password minimal 8 karakter");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setPasswordError("Password minimal 8 karakter");
            return;
        };

        try {
            const response = await authServices.login(formData); 

            if (response.data && response.data.token) {
                dispatch(setCredentials({ token: response.data.token }));
                // window.location.href = "/";
            } else {
                setStatus(102);
                setMessage('Token tidak ditemukan');
            }

            setMessage(response.message);
            setStatus(response.status);
        } catch (error) {
            setStatus(102);
            setMessage("Something went wrong!");
            console.log(error);
            
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className="grid grid-cols-2">
            <div className="pl-48 pr-28 mt-40">
                <div className="flex gap-4 justify-center">
                    <img src={Logo} alt="logo" className="w-8 h-8" />
                    <h1 className="font-bold text-xl">SIMS PPOB FARKHAN</h1>
                </div>
                <div className="flex justify-center mt-8">
                    <h1 className="text-center font-bold text-2xl">Masuk atau buat akun<br />untuk memulai</h1>
                </div>
                <AuthForm title="Masuk" onSubmit={handleSubmit}>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    {message && (
                        <p className={`${status === 0 ? "text-green-500" : "text-red-500"}`}>{message}</p>
                    )}
                    
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faAt} className="mr-2 text-slate-400" />
                        <FormInput type="email" name="email" placeholder="masukkan email anda" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faLock} className="mr-2 text-slate-400" />
                        <FormInput type="password" name="password" placeholder="masukkan password anda" value={formData.password} onChange={handleChange} />
                    </div>
                </AuthForm>
                <div className="text-center mt-5">
                    Belum punya akun? registrasi <a href="/registration" className="text-[#f13b2e] hover:underline font-medium"> di sini</a>
                </div>
            </div>
            <img src={authImg} alt="auth-img" />
        </div>
    );
}

export default Login;