import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { login, verifyMfa } from "../../services/user.services";

const defaultContext = {
    canLogin: null,
    auth: (data) => { },
    goToForgotPassword: () => { },
    goToRegister: () => { }
};

export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
    const [canLogin, setCanLogin] = useState(null);

    const navigate = useNavigate();

    const auth = async (data) => {
        setCanLogin(null);

        const request = await login(data);

        const hasMfa = await verifyMfa(data.login);

        if (request === true) {
            if (hasMfa === true) {
                navigate("/mfa");
            }
            else {
                navigate("/home");
            }
        }

        setCanLogin(request);
    };

    const goToForgotPassword = () => navigate("/forgotPassword");

    const goToRegister = () => navigate("/register");

    const hasMfa = async (email) => {
        const request = await verifyMfa(email);

        console.log(request)
    }

    return <AuthContext.Provider value={{ canLogin, auth, goToForgotPassword, goToRegister }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};
