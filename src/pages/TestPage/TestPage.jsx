import { useState } from 'react';
import Modal from 'react-modal';
import './TestPage.scss';
import { DefaultBlutButton } from '../../styles/styles_custom';
import CustomModal from '../../components/CustomModal/CustomModal';

function TestPage(){
    const [modalIsOpen, setModalIsOpen] = useState(true);


    return(
        <div className='screen_TestPage'>
            <CustomModal content='모발' modalIsOpen={modalIsOpen} close={()=> setModalIsOpen(false)}/>
        </div>

    )

}

export default TestPage;

// <Modal style={ModalStyle} isOpen={modalIsOpen} onRequestClose = {handleModalClose} shouldCloseOnOverlayClick={false}>
            //     모달이에요.
            //     <div style={{flex:1}}></div>
            //     <button style={{width:'100%', borderRadius:"5px", border: "1px", backgroundColor:"#B6CCD8",paddingTop:"5px", paddingBottom:"5px"}}
            //             onClick={ handleModalClose}
            //     >닫기</button>
            // </Modal>