import { DefaultBlutButton, LineDiv, SubTitleDefault, TitleDefault } from "../../styles/styles_custom";
import testImg from "../../images/test_img.jpg"; // 테스트 이미지
import "./DiagnosisResult.scss";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import useNavigates from "../../components/NavBar/useNavigates";

// ! 진단 결과 페이지
// 레벨. 선택된 이미지, 진단결과
function DiagnosisResult({setLevel, selectedImgPreview ={testImg} , diagnosisResult}){
    //setLevel :  다시하기 / 

    // todo : 인근병원찾기 , 챗봇클릭시 다른 페이지로 가는데, 다시 돌아갈 수 있어야 할듯

    // const [petName, setPetName] = useState('달달'); // 펫 이름
    // const [isNormal , setIsNormal] = useState('정상'); // 정상(true)/비정상(false)
    // const [diagnosisDate, setDiagnosisDate] = useState('20xx.xx.xx') // 날짜


    // * 네비게이트 함수
    const {goChatBotPage, goMapPage} = useNavigates();
    // 챗봇상담 / 인근병원찾기 선택시 onClick 추가.

    // 다시하기 버튼 클릭시
    const handleResetDiagnosis = () => {
        setLevel(1); //레벨을 1로 바꾼다.
    }
    return(
    <div className="screen_DiagnosisResult">
        <TitleDefault>진단결과</TitleDefault>    

        <section className="container_DiagnosisResult">
            <LineDiv>
                <img className="diagnosis_result_img"src={selectedImgPreview} alt="진단결과 이미지"/>
            </LineDiv>

            <div className="diagnosis_result_contents">
                <div className="result_title">
                    해당 사진의 AI 진단 결과,
                </div>
                <li className="result_li">
                    {/* 정상이면 red, 비장상이면 blue */}
                    <span>{diagnosisResult.petName}</span>(이)는 <span>{diagnosisResult.result === "NORMAL" ? "정상" : "비정상"}</span>입니다.
                </li>
                <li className="result_li">
                    날짜 :  {diagnosisResult.time}
                </li>

            </div>

            <div style={{flex:"0.9"}}></div>
{/* //todo 임의로 레벨 바꿔둠  */}
            <DefaultBlutButton onClick={ handleResetDiagnosis}style={{backgroundColor:"#FFB0B0"}}>다시하기</DefaultBlutButton>
            <DefaultBlutButton onClick= {goMapPage}>인근 병원 찾기</DefaultBlutButton>
            <DefaultBlutButton onClick = {goChatBotPage}>챗봇상담</DefaultBlutButton>


            
        </section>

        <NavBar/>
    </div>);
}

export default DiagnosisResult;