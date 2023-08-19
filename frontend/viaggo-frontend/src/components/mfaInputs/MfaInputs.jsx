import "./style.css";

const MfaInputs = () => {
    return <>
        <header className="titles-container">
            <h1 className="welcome-title">INSIRA SEU CÓDIGO</h1>
            <h2 className="title">PARA PROSSEGUIR</h2>
        </header>
        <form>
            <section className="login-container2">
                <div className="input-container2">
                    <input className="input" type="text" inputMode="numeric" maxLength={1} autoFocus />
                    <input className="input" type="text" inputMode="numeric" maxLength={1} />
                    <input className="input" type="text" inputMode="numeric" maxLength={1} />
                    <input className="input" type="text" inputMode="numeric" maxLength={1} />
                    <input className="input" type="text" inputMode="numeric" maxLength={1} />
                    <input className="input" type="text" inputMode="numeric" maxLength={1} />
                </div>
            </section>
            <div className="button-container2">
                <button className="button-login">ENVIAR CÓDIGO</button>
            </div>
        </form>
    </>
}

export default MfaInputs;
