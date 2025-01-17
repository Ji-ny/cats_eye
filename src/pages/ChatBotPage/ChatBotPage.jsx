import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ChatBotPage.scss";
import axios from "axios";
import send_img from "../../images/send_img.svg";
import { DefaultBlutButton, TitleDefault } from "../../styles/styles_custom";
import defaultAxios from "../../apis/defaultAxios";
import { useSelector } from "react-redux";
import useNavigates from "../../hooks/useNavigates";
import Swal from "sweetalert2";

// ! 챗봇상담 페이지
function ChatBotPage(){

        // ==== * 전역변수 관리 ====== //
    // * 전역 변수 받아오기 (로그인 상태)
    const isLogin = useSelector(state => state.isLogin); // 전역 redux stroe 내의 isLogin을가져온다.

    // ====================== //


    // 네비게이트 함수
    const { goDiagnosis, goDiagnosisDB , goLogin} = useNavigates();
    // --------- API 키 ---------- //
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const [loading, setLoading] = useState(false); // 로딩 대기 (true : 로딩중)
    
    // --------------------------- //

    // ------------  메세지 [전송 버튼] --------------- //
    
    const [ message, setMessage ] = useState('') // 현재 보낼 메세지   
    const [messages, setMessages] = useState([]); // 메세지들 queue
    
    const addMessage = (sender, message) => {
        setMessages(prevMessages => [ ...prevMessages, {sender, message}]);
    }
    
    

    // *메세지 전송 함수  --------------- //
    const postChatSendMessage = async () => {
        addMessage('user', message); // 내 메세지 전송
        setMessage('');
        
        try{
            const url = "/api/v1/chat";

            // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 

            // 메세지 전송 데이터 (수정)
            const data = {
               "message": message || '', // 메세지 초안. 없으면 ''를 반환
            }

            // console.log(data);
            setLoading(true); // 로딩중
    
            const response = await defaultAxios.post(url, data);
            console.log('성공 /api/v1/chat:', response);

            const aiMessage = response.data?.result.message || 'No response'; // ai 응답 저장
            console.log("성공",response);

            addMessage('bot', aiMessage);
            
        }    
        catch(error){
            console.error("오류 발생!", error);
            addMessage("오류 발생!");
        } finally {
            // console.log("항상 실행되는,");
            setLoading(false); // 로딩 안됨
        }

    }

    // * ------------------------------ //

    // useEffect(()=>{
    //     console.log(message);
    // },[message])

    // ** 채팅방 삭제
    const removeChat =async () => {
        try{
            // 메세지 큐에 메세지가 하나라도 있다면, 채팅방 삭제
            if (messages.length > 0) {
                const url = "/api/v1/chat/remove";

                const response = await defaultAxios.patch(url);
                setMessages([]); // 빈 메세지로 변경
                console.log('성공 /api/v1/chat/remove:', response);
            }
        }    
        catch(error){
            console.error("오류 발생!", error);
        }

    }


    // *로그인 확인 
    useEffect(() => {
        if (isLogin) { //}
            // 로그인 되어있으면, 아무것도 하지 않는다.
        } else{
            // * 모달 
            Swal.fire({
                text: "로그인 후 이용해주세요.",
                icon: "info"
            });
            goLogin();
        }
    },[]);
    
// ${msg.sender === 'user' ? '' : ''} : } }
    return(
        <div className="screen_ChatBotPage">
            <TitleDefault>고양이 눈 질병 챗봇</TitleDefault>         
            <div className='chat_output_container'>
                {/* 만약, 로딩중이라면 로딩중 띄우고, 아니면, 답변 띄우기 */}

                { messages.map((msg,index) => ( // 답변을 띄운다.
                <div className = {`message ${msg.sender}`} key = {index}>
                    {`${msg.message}`}
                </div>
                ))}    

                { loading && <div className="message"> 답변을 기다리고 있습니다...</div> }
            </div>
            <div className='chat_input_container'>
                <textarea
                type='text' placeholder='채팅내용을 입력해주세요.'
                value={message} onChange={(e)=> setMessage(e.target.value)}
                />
                <button className ='btn_message_send' onClick = { postChatSendMessage }>
                    <img src = {send_img}  alt="전송" />        
                </button>
                    
            </div> 

            {/* //todo네비바 클릭시, 채팅방 식제! (메세지가 하나라도 있다면)*/}
            <NavBar onClick = {removeChat}/>
        </div>
    );
}


export default ChatBotPage;