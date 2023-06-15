import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useEffect, useState } from "react"
import "./style.css"
import api from "../../Api.js";
import axios from 'axios';

const RegisterInputs = ({ goToLogin }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");

    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    
    const credenciais = {
        name: nameInput,
        email: emailInput,
        cpf: cpfInput,
        password: passwordInput
    }


    const handlePasswordVisibility = ({ goToHome }) => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const registerUser = (credencials) => {
        api.post(`/create-user`, credencials)
    }

    const handleSignup = () => {
        registerUser(credenciais)
        goToLogin()
    }



    useEffect(() => {
        if (isPasswordVisible)
            setTypePasswordInput("text");
        else
            setTypePasswordInput("password");
    }, [isPasswordVisible])

    return <>
        <header className="titles-container">
            <h1 className="title">REALIZE SEU CADASTRO, PASSAGEIRO</h1>
        </header>
        <form>
            <section className="login-container">
                <div className="input-container">
                    <input className="input" type="nome" placeholder="NOME" onChange={(e)=>setNameInput(e.target.value)}/>
                    <input className="input" type="email" placeholder="E-MAIL" onChange={(e)=>setEmailInput(e.target.value)}/>
                    <input className="input" type="cpf" placeholder="CPF" onChange={(e)=>setCpfInput(e.target.value)}/>
                    <div className="password-input-container">
                        <input className="input" type={typePasswordInput} placeholder="SENHA" onChange={(e)=>setPasswordInput(e.target.value)}/>
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
            </section>
            <div className="button-container3">
                <button onClick={goToLogin} className="button-login">CADASTRAR</button>
            </div>
        </form>
    </>
}

export default RegisterInputs
