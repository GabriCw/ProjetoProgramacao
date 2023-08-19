import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/providers/AuthProvider";
import { authCode, generateCode } from "../../services/user.services";
import "./style.css";

const MfaInputs = () => {

    const [number, setNumber] = useState(0);

    const { loginUsed, goToHome } = useAuth();

    useEffect(() => {
        console.log(typeof (number))
    }, [number])

    const handleGenerateCode = async (event) => {
        event.preventDefault();

        const body = {
            login: loginUsed
        }

        const request = await generateCode(body);

        if (request.status === 200) {
            toast.success(request.data);
        }

        else {
            toast.error(request.data);
        }
    }

    const handleConfirmCode = async (event) => {
        event.preventDefault();

        const body = {
            code: number
        }

        const request = await authCode(body);

        if (request.status === 200) {
            goToHome()
        }

        else {
            toast.error(request.data);
        }
    }

    return <>
        <header className="titles-container">
            <h1 className="welcome-title">INSIRA SEU CÓDIGO</h1>
            <h2 className="title">PARA PROSSEGUIR</h2>
        </header>
        <form>
            <section className="login-container2">
                <div className="input-container2">
                    <input className="input" onChange={(e) => setNumber(e.target.value)} inputMode="numeric" maxLength={6} />
                </div>
                <div>
                    <button onClick={handleGenerateCode}>GERAR CÓDIGO</button>
                </div>
            </section>
            <div className="button-container2">
                <button className="button-login" onClick={handleConfirmCode}>CONFIRMAR</button>
            </div>
        </form>
    </>
}

export default MfaInputs;
