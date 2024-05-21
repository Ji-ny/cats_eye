
import { DefaultBlutButton, LineDiv, TitleDefault } from "../../styles/styles_custom";
import "./AddPetPage.scss";
import cameraImg from "../../images/camera_img.svg";
import { useRef, useState } from "react";
import axios from "axios";
import useNavigates from "../../components/NavBar/useNavigates";
import FileUpload from "../../components/FileUpload.jsx/FileUpload";



// ! 반려동물 추가 페이지
function AddPetPage(){

    //===== state 선언 =====//
    const [name, setName] = useState(''); // 이름 
    const [age, setAge] = useState(''); // 나이
    const [breed, setBreed] = useState(''); // 고양이 종
    const [detail, setDetail] = useState(''); // 상세내용

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
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
        // console.log(breed);
    }
    // 세부사항 핸들러
    const handleDetailChange = (event) => {
        setDetail(event.target.value);
        // console.log(detail);
    }
    //================================//




    // ** 동물 등록하기 버튼 ==== //
    
    const handleAddPet =  () => {
        // 그동안 입력해온 pet 데이터
        const petData = {
            image : postImg, 
            name : name,
            age : age,
            breed : breed,
            detail : detail,
        }
    //  ! 여기에 동물 등록하는거 전송하는 API 를 써야한다.
        // axios.post(url, data, {headers : headers });

        console.log(petData);
        goMyPage();

            
    }

    // ** ==========================//



    
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
                            value={breed}
                            onChange={handleBreedChange}
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
                            value={detail}
                            onChange={handleDetailChange}
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