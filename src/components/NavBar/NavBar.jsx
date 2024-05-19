import "./NavBar.scss";
import chatBot_img from "../../images/chatBot_img.svg"
import map_img from "../../images/map_img.svg"
import main_img from "../../images/main_img.svg"
import myPage_img from "../../images/myPage_img.svg"
import { useNavigate } from "react-router-dom";


// ! 네비바. 
// * 각각 챗봇 / 메인 / 지도 / 마이페이지로 이동 가능하다.
function NavBar(){
    const navigate = useNavigate();

    // 챗봇으로 이동 
    const goChatBotPage = () => {
        navigate('/chatbot');
    }

    // 메인 페이지로 이동 
    const goMainPage = () => {
        navigate('/');
    }

    // 지도 페이지로 이동 
    const goMapPage = () => {
        navigate('/map');
    }

    // 마이페이지로 이동 
    const goMyPage = () => {
        navigate('/mypage');
    }

    return(
        <div className="screen_NavBar">
            <section className="container_NavBar">
                <div className="item_NavBar">
                    <img src={chatBot_img} alt="챗봇" onClick={goChatBotPage}/>
                </div>
                <div className="item_NavBar">
                    <img src={main_img} alt="메인"   onClick={goMainPage}/>
                </div>
                <div className="item_NavBar">
                    <img src={map_img} alt="지도"  onClick={goMapPage}/>
                </div>
                <div className="item_NavBar">
                    <img  src={myPage_img} alt="마이페이지" onClick={goMyPage}/>
                </div>
            </section>

        </div>
    );



}

export default NavBar;