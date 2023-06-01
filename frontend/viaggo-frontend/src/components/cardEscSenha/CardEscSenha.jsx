import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"
import { useNavigate } from "react-router-dom"

const CardEscSenha = () => {
    const navigate = useNavigate()

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
                    <h1 className="welcome-title">INSIRA SEU E-MAIL</h1>
                    <h2 className="title">PARA RECUPERAR SUA SENHA</h2>
                </header>
                <form>
                    <section className="login-container2">
                        <div className="input-container">
                            <input className="input" type="email" placeholder="E-MAIL" />
                        </div>
                    </section>
                    <div className="button-container2">
                        <button onClick={() => navigate('/login')} className="button-login">ENVIAR CÓDIGO</button>
                    </div>
                </form>
            </main>
        </div>

    </div>
}

export default CardEscSenha