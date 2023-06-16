import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./style.css";
import api from "../../Api.js";
import axios from 'axios';

const LoginInputs = ({ canLogin, loginInfos, goToForgotPassword, goToRegister, dados}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");

    const [loginInput, setLoginInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    useEffect(()=>{
        api.get('/get-all-users').then(res=>{
            dados = res.data;
            console.log(dados);
            loginInfos.email = dados.email;
            loginInfos.cpf = dados.cpf;
            loginInfos.password = dados.password;
        })
    })

    const handleLogin = () => {

       dados.forEach((objeto) => {
            if (loginInput === objeto.email || loginInput === objeto.cpf && passwordInput === objeto.password){
                canLogin(true)
            }
            canLogin(false)
        });

        // if (loginInput === loginInfos.email || loginInput === loginInfos.cpf && passwordInput === loginInfos.password) {
        //     canLogin(true)
        // }
        // canLogin(false)
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
                <button onClick={handleLogin} className="button-login">ENTRAR</button>
            </div>
        </form>
    </>
}
export default LoginInputs
