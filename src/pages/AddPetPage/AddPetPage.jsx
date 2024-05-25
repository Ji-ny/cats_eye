
import { DefaultBlutButton, LineDiv, TitleDefault } from "../../styles/styles_custom";
import "./AddPetPage.scss";
import cameraImg from "../../images/camera_img.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useNavigates from "../../components/NavBar/useNavigates";
import FileUpload from "../../components/FileUpload/FileUpload";
import defaultAxios from "../../apis/defaultAxios";



// ! 반려동물 추가 페이지
function AddPetPage(){

    //===== state 선언 =====//
    const [name, setName] = useState(''); // 이름 
    const [age, setAge] = useState(''); // 나이
    const [species, setSpecies] = useState(''); // 고양이 종
    const [comment, setComment] = useState(''); // 상세내용

    // 파일 state
    const [postImg, setPostImg] = useState([]); // (동물 사진)이미지 파일 자체 상태
    const [previewImg, setPreviewImg] = useState([]); // 이미지 파일 url 담는 상태

    // * 네비게이트
    const { goMyPage, goLogin } = useNavigates(); // 네비게이트
    //====================//
    


    // ====== input 핸들러 함수 ===== //
    // 이름 input 핸들러
    const handleNameChange = (event) => {
        setName(event.target.value);
        // console.log(name);
    }
    // 나이 핸들러
    const handleAgeChange = (event) => {
        setAge(event.target.value);
        // console.log(age);
    }
    // 종 핸드러
    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
        // console.log(breed);
    }
    // 세부사항 핸들러
    const handleCommentChange = (event) => {
        setComment(event.target.value);
        // console.log(detail);
    }
    //================================//




    // ** 동물 등록하기 버튼 ==== //
    
    const handleAddPet =  async () => {
        // // 그동안 입력해온 pet 데이터
        const dtoData = {
                name : name,
                age : age,
                species : species,
                comment : comment,
        }

        const formData = new FormData();
        // applicatin/json 으로 Dto 데이터 추가.
        formData.append("Dto", new Blob([JSON.stringify(dtoData)], {
            type: "application/json"
        }))
        formData.append('Image', postImg[0] ); // 이미지 파일 FormData에 추가

        console.log(formData);
        // console.log('petFormData',petData);
        //  ! 여기에 동물 등록하는거 전송하는 API 를 써야한다.
        const URL = `/api/v1/pet/enroll`;
        // console.log(defaultAxios.defaults.headers)

        // const header = {"Content-type": "application/json" }
        try{
            const response = await defaultAxios.post( URL, formData);
            console.log('펫 추가하기 성공/pet/enroll response : ', response);
            alert(`${name}이(가) 추가되었습니다.`);
        }    
        catch(error){
            alert(`${name}이(가) 추가되지 않았습니다 (오류).`);
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

        // console.log(petData);
        goMyPage();

    }

    // ** ==========================//


    useEffect(()=>{
        console.log('postimg', postImg[0])
    },[postImg])
    
    return(
        <div className="screen_AddPetPage">
            <TitleDefault>반려동물 추가</TitleDefault>

            <FileUpload postImg = {postImg} previewImg={previewImg} setPostImg = {setPostImg} setPreviewImg={setPreviewImg}/>

            <section className="container_pet-form">
                <div className="pet-form__mini">
                    <div>이름</div>
                    <div>
                        <input 
                            className ="pet-form__input"
                            type='text'
                            placeholder='ex) 직직이'
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>

                <div  className="pet-form__mini">
                    <div>나이(살)</div>
                    <div>
                        <input
                            className ="pet-form__input"
                            type='text'
                            placeholder='ex) 1'
                            value={age}
                            onChange={handleAgeChange}
                        />
                    </div> 
                </div>

                <div  className="pet-form__mini">
                    <div>고양이 종</div>
                    <div >
                        <input
                            className ="pet-form__input"
                            type='text'
                            placeholder='ex) 페르시안'
                            value={species}
                            onChange={handleSpeciesChange}
                        /> 
                    </div>
                </div>

                <div className="pet-form__mini">
                    <div>상세 내용</div>
                    <div>
                        <input
                            className ="pet-form__input"
                            type='text'
                            placeholder='ex) 귀여움'
                            value={comment}
                            onChange={handleCommentChange}
                        /> 
                    </div>
                </div>
            </section>

            <section className="btn_pet-add">
                <DefaultBlutButton onClick={handleAddPet}>동물 등록하기</DefaultBlutButton>
            </section>
            

        </div>
    );
}


export default AddPetPage;