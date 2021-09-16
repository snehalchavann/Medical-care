import React from "react";
import Button from '@material-ui/core/Button';
import phone from './Images/phone-call.png';
import tests from './Images/test-results.png';
import heart from './Images/heart-rate.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import note from './Images/note.png';

const OptionsForTests = (props) => {
    console.log(props, 'options');
    const {history, data} = props
    console.log(history, 'data++++');
    console.log(data, 'data-----');
    const [isModal, setIsModal] = React.useState(false);
    //const [allData, setAllData] = React.useState([]);

    // setAllData({
    //     allData:data
    // })

   // console.log(allData,"data>>>>")
    const onClick = () => {
        console.log(history, 'rpops...')
        history.push({
          pathname: 'allLabs',
        state: {data: data}
        })
      }

      const  onUpload  = () => {
        console.log(history, 'rpops...')
        history.push({
          pathname: 'uploadPrescription'
        })
      }
    // const modalOpen = this.state.isModal;
    const openModal = () => {
        setIsModal(true);
        
    }

    const handleClose = () => {
        setIsModal(false);
    }
    return (
        <div className="options-style">
            <div className="options-button">
            <Button variant="contained" className="buttons" onClick={onClick}>
                <img src={tests} className="option-images" ></img>
                All tests
            </Button>
            </div>
            <div className="options-button">
            <Button variant="contained" className="buttons" onClick={onClick}>
                <img src={heart} className="option-images"></img>
                Health Packages
            </Button>
            </div>
            <div className="options-button">
            <Button variant="contained" className="buttons" style={{width: "250px"}} onClick={onUpload}>
                <img src={note} className="option-images"></img>
                Upload Prescription
            </Button>
            </div>
            <div className="options-button">
            <Button variant="contained" className="buttons" onClick={openModal}>
                <img src={phone} className="option-images"></img>
                Book on Call
            </Button>
            </div>
            {isModal ? (
                    <Dialog
                        open = {isModal}
                        keepMounted
                        fullWidth
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">Book on call</DialogTitle>
                        <DialogContent style={{padding: "5%"}}>
                                Give a call on +912262932006 and our health experts will help you with your test booking.
                        </DialogContent>
                    </Dialog>
                ) : null
            }
            
        </div>
    );
}



export default OptionsForTests;