import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useEffect, useState } from "react"
import "./style.css"

const RegisterInputs = ({ goToLogin }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");

    const handlePasswordVisibility = ({ goToHome }) => {
        setIsPasswordVisible(!isPasswordVisible);
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
                    <input className="input" type="nome" placeholder="NOME" />
                    <input className="input" type="email" placeholder="E-MAIL" />
                    <input className="input" type="cpf" placeholder="CPF" />
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
            </section>
            <div className="button-container3">
                <button onClick={goToLogin} className="button-login">CADASTRAR</button>
            </div>
        </form>
    </>
}

export default RegisterInputs
