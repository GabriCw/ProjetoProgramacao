import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPackages, getPackageById } from "../../services/package.services";
import "./style.css";

const HomePage = () => {

    const [packages, setPackages] = useState([]);
    const [packageClicked, setPackageClicked] = useState(false);
    const [packageDetail, setPackageDetail] = useState([]);

    useEffect(() => {
        const requestData = async () => {
            const response = await getAllPackages();
            setPackages(response);
        };

        requestData();
    }, []);

    const handleClick = async (id) => {
        const response = await getPackageById(id);
        setPackageDetail(response);
        setPackageClicked(true)
    };

    const close = () => setPackageClicked(false);

    return <div className="container-homepage">
        <div className="card-topic">
            {
                packages.map(item => {
                    return <div onClick={() => handleClick(item.id)}>
                        <p>{item.name}</p>
                        <p>{item.data_ida}</p>
                        <p>{item.data_volta}</p>
                    </div>
                })
            }
        </div>
        <Modal
            open={packageClicked}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>Detalhes do Pacote</h1>
                <p>Nome: {packageDetail.name}</p>
                <p>Data Ida: {packageDetail.data_ida}</p>
                <p>Data Volta: {packageDetail.data_volta}</p>
                <p>Detalhes: {packageDetail.details}</p>
            </Box>
        </Modal>
    </div>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default HomePage
