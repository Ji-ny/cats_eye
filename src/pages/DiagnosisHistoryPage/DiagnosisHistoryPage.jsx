// ! 진단내역조회 페이지

import NavBar from "../../components/NavBar/NavBar";
import { TitleDefault } from "../../styles/styles_custom";
import "./DiagnosisHistoryPage.scss";

import testImg from "../../images/diagnosis_img.svg"
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";

function DiagnosisHistoryPage(){


    // 동물 진단 리스트
    const [diagnosisHistoryList, setDiagnosisHistoryList] = useState([
        {
            diagnosisImageUrl : testImg,
            time : "0000.00.00",
            name: "OO이",
            diagnosisResult : "정상"
        }
    ]);
    

    // ** 내 반려동물 진단 내역 조회--------- //
    const getDiagnosisHistoryList = async () => {
        const URL = `/api/v1/diagnosis/search`;
        // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
        
        try{
            const response = await defaultAxios.get( URL);
            console.log('성공 /api/v1/diagnosis/search response : ', response);

            // userInfo 업데이트
            setDiagnosisHistoryList(response.data.result);
            // console.log(userInfo);
        }    
        catch(error){
            if (error.response.data.code === "4020"){
                // console.log(error.response.data);
                alert("진단내역이 없습니다.");
                
            }
            else {
                console.error("오류 발생!", error);
            }
            // console.log(error.response);
        }

    }
    // -------------------------- //

    useEffect(()=>{
        // 첫 렌더링시 동물진단정보받기
        getDiagnosisHistoryList();
    },[])

    return(
        <div className="screen_DiagnosisHistoryPage">
            <TitleDefault>진단 내역 조회</TitleDefault>
            {/* 진단내역들 */}

            <section className="container_diagnosis_db">
                {diagnosisHistoryList?.map((value, index) => (
                    // * 사진
                    <section key={index} className="diagnosis_element">
                        <div><img src={value?.diagnosisImageUrl} alt="기존 진단 사진" /></div>
                        <div>
                            <div>날짜 : {value?.time}</div>
                            <div>이름 : {value?.name}</div>
                            <div>검사결과 : {value?.diagnosisResult}</div>
                        </div>
                    </section>
                ))}
            </section>
            <NavBar/>
        </div>
    )

}


export default DiagnosisHistoryPage;