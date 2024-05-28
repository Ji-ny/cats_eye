// ! 진단하기 페이지. (사진 업로드)

import { useState } from "react";
import { DefaultBlutButton, SubTitleDefault, TitleDefault } from "../../styles/styles_custom";
import FileUpload from "../../components/FileUpload/FileUpload"
import "./DiagnosisImgUpload.scss";
import NavBar from "../../components/NavBar/NavBar";

function DiagnosisImgUpload({setLevel, setSelectedImgPreview, selectedPet, setDiagnosisResult }){ // 레벨, 이미지 프리뷰선택된 펫정보, 저장할 정상유뮤()

    const [postImg, setPostImg] = useState([]); // 서버로 전송할 img
    const [previewImg, setPreviewImg] = useState([]) // 선택된 미리보기 img


    // * [진단하기] 버튼 클릭시, 서버로 진단 부위 이미지 전송 
    const handleDiagnosis = () =>{
        // 이미지가 업로드 되어 있지 않다면,
        if (postImg.length < 1){
            alert("진단할 부위의 사진을 업로드해주세요!");
        }else{ // 이미지가 업로드 되어 있다면,
            // todo 어떻게 다음 컴포넌트로 결과를 넘길 것인가?
            setLevel(3); // 레벨을 3으로 올린다. // => 진단결과 페이지로 이동한다. // todo 이 방법도 다시 생각해야함

            // todo axios로 서버에게 이미지를 넘기자. (ㄴselected 펫으로 펫 식별자를 꺼내오자.)
            // todo setDiagnosisResult로 진단 결과를 저장하자. ()
            // preview이미지럴 넘겨주자.
            setSelectedImgPreview(previewImg);
            
        }


    }
    return(

        <div className="screen_DiagnosisImgUpload">

            <TitleDefault>진단하기</TitleDefault>
            <SubTitleDefault>진단할 부위의 사진을 업로드해주세요.</SubTitleDefault>

            {/* 사진 업로드! */}
            <section className="container_DiagnosisImgUpload">
                <FileUpload postImg = {postImg}  setPostImg = {setPostImg} previewImg={previewImg} setPreviewImg={setPreviewImg} />
                
                {/* 0.9 flex로 빈자리를 채워준다. */}
                <div style={{ flex:"0.9"}}></div>
                
                <DefaultBlutButton onClick={handleDiagnosis} > 진단하기</DefaultBlutButton>
            </section>


            
            <NavBar/>
        </div>
    )
    
}

export default DiagnosisImgUpload;