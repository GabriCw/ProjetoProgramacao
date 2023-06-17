import axios from "axios";

const _baseUrl = "http://localhost:5000";   //colocar a sua porta do localhost aqui

export const login = async (data) => {
    const _endpoint = "/login";
    try {
        const response = await axios.post(_baseUrl + _endpoint, data)
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return error.response.data;
    }
}

export const registerUser = async (data) => {
    const _endpoint = "/create-user";
    try {
        const response = await axios.post(_baseUrl + _endpoint, data)
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return error.response.data;
    }
}
