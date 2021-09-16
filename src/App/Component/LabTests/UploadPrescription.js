import React, {useState} from 'react';
import NavbarHome from '../Header/NavbarHome';
import MoreLabInfo from './MoreLabInfo';

function UploadPrescription(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	};

	return(
        <div>
            <NavbarHome></NavbarHome>
            <h3 className="certi-title test-header" style={{textAlign:"center"}}>Select a File to Upload</h3>
            <div className="uploadFile">
        <input type="file" name="file" style={{marginLeft:"11%"}} onChange={changeHandler} />
        {/* {isFilePicked ? (
            <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
            </div>
        ) : (
            <p></p>
        )} */}
        <div>
            <button className="upload-button" onClick={handleSubmission}>Submit</button>
        </div>
        </div>
        <div style={{margin:"0% 4%"}}>
        <MoreLabInfo></MoreLabInfo>
        </div>
    </div>
)
	
}

export default UploadPrescription;