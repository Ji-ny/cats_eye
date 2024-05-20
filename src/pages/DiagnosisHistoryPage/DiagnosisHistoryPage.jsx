// ! 진단내역조회 페이지

import NavBar from "../../components/NavBar/NavBar";
import { TitleDefault } from "../../styles/styles_custom";
import "./DiagnosisHistoryPage.scss";

import testImg from "../../images/diagnosis_img.svg"

function DiagnosisHistoryPage(){

    // 동물 진단 리스트
    const diagnosisHistoryList = [
        {
            image : testImg,
            date : "2022.01.10",
            name: "테레",
            result : "정상"
        },
        {
            image : testImg,
            date : "2022.01.10",
            name: "햄찌",
            result : "비정상"
        },
        {
            image : testImg,
            date : "2022.01.10",
            name: "테레",
            result : "정상"
        },
        {
            image : testImg,
            date : "2022.01.10",
            name: "테레",
            result : "정상"
        },
        {
            image : testImg,
            date : "2022.01.10",
            name: "테레",
            result : "정상"
        },
        {
            image : testImg,
            date : "2022.01.10",
            name: "테레",
            result : "정상"
        }
    ];


    

    return(
        <div className="screen_DiagnosisHistoryPage">
            <TitleDefault>진단 내역 조회</TitleDefault>
            {/* 진단내역들 */}

            <section className="container_diagnosis_db">
                {diagnosisHistoryList.map((value, index) => (
                    // * 사진
                    <section key={index} className="diagnosis_element">
                        <div><img src={value.image} alt="기존 진단 사진" /></div>
                        <div>
                            <div>날짜 : {value.date}</div>
                            <div>이름 : {value.name}</div>
                            <div>검사결과 : {value.result}</div>
                        </div>
                    </section>
                ))}
            </section>
            <NavBar/>
        </div>
    )

}


export default DiagnosisHistoryPage;