import barCode from "../../assets/barCode.png"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import "./style.css"
import { useNavigate } from "react-router-dom"

const CardCadastro = () => {
    const navigate = useNavigate()

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
    }, [isPasswordVisible])

    return <div className="container">
        <div className="card-container">
            <figure className="logo-container">
                <button onClick={() => navigate('/login')} className="voltar">Voltar</button>
                <img src={logo} className="logo2" alt="Logo ViagGo" />
                <img src={barCode} className="barCode2" alt="Código de barras genérico"/>
            </figure>
            <div className="details-container">
                <div className="hole1" />
                <div className="line" />
                <div className="hole2" />
            </div>
            <main className="data-container">
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
                        <button onClick={() => navigate('/login')} className="button-login">CADASTRAR</button>
                    </div>
                </form>
            </main>
        </div>

    </div>
}

export default CardCadastro