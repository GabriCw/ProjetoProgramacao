import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"

const CardLogin = () => {
    return <div className="content">
        <div className="card-content">
            <div className="logo-content">
                <img src={logo} className="logo" />
                <img src={barCode} className="barCode" />
            </div>
            <div className="details-content">
                <div className="hole1" />
                <div className="line" />
                <div className="hole2" />
            </div>
            <div className="data-content">
                <h1 className="welcome-title">BEM VINDO PASSAGEIRO</h1>
                <h2 className="title">FAÇA SEU LOGIN</h2>
                <div className="input-content">
                    <input className="input" placeholder="CPF ou E-MAIL" />
                    <input className="input" placeholder="SENHA" />
                </div>
                <div className="others-content">
                    <p className="others-options">ESQUECI MINHA SENHA</p>
                    <p className="others-options">CRIAR CONTA</p>
                </div>
                <div className="button-content">
                    <button className="button-login">ENTRAR</button>
                </div>
            </div>
        </div>

    </div>
}

export default CardLogin
