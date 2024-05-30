// ! 진단하기 페이지

import { useState } from "react";
import PetSelcet from "./PetSelect";
import DiagnosisImgUpload from "./DiagnosisImgUpload";
import DiagnosisResult from "./DiagnosisResult";
import "./DiagnosisPage.scss";

function DiagnosisPage(){
    // 변수 선언 
    const [level,setLevel] = useState(1); // 1 : 진단 동물 선택, 2 : 진단하기-사진업로드, 3- 진단결과
    const [selectedPet, setSelectedPet] = useState(''); // 선택된 펫 
    const [selectedImgPreview, setSelectedImgPreview ] = useState(''); // 선택된 이미지 프리뷰
    const [diagnosisResult, setDiagnosisResult] = useState({  // 정상비정산 판결하기.
        "diagnosisId": 9,
        "petName": "유부",
        "result": "NORMAL",
        "day" : "2024-05-27",
        "time": "18:52"}); // 정상인지 판별 (정상:  true, 비정상 : false)

    return(
        <div className="screen_DiagnosisPage">
            {
                level === 1 ? // 레벨 1인 경우
                <PetSelcet setLevel={setLevel} setSelectedPet={setSelectedPet}/> 
                : level === 2? // 레벨 2인 경우 //* 선택된 레빌 
                <DiagnosisImgUpload setLevel={setLevel} setSelectedImgPreview = {setSelectedImgPreview} selectedPet={selectedPet} setDiagnosisResult={setDiagnosisResult}/>
                :
                <DiagnosisResult setLevel={setLevel} selectedImgPreview={selectedImgPreview} diagnosisResult={diagnosisResult}/> // 레벨 3인 경우
            }
        </div>  
    );
}

export default DiagnosisPage;