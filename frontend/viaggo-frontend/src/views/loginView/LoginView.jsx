import { useNavigate } from "react-router";
import Card from "../../components/card/Card";
import LoginInputs from "../../components/loginInputs/LoginInputs";
import "./styles.css";

const LoginView = () => {

    const navigate = useNavigate();

    const LOGIN_ACCEPT = {
        login: "11122233344",
        password: "batata123"
    }

    return <Card>
        <LoginInputs
            canLogin={(isCorrectInfos) => isCorrectInfos ? navigate('/home') : null}
            loginInfos={LOGIN_ACCEPT}
            goToForgotPassword={() => navigate('/forgotPassword')}
            goToRegister={() => navigate('/register')}
        />
    </Card>
}

export default LoginView
