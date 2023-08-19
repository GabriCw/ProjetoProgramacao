import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { login, verifyMfa } from "../../services/user.services";

const defaultContext = {
    canLogin: null,
    auth: (data) => { },
    hasMfa: (login) => { }
};

export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
    const [canLogin, setCanLogin] = useState(null);

    const navigate = useNavigate();

    const auth = async (data) => {
        setCanLogin(null);

        const request = await login(data);

        if (request === true) {
            navigate("/home");
        }

        setCanLogin(request);
    };

    const hasMfa = async (email) => {
        const request = await verifyMfa(email);

        console.log(request)
    }

    return <AuthContext.Provider value={{ canLogin, auth, hasMfa }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};
