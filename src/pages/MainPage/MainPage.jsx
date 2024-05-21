import styled from "styled-components";
import { LineDiv, TitlePink } from "../../styles/styles_custom";
import diagnosis_img from "../../images/diagnosis_img.svg" 
import diagnosis_db_img from "../../images/diagnosis_db_img.svg" 

import "./MainPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import useNavigates from "../../components/NavBar/useNavigates";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../store/store";


function MainPage(){
    // ==== * 전역변수 관리 ====== //
    // * 전역 변수 받아오기 (로그인 상태)
    const isLogin = useSelector(state => state.isLogin); // 전역 redux stroe 내의 isLogin을가져온다.

    // * 전역변수 isLogin - 수정하는 함수 받아오기 ex ( dispatch(setIsLogin(true)))
    const dispatch = useDispatch();

    // ====================== //


    // 네비게이트 함수
    const { goDiagnosis, goDiagnosisDB , goLogin} = useNavigates();

    // 로그인 여부 저장 함수
    // const [isLogin, setIsLogin] = useState(false); // true : 로그인됨, false: 로그인 안됨

    useEffect(() => {
        if (isLogin) { // 만약, 로그인 되어 있다면
            // console.log('현재 로그인 상태 확인 : ', isLogin);
        } else {
            // console.log('현재 로그인 상태 확인 : ', isLogin, ' 로그인 됏으니 토큰 저장할겨');
            const urlParams = new URL(window.location.href).searchParams;
            const ACCESS_TOKEN = urlParams.get("accessToken");
            const REFRESH_TOKEN = urlParams.get("refreshToken");

            if (ACCESS_TOKEN && REFRESH_TOKEN) { // 토큰들이 있다면,
                // 로컬스토리지에 토큰을 저장한다.
                localStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
                localStorage.setItem('REFRESH_TOKEN', REFRESH_TOKEN);

                // 클릭 이벤트 발생 시 Redux store에서 setIsLogin 액션을 dispatch하여 상태를 true로 변경합니다.
                dispatch(setIsLogin(true)); // 로그인 상태로 변경
                // console.log('토큰 저장후 로그인 상태', isLogin, );
            } else {
                // 로그인 되어 있지 않다면, 로그인 화면으로 이동.
                // console.log('현재 로그인 상태 확인 : ', isLogin, '로그인 안됐어유 넘어감');
                goLogin();
            }
        }
    }, []);
    // // ** 로그인 상태 저장하기
    // useEffect(()=>{
    //     // 만약, 리다이렉트 페이지가 아니고, isLogin이 false라면?
    //     if (isLogin){
            
    //     }
    //     if (!isLogin && new URL(window.location.href).searchParams.get("accessToken") == null){
    //         setIsLogin(false); // 로그인 상태 false
    //         goLogin(); // 로그인 페이지로 이동
    //     }
    //     else { // 만약, 리다이렉트 페이지라면,
    //         const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("accessToken");
    //         const REFRESH_TOKEN = new URL(window.location.href).searchParams.get("refreshToken");
    //         // 로컬스트리지에 토큰을 저장한다.
    //         localStorage.setItem('ACCESS_TOKEN' , ACCESS_TOKEN); 
    //         localStorage.setItem('REFRESH_TOKEN' , REFRESH_TOKEN);
            
    //         setIsLogin(true); // 로그인 상태로 변경
    //     }
    // },[]);


    

    return(
        <div className="screen_MainPage">

            <TitlePink>캣츠아이</TitlePink>

            <div className="container_MainPage">
                <LineDiv onClick={goDiagnosis}>
                    <img src={diagnosis_img} alt="진단하기 이미지"></img>
                    <div>진단하기</div>
                </LineDiv>
                <LineDiv  onClick={goDiagnosisDB}>
                    <img src={diagnosis_db_img} alt="진단내역 조회 이미지"></img>
                    <div>진단 내역 조회</div>
                </LineDiv>
            </div>

            <NavBar/>

        </div>
        

    );

}
export default MainPage;