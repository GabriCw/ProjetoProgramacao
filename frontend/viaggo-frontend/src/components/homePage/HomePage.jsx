import { useEffect, useState } from "react";
import { getAllPackages, getPackageById, deletePackageById, updatePackageById } from "../../services/package.services";
import "./style.css";
import { toast } from "react-toastify";
import PackageInfo from "../packageComponents/PackageInfo";
import PackageUpdate from "../packageComponents/PackageUpdate";

const HomePage = () => {
    
    const [packages, setPackages] = useState([]);
    const [packageClicked, setPackageClicked] = useState(false);
    const [packageDetail, setPackageDetail] = useState([]);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [updateClicked, setUpdateClicked] = useState(false);
    const [itemUpdated, setItemUpdated] = useState(false)
    
    const [name, setName] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');
    const [details, setDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        const requestData = async () => {
            const response = await getAllPackages();
            setPackages(response);
        };

        requestData();
    }, [itemDeleted,itemUpdated]);

    const handleClick = async (id) => {
        const response = await getPackageById(id);
        setPackageDetail(response);
        setPackageClicked(true)
    };
      
    const handleDelete = async (id) => {
        setPackageClicked(false);
        const response = await deletePackageById(id);
        setItemDeleted(!itemDeleted);
        toast.success(response)
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        const body = {
            name: name,
            data_ida: dataIda,
            data_volta: dataVolta,
            details: details,
            image_url: imageUrl
        }
        const response = await updatePackageById(packageDetail.id, body);
        console.log(response);
        console.log(body);
        setItemUpdated(!itemUpdated);
        if(response.status === 200){
            toast.success(response.data);
            setUpdateClicked(false);
            close();
        }
        else{
            toast.error(response.data);
        }
        
    };
    
    const close = () => setPackageClicked(false);
    const closeUpdate = () => setUpdateClicked(false);

    return <div className="container-homepage">
        
        {/* Each individual package card with its own Modal (info) props */}

        <PackageInfo 
            packages={packages} 
            handleClick={handleClick} 
            packageDetail={packageDetail}
            setUpdateClicked={setUpdateClicked}
            handleDelete={handleDelete}
            packageClicked={packageClicked}
            close={close}
            style={style}
        />
        
        {/* Package Card Update items */}

        <PackageUpdate
            updateClicked={updateClicked}
            closeUpdate={closeUpdate}
            handleSubmit={handleSubmit} 
            style={style}         
            name={name}
            setName={setName}
            dataIda={dataIda}
            setDataIda={setDataIda}
            dataVolta={dataVolta}
            setDataVolta={setDataVolta}
            details={details}
            setDetails={setDetails}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
        />

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
