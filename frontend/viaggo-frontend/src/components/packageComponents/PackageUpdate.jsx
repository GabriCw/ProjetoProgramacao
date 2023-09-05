import { Box, Modal } from "@mui/material";
import { AiOutlineClose } from 'react-icons/ai';

const PackageUpdate = ({updateClicked, closeUpdate, handleSubmit, style, name, setName, dataIda, setDataIda, dataVolta, setDataVolta, details, setDetails, imageUrl, setImageUrl}) => {
    
    return (
    <Modal
        open={updateClicked}
        onClose={closeUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
                <div className="update-close">
                    <AiOutlineClose
                        onClick={closeUpdate}
                    ></AiOutlineClose>
                </div>
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-item">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="dataIda">Data de Ida:</label>
                    <input
                        type="date"
                        id="dataIda"
                        value={dataIda}
                        onChange={(e) => setDataIda(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="dataVolta">Data de Volta:</label>
                    <input
                        type="date"
                        id="dataVolta"
                        value={dataVolta}
                        onChange={(e) => setDataVolta(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <div className="details-item">
                        <label htmlFor="details">Detalhes:</label>
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-item">
                    <label htmlFor="image-url">Url Imagem:</label>
                    <input
                        id="image-url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit" className="update-button">Atualizar Pacote</button>
            </form>
        </Box>
    </Modal>
  )
}

export default PackageUpdate