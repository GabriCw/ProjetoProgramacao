import axios from "axios";

const _baseUrl = "http://localhost:3000";

export const getAllPackages = async () => {
    const _endpoint = "/get-all-packages";

    try {
        const response = await axios.get(_baseUrl + _endpoint);

        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return error.response.data;
    }
}

export const getPackageById = async (id) => {
    const _endpoint = `/get-package-by-id?id=${id}`;

    try {
        const response = await axios.get(_baseUrl + _endpoint);

        if (response.status === 200) {
            return response.data;
        }
    }

    catch (error) {
        return error.response.data;
    }
}
