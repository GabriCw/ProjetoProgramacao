import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import LoginInputs from "../../components/loginInputs/LoginInputs";
import { useAuth } from "../../hooks/providers/AuthProvider";
import "./styles.css";

const LoginView = () => {

    const navigate = useNavigate();

    const { canLogin } = useAuth();

    useEffect(() => {
        toast.error(canLogin);
    }, [canLogin])


    return <Card>
        <LoginInputs />
    </Card>
}

export default LoginView
