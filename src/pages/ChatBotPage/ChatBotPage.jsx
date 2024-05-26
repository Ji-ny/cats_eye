import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ChatBotPage.scss";
import axios from "axios";
import send_img from "../../images/send_img.svg";
import { DefaultBlutButton, TitleDefault } from "../../styles/styles_custom";
import defaultAxios from "../../apis/defaultAxios";

// ! 챗봇상담 페이지
function ChatBotPage(){

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
    

    return(
        <div className="screen_ChatBotPage">
            <TitleDefault> 챗봇 페이지 </TitleDefault>         
            <div className='chat_output_container'>
                {/* 만약, 로딩중이라면 로딩중 띄우고, 아니면, 답변 띄우기 */}

                { messages.map((msg,index) => ( // 답변을 띄운다.
                <div className = {`message ${msg.sender}`} key = {index}>
                    {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message}`}
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