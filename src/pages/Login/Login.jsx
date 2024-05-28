import styled from 'styled-components';
import './Login.scss';
import googleLoginImg from '../../images/googleLoginImg.svg';


const TitlePink = styled.div`
    box-sizing: border-box;
    padding: 10px;

    font-size: 3rem; // 30px
    font-weight: bold;
    color: #FFA6A6;
    text-align: center;
    line-height: 2rem;



`;

function Login(){
    // const LOGIN_URL = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
    
    const goLogin = ()=>{
        window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
    }
    



    return(
        <div className= "screen_Login">
            <TitlePink> Cat's eye </TitlePink>
            <div className='subtitle_Login'> 고양이 눈 건강 진료 / 챗봇 서비스</div>
            {/* 로그인 페이지로 이동한다. */}
            <div style={{flex:0.4}}></div>
            <div className="btn_login" onClick={goLogin} >
                <img src={googleLoginImg} alt="구글 로그인하기"/>
            </div>
            
        </div>
    )
}

export default Login;