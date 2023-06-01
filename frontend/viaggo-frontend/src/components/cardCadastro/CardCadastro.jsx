import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"
import { useNavigate } from "react-router-dom"

const CardCadastro = () => {
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
                    <h1 className="title">REALIZE SEU CADASTRO, PASSAGEIRO</h1>
                </header>
                <form>
                    <section className="login-container">
                        <div className="input-container">
                            <input className="input" type="nome" placeholder="NOME" />
                            <input className="input" type="email" placeholder="E-MAIL" />
                            <input className="input" type="cpf" placeholder="CPF" />
                            <input className="input" type="password" placeholder="SENHA" />
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