// ! 진단하기 페이지

import { useState } from "react";
import PetSelcet from "./PetSelect";
import DiagnosisImgUpload from "./DiagnosisImgUpload";
import DiagnosisResult from "./DiagnosisResult";
import "./DiagnosisPage.scss";

function DiagnosisPage(){
    // 변수 선언 
    const [level,setLevel] = useState(1); // 1 : 진단 동물 선택, 2 : 진단하기-사진업로드, 3- 진단결과

    return(
        <div className="screen_DiagnosisPage">
            {
                level === 1 ? // 레벨 1인 경우
                <PetSelcet setLevel={setLevel}/> 
                : level === 2? // 레벨 2인 경우
                <DiagnosisImgUpload setLevel={setLevel}/>
                :
                <DiagnosisResult setLevel={setLevel}/> // 레벨 3인 경우
            }
        </div>
    );
}

export default DiagnosisPage;