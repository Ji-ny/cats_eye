import { useNavigate } from "react-router-dom";
// ! 네비게이트 커스텀 훅 

const useNavigates = () => {
    const navigate = useNavigate();


    // 동물 추가하기
    const goAddPet = () => {
        navigate("/addpet");
    };

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

    // 마이페이지로 이동 
    const goLogin = () => {
        navigate('/login');
    }

    // 진단하기로 이동 
    const goDiagnosis = () => {
        navigate('/diagnosis'); 
    }

    // 진단내역 조회로 이동 
    const goDiagnosisDB = () => {
        navigate('/diagnosis_history'); 
    }
    // 다른 네비게이션 함수들도 여기에 추가할 수 있습니다
    // 예: const goHome = () => { navigate("/home"); };

    return {
        goAddPet,
        goChatBotPage,
        goMainPage,
        goMapPage,
        goMyPage,
        goLogin,
        goDiagnosis,
        goDiagnosisDB,

        // 다른 함수들도 여기에 추가
        // goHome,
    };
};

export default useNavigates;


/* // * 사용하는법 ! 
import React from "react";
import useNavigates from "./navigates";

const SomeComponent = () => {
    const { goAddPet } = useNavigates();

    return (
        <button onClick={goAddPet}>Add Pet</button>
    );
};

export default SomeComponent;


*/
