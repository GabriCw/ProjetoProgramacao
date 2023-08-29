import React from 'react'
import { Box, Modal } from "@mui/material";
import { FaTrash, FaPlaneArrival, FaPlaneDeparture} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';

const PackageInfo = ({packages, handleClick, setUpdateClicked, handleDelete, packageClicked, packageDetail, close, style}) => {
  return (
    <div className='card-topic'>
        
        {
            packages.map(item => {
                return <div onClick={() => handleClick(item.id)} className="full-card">
                        <div className="package-image">
                            <img className="package-image" src={item.image_url} alt={`Package ${item.name} Image`} width={300} height={300}/>
                        </div>
                    <div className="package-details">
                        <div className="package-name">
                            <span>{item.name}</span>
                        </div>
                        <div className="date" id="date-text">
                            <span><FaPlaneDeparture></FaPlaneDeparture>{item.data_ida}</span>
                            <span><FaPlaneArrival></FaPlaneArrival>{item.data_volta}</span>
                        </div>
                    </div>
                </div>
            })
        }
        
        {/* Modal --> isolated card that opens up */}
        <Modal
            open={packageClicked}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
        
                <div className="package-detail-close-delete">
                    <AiOutlineClose
                        onClick={close}
                    ></AiOutlineClose>
                    <BiSolidPencil
                        onClick={() => setUpdateClicked(true)}
                    >
                    </BiSolidPencil>
                    <FaTrash
                        onClick={() => handleDelete(packageDetail.id)}
                    ></FaTrash>
                </div>
        
                <div className="package-detail-text">
                    <h1>Detalhes do Pacote</h1>
                    <h3>{packageDetail.name}</h3>
                    <p>Data Ida: {packageDetail.data_ida}</p>
                    <p>Data Volta: {packageDetail.data_volta}</p>
                    <p>Detalhes Local: {packageDetail.details}</p>
                </div>
            </Box>
        </Modal>
    </div>
  )
}


export default PackageInfo