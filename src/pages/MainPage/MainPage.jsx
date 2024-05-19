import styled from "styled-components";
import { TitlePink } from "../../styles/styles_custom";
import diagnosis_img from "../../images/diagnosis_img.svg" 
import diagnosis_db_img from "../../images/diagnosis_db_img.svg" 

import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
    // 기본 사진 + 글자 + 검정라인 
    const LineDiv = styled.div`
        box-sizing: border-box;
        padding: 10px;
        border-radius: 15px;
        background-color: #FFFFFF;
        width: 334px;
        height: 200px;

        border: 0.5px solid black;
        display: flex;
        flex-direction: column; // 세로로 배치
        justify-content: center;
        align-items: center;

        font-size: 0.8rem;
        color: #4A4A4A;
        cursor: pointer;
    `;

function MainPage(){
    // 네비게이트 함수 선언
    const navigate = useNavigate();

    // 진단하기로 이동 
    const goDiagnosis = () => {
        navigate('/diagnosis'); 
    }

    // 진단내역 조회로 이동 
    const goDiagnosisDB = () => {
        navigate('/diagnosisDB'); 
    }


    

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

        </div>
        

    );

}
export default MainPage;