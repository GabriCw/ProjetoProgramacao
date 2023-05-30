import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"

const CardLogin = () => {
    return <div className="container">
        <div className="card-container">
            <div className="logo-container">
                <img src={logo} className="logo" />
                <img src={barCode} className="barCode" />
            </div>
            <div className="details-container">
                <div className="hole1" />
                <div className="line" />
                <div className="hole2" />
            </div>
            <div className="data-container">
                <div className="titles-container">
                    <h1 className="welcome-title">BEM VINDO PASSAGEIRO</h1>
                    <h2 className="title">FAÇA SEU LOGIN</h2>
                </div>
                <div className="login-container">
                    <div className="input-container">
                        <input className="input" type="email" placeholder="CPF ou E-MAIL" />
                        <input className="input" type="password" placeholder="SENHA" />
                    </div>
                    <div className="others-container">
                        <p className="others-options">ESQUECI MINHA SENHA</p>
                        <p className="others-options">CRIAR CONTA</p>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-login">ENTRAR</button>
                </div>
            </div>
        </div>

    </div>
}

export default CardLogin
