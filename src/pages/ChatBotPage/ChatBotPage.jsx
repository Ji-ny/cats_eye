import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ChatBotPage.scss";
import axios from "axios";
import send_img from "../../images/send_img.svg";
import { TitleDefault } from "../../styles/styles_custom";

// ! 챗봇상담 페이지
function ChatBotPage(){

    // --------- API 키 ---------- //
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const [loading, setLoading] = useState(false); // 로딩 대기 (true : 로딩중)
    
    // --------------------------- //

    const BASE_URL = `http://ec2-13-209-162-245.ap-northeast-2.compute.amazonaws.com:8080`;
    // ------------  메세지 [전송 버튼] --------------- //
    
    const [ message, setMessage ] = useState('') // 현재 보낼 메세지   
    const [messages, setMessages] = useState([]); // 메세지들 queue
    
    const addMessage = (sender, message) => {
        setMessages(prevMessages => [ ...prevMessages, {sender, message}]);
    }
    
    
    const postChatSendMessage = async () => {
        addMessage('user', message); // 내 메세지 전송

        try{
            const url = "ttp://ec2-13-209-162-245.ap-northeast-2.compute.amazonaws.com:8080/api/v1/chat";

            const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 

            // 메세지 전송 데이터 (수정)
            const data = {
               "message": message || '', // 메세지 초안. 없으면 ''를 반환
            }

            // console.log(data);
            setLoading(true); // 로딩중
    
            const response = await axios.post(url, data, {headers,});
            console.log(response);

            const aiMessage = response.data?.result.message || 'No response'; // ai 응답 저장
            console.log("성공",response);

            addMessage('bot', aiMessage);
        }    
        catch(error){
            console.error("오류 발생!", error);
            addMessage("오류 발생!");
        } finally {
            console.log("항상 실행되는,");
            setLoading(false); // 로딩 안됨
        }

    }


    return(
        <div className="screen_ChatBotPage">
            <TitleDefault> 챗봇 페이지 </TitleDefault>         
            <div className='chat_output_container'>
                {/* 만약, 로딩중이라면 로딩중 띄우고, 아니면, 답변 띄우기 */}

                { messages.map((msg,index) => ( // 답변을 띄운다.
                <div className = {`message ${msg.sender}`} key = {index}>
                    {`${msg.sender === 'user' ? '나🩷' : '챗봇⭐'} : ${msg.message}`}
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

            {/* 네비바 */}
            <NavBar/>
        </div>
    );
}


export default ChatBotPage;