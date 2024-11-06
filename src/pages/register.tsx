import { useState } from "react";
import authServices from "../services/auth.services";
import AuthForm from "../components/auth/AuthForm";
import FormInput from "../components/auth/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Registration = () => {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
    });
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(0);
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "confirm_password" || name === "password") {
            validatePassword(
                name === "password" ? value : formData.password,
                formData.confirm_password,
            );
        }
    };

    const validatePassword = (password, confirm_password) => {
        if (password.length < 8) {
            setPasswordError("Password minimal 8 karakter");
        } else if (password && confirm_password && password === confirm_password) {
            setPasswordError("Password dan konfirmasi password tidak cocok");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setPasswordError("Password minimal 8 karakter");
            return;
        }
        if (formData.password !== formData.confirm_password) {
            setPasswordError("Password dan konfirmasi password tidak cocok");
            return;
        }

        try {
            const data = await authServices.register(formData);
            setMessage(data.message);
            setStatus(data.status);
        } catch (error) {
            setStatus(102);
            setMessage("Something went wrong!");
        }
    }

    return (
        <div className="grid grid-cols-2">
            <div className="pl-48 pr-28 mt-40">
                <div className="flex gap-4 justify-center">
                    <img src="/images/Logo.png" alt="logo" className="w-8 h-8" />
                    <h1 className="font-bold text-xl">SIMS PPOB FARKHAN</h1>
                </div>
                <div className="flex justify-center mt-8">
                    <h1 className="text-center font-bold text-2xl w-3/4">Lengkapi data untuk membuat akun</h1>
                </div>
                <AuthForm title="Register" onSubmit={handleSubmit}>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    {message && (
                        <p className={`${status === 0 ? "text-green-500" : "text-red-500"}`}>{message}</p>
                    )}
                    
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faAt} className="mr-2 text-slate-400" />
                        <FormInput type="email" name="email" placeholder="masukkan email anda" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-slate-400" />
                        <FormInput type="text" name="first_name" placeholder="nama depan" value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-slate-400" />
                        <FormInput type="text" name="last_name" placeholder="nama belakang" value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faLock} className="mr-2 text-slate-400" />
                        <FormInput type="password" name="password" placeholder="buat password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faLock} className="mr-2 text-slate-400" />
                        <FormInput type="password" name="confirm_password" placeholder="konfirmasi password" value={formData.confirm_password} onChange={handleChange} />
                    </div>
                </AuthForm>
                <div className="text-center mt-5">
                    Sudah punya akun? login <a href="/login" className="text-[#f13b2e] hover:underline font-medium"> di sini</a>
                </div>
            </div>
            <img src="/images/auth-img.png" alt="auth-img" />
        </div>
    );
}

export default Registration;