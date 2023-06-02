import { useNavigate } from "react-router";
import Card from "../../components/card/Card";
import LoginInputs from "../../components/loginInputs/LoginInputs";
import "./styles.css";

const LoginView = () => {

    const navigate = useNavigate();

    return <Card>
        <LoginInputs
            goToForgotPassword={() => navigate('/forgotPassword')}
            goToRegister={() => navigate('/register')}
        />
    </Card>
}

export default LoginView
