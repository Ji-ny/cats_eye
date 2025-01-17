// ! 진단내역조회 페이지

import NavBar from "../../components/NavBar/NavBar";
import { TitleDefault } from "../../styles/styles_custom";
import "./DiagnosisHistoryPage.scss";

import testImg from "../../images/diagnosis_img.svg"
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";

import { useSelector } from "react-redux";
import useNavigates from "../../hooks/useNavigates";
import Swal from "sweetalert2";

function DiagnosisHistoryPage(){

    // ==== * 전역변수 관리 ====== //
    // * 전역 변수 받아오기 (로그인 상태)
    const isLogin = useSelector(state => state.isLogin); // 전역 redux stroe 내의 isLogin을가져온다.
    
    // 네비게이트 함수
    const { goLogin} = useNavigates();

    // 동물 진단 리스트
    const [diagnosisHistoryList, setDiagnosisHistoryList] = useState([
        // {
        //     diagnosisImageUrl : testImg,
        //     time : "0000.00.00",
        //     name: "OO이",
        //     diagnosisResult : "정상"
        // }
    ]);
    

    // ** 내 반려동물 진단 내역 조회--------- //
    const getDiagnosisHistoryList = async () => {
        const URL = `/api/v1/diagnosis/search`;       
        try{
            const response = await defaultAxios.get( URL);
            setDiagnosisHistoryList(response.data.result);
        }    
        catch(error){
            if (error.response.data.code === "4020"){
                // console.log(error.response.data);
                // * 모달 
                Swal.fire({
                    text: "진단내역이 없습니다.",
                    icon: "info"
                });
            }
            else {
                console.error("오류 발생!", error);
            }
        }

    }
    // -------------------------- //
    // *로그인 확인 
    useEffect(() => {
        if (isLogin) {
            getDiagnosisHistoryList();
        } else{
            // * 모달 
            Swal.fire({
                text: "로그인 후 이용해주세요.",
                icon: "info"
            });
            goLogin();
        }
    },[]);


    return(
        <div className="screen_DiagnosisHistoryPage">
            <TitleDefault>진단 내역 조회</TitleDefault>
            {/* 진단내역들 */}

            <section className="container_diagnosis_db">
                {diagnosisHistoryList?.map((value, index) => (
                    // * 사진
                    <section style={{ animationDelay: `${index * 0.2}s` }} key={index} className="diagnosis_element">
                        <div><img src={value?.diagnosisImageUrl} alt="기존 진단 사진" /></div>
                        <div>
                            <div>날짜 : {value?.day}</div>
                            <div>이름 : {value?.name}</div>
                            <div>검사결과 : {value?.diagnosisResult === "NORMAL" ? "정상" : "비정상"}</div>
                        </div>
                    </section>
                ))}
            </section>
            <NavBar/>
        </div>
    )

}


export default DiagnosisHistoryPage;