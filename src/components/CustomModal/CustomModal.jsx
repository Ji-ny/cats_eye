import { useState } from 'react';
import Modal from 'react-modal';



// const [modalIsOpen, setModalIsOpen] = useState(true);

// // 모달 닫는 핸들러
// const handleModalClose = () =>{
//     setModalIsOpen(false);
// }



// const [modalIsOpen, setModalIsOpen] = useState(true);
Modal.setAppElement('#root'); // 또는 다른 적절한 요소 선택자

/**
 * @param content : 모달 내용
 * @param modalIsOpen: 모달 보일건지 content
 * @param setModalIsOpen: 모발 보일건지 setModalIsOpen
*/
function CustomModal({content="모달이에요", modalIsOpen, close} ){



    const ModalStyle = {
        // 모달 오버레이의 스타일 정의
        overlay: {
            position: 'fixed', // 화면에 고정
            top: 0, // 상단 여백 0
            left: 0, // 좌측 여백 0
            right: 0, // 우측 여백 0
            bottom: 0, // 하단 여백 0
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색: 투명한 흰색
            zIndex: 99, // z-index 설정 (다른 요소들보다 앞에 위치)
            width: '100%',
            height: '100vh',


        },
    
        // 모달 내용의 스타일 정의
        content: {
            display: 'flex', // Flexbox 레이아웃 사용
            flexDirection: 'column', // Flexbox를 세로 방향으로 정렬
            alignItems: 'center', // 수평 중앙 정렬
            justifyContent: 'center', // 수직 중앙 정렬
            backgroundColor: 'white', // 배경색: 흰색
            overflow: 'auto', // 내용이 넘칠 경우 자동으로 스크롤 생성
            top: '40vh', // 뷰포트 높이의 32% 위치에 배치
            left: '10vw', // 뷰포트 너비의 35% 위치에 배치
            right: '10vw', // 뷰포트 너비의 35% 위치에 배치
            bottom: '40vh', // 뷰포트 높이의 32% 위치에 배치
            WebkitOverflowScrolling: 'touch', // 터치 스크롤 활성화 (모바일 장치에서 부드러운 스크롤링 지원)
            outline: 'none', // 외곽선 제거
            borderRadius: '10px', // 모서리를 10px 반경으로 둥글게 설정
            zIndex: 10, // z-index 설정 (다른 요소들보다 앞에 위치)
            padding: '30px', // 내부 여백 30px 설정
            // align-items: center
            
            
            
        },
    }

    return(
        <Modal 
        style={ModalStyle} 
        isOpen={modalIsOpen} 
        shouldCloseOnOverlayClick={false} 
        ariaHideApp={true} >
            {content}
            <div style={{flex:1}}></div>
            <button style={{width:'100%', borderRadius:"5px", border: "1px", backgroundColor:"#B6CCD8",paddingTop:"5px", paddingBottom:"5px"}}
                    onClick={ close}
            >닫기</button>
        </Modal>

    )

}

export default CustomModal;

// const [modalContent, setModalContent] = useState('');
// const [modalIsOpen, setModalIsOpen] = useState(false);

// const openModal = (content) => {
//     setModalContent(content); //   모달 컨텐츠
//     setModalIsOpen(true);

//     return true;
// };


// // 모달 닫기
// const closeModal = ()=>{
//     setModalIsOpen(false);
// }
