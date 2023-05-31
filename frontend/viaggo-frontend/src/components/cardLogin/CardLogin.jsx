import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"
import { useNavigate } from "react-router-dom"

const CardLogin = () => {
    const navigate = useNavigate()

    return <div className="container">
        <div className="card-container">
            <figure className="logo-container">
                <img src={logo} className="logo" alt="Logo ViagGo" />
                <img src={barCode} className="barCode" alt="Código de barras genérico"/>
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
                            <input className="input" type="password" placeholder="SENHA" />
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
