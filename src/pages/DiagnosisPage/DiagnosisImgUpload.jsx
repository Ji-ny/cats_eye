// ! 진단하기 페이지. (사진 업로드)

import { useState } from "react";
import { DefaultBlutButton, SubTitleDefault, TitleDefault } from "../../styles/styles_custom";
import FileUpload from "../../components/FileUpload/FileUpload"
import "./DiagnosisImgUpload.scss";
import NavBar from "../../components/NavBar/NavBar";
import defaultAxios from "../../apis/defaultAxios";
import Swal from "sweetalert2";

function DiagnosisImgUpload({setLevel, setSelectedImgPreview, selectedPet, setDiagnosisResult }){ // 레벨, 이미지 프리뷰선택된 펫정보, 저장할 정상유뮤()

    const [postImg, setPostImg] = useState([]); // 서버로 전송할 img
    const [previewImg, setPreviewImg] = useState([]) // 선택된 미리보기 img


    // * [진단하기] 버튼 클릭시, 서버로 진단 부위 이미지 전송 
    const handleDiagnosis = async () =>{
        try{
            
            if (postImg.length < 1){
                // * 모달  
                Swal.fire({
                    text: "진단할 부위의 사진을 업로드해주세요.",
                    icon: "info"
                });
            }else{ // 이미지가 업로드 되어 있다면,

                const url = `/api/v1/diagnosis/upload?petId=${selectedPet.perId}`; // petId를 쿼리스트링으로 넘겨줌

                // todo. 나중에 다 주석 풀것.
                // //* API 요청을 한다. 
                // const formData = new FormData();
                // formData.append('petImage', postImg[0] ); 
                
                // const response = await defaultAxios.post( url, formData);

                // console.log( `/api/v1/diagnosis/upload?petId=${postImg}`, response);
                setLevel(3); // 레벨을 3으로 올린다. // => 진단결과 페이지로 이동한다. // todo 이 방법도 다시 생각해야함
                // preview이미지럴 넘겨주자.
                // setSelectedImgPreview(previewImg); // *프리뷰 이미지 저장
                // setDiagnosisResult(response.data.result); // *진단 결과 저장
                
            }

        }catch(error){
            console.error("오류 발생!", error);

        }
        // 이미지가 업로드 되어 있지 않다면,


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