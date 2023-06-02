import { useEffect, useState } from "react"
import barCode from "../../assets/barCode.png"
import logo from "../../assets/logo.png"
import "./style.css"

const Card = ({ children, goToLogin }) => {

    const [hasNavigation, setHasNavigation] = useState(false)

    useEffect(() => {
        if (goToLogin !== undefined) {
            setHasNavigation(true)
        }
        else {
            setHasNavigation(false)
        }
    }, [goToLogin])

    return <div className="container">
        <div className="card-container">
            <figure className="logo-container">

                <button onClick={goToLogin} className="voltar" style={hasNavigation ? null : { color: "#FFFFED", cursor: "initial" }}>
                    {hasNavigation ? <span>Voltar</span> : <span>curioso ein</span>}
                </button>

                <img src={logo} className="logo" alt="Logo ViagGo" />
                <img src={barCode} className="barCode" alt="Código de barras genérico" />
            </figure>
            <div className="details-container">
                <div className="hole1" />
                <div className="line" />
                <div className="hole2" />
            </div>
            <main className="data-container">
                {children}
            </main>
        </div>

    </div>

}

export default Card
