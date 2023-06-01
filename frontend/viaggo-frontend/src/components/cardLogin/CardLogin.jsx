import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"

const CardLogin = () => {
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
                <img src={logo} className="logo" alt="Logo ViagGo" />
                <img src={barCode} className="barCode" alt="Código de barras genérico" />
            </figure>
            <div className="details-container">
                <div className="hole1" />
                <div className="line" />
                <div className="hole2" />
            </div>
            <main className="data-container">
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
                            <button onClick={() => navigate('/escsenha')} className="others-options">ESQUECI MINHA SENHA</button>
                            <button onClick={() => navigate('/cadastro')} className="others-options">CRIAR CONTA</button>
                        </div>
                    </section>
                    <div className="button-container">
                        <button className="button-login">ENTRAR</button>
                    </div>
                </form>
            </main>
        </div>

    </div>
}

export default CardLogin
