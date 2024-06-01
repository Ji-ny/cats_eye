import styled from 'styled-components';
import './Login.scss';
import googleLoginImg from '../../images/googleLoginImg.svg';
import CustomModal from '../../components/CustomModal/CustomModal';
import { useState } from 'react';
import catImg from '../../images/main_cat_Img.png';

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
            <div className='subtitle_Login'> 고양이 결막염 진단/챗봇 서비스</div>
            {/* 로그인 페이지로 이동한다. */}
            <div style={{flex:0.4}}>
                {/* <div style={{width:'100%', height:'100%'}}><img style={{width:'100%', height:'100%'}} src={catImg} alt=''/></div> */}
            </div>
            <div className="btn_login" onClick={goLogin} >
                <img src={googleLoginImg} alt="구글 로그인하기"/>
            </div>
            
        </div>
    )
}

export default Login;