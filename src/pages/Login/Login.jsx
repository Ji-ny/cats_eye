import styled from 'styled-components';
import './Login.scss';
import googleLoginImg from '../../images/googleLoginImg.svg';


const TitlePink = styled.div`
    box-sizing: border-box;
    padding: 10px;

    font-size: 2rem; // 30px
    font-weight: bold;
    color: #FFA6A6;
    text-align: center;
    line-height: 2rem;



`;

function Login(){

    const BASE_URL = `http://ec2-13-209-162-245.ap-northeast-2.compute.amazonaws.com:8080`;
    const LOGIN_URL = `${BASE_URL}/oauth2/authorization/google`;

    return(
        <div className= "screen_Login">
            <TitlePink> 캣츠아이 </TitlePink>
            {/* 로그인 페이지로 이동한다. */}

            <a className="btn_login" href={ LOGIN_URL } >
                <img src={googleLoginImg} alt="구글 로그인하기"/>
            </a>
            
        </div>
    )
}

export default Login;