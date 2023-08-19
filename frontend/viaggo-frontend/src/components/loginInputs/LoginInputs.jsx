import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login, verifyMfa } from "../../services/user.services";
import "./style.css";

const LoginInputs = ({ canLogin, goToForgotPassword, goToRegister }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");

    const [loginInput, setLoginInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            login: loginInput,
            password: passwordInput
        };

        const isPermitted = await login(data);

        const verify = await verifyMfa(loginInput);

        canLogin(isPermitted);

        if (isPermitted !== true) {
            toast.error(isPermitted);
        }
    }

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
                    <input className="input" placeholder="CPF ou E-MAIL" onChange={(e) => setLoginInput(e.target.value)} />
                    <div className="password-input-container">
                        <input className="input" type={typePasswordInput} placeholder="SENHA" onChange={(e) => setPasswordInput(e.target.value)} />
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
                <button onClick={(event) => handleLogin(event)} className="button-login">ENTRAR</button>
            </div>
        </form>
    </>
}
export default LoginInputs
