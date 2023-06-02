import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./style.css";

const LoginInputs = ({ goToForgotPassword, goToRegister }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        if (isPasswordVisible)
            setTypePasswordInput("text");
        else
            setTypePasswordInput("password");
    }, [isPasswordVisible]);

    return <>
        <header className="titles-container">
            <h1 className="welcome-title">BEM VINDO PASSAGEIRO</h1>
            <h2 className="title">FAÇA SEU LOGIN</h2>
        </header>
        <form>
            <section className="login-container">
                <div className="input-container">
                    <input className="input" type="email" placeholder="CPF ou E-MAIL" />
                    <div className="password-input-container">
                        <input className="input" type={typePasswordInput} placeholder="SENHA" />
                        <div onClick={handlePasswordVisibility}>
                            {
                                isPasswordVisible ?
                                    <Visibility className="icon" />
                                    :
                                    <VisibilityOff className="icon" />
                            }
                        </div>
                    </div>
                </div>
                <div className="others-container">
                    <button onClick={goToForgotPassword} className="others-options">ESQUECI MINHA SENHA</button>
                    <button onClick={goToRegister} className="others-options">CRIAR CONTA</button>
                </div>
            </section>
            <div className="button-container">
                <button className="button-login">ENTRAR</button>
            </div>
        </form>
    </>
}
export default LoginInputs
