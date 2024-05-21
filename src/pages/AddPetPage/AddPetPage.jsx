
import { DefaultBlutButton, LineDiv, TitleDefault } from "../../styles/styles_custom";
import "./AddPetPage.scss";
import cameraImg from "../../images/camera_img.svg";
import { useRef, useState } from "react";
import axios from "axios";
import useNavigates from "../../components/NavBar/useNavigates";


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


    // ** 파일! ================================ //

    // ----- --------- --------- // 
    // 동물 추가 페이지로 간다


    const FileUpload = ({ postImg = [], previewImg = []}) =>{
        // -------------아무곳 div에서 input 클릭만 해도 되게 --------------//
        //  1. useRef 훅을 사용하여 input 요소에 접근할 수 있는 참조를 생성합니다.
        const inputRef = useRef(null);
        // 2. LineDiv를 클릭했을 때 호출되는 함수입니다.
        const handleDivClick = () => {
            // input 요소가 존재하면, input 요소를 클릭합니다.
            if (inputRef.current) {
                inputRef.current.click();
            }
        };


        //3. 파일이 업로드 되었을 때 호출하는 함수
        // ------------- 이미지 포스팅 --------------//
        // 입력한 input의 files 가져오기 (파일이 업로드 되었을 때 호출하는 함수)
        function handleUploadFile(e) {
            let fileArr = e.target.files; // (input에 업로드한 파일을 fileArr 변수에 담는다)
            setPostImg(Array.from(fileArr)); // file을 state에 업데이트. (업로드한 파일을 배열로 만듬)
            console.log('<1. fileArr\n',fileArr); // 업로드한 file을 출력해본다.

            let fileRead = new FileReader(); // 파일 데이터를 읽어올 수 있는 생성자 생성 (이걸로 이미지 파일 내용 읽을 수 있다)
            
            // fileRead객체의 onload 이벤트 핸들러에 함수를 할당한다. onload는 파일의 내용을 읽어온 후 호출됨
            // 읽어온 파일을 이용해 미리보기에 사용할 이미지 url을 만듬
            fileRead.onload = function(){  
                // result 부분에 파일 URL 내용 들어있음
                //* 이걸로 서버에 전송하는겨
                setPreviewImg(fileRead.result); // fileURL을 state에 업데이트한다. Fresult는 이미지 파일의 URL 형태로 들어있음 (문자열), base64
            };
            
             // 파일이 존재하는지 확인하는 조건문
            fileRead.readAsDataURL(fileArr[0]); // 첫 번째 파일 내용을 읽어온다.
            console.log('fileArr[0]',fileArr[0]);
            // 파일 내용을 Base64 형식의 문자열로 변환해준다. (해당 DataURL을 이미지 프리뷰에 사용하기 위함이다.)
                // -> 이걸로 프리뷰에 업로드한다.
        }
        // ------------------------------------------ //
        return (
            <LineDiv onClick={handleDivClick}>
                {/* previewImg가 없으면, camera로, 있다면 preview로! */}
                    <img src={previewImg.length <1 ? cameraImg : previewImg} alt="카메라 사진"></img>
                    <div>동물 사진 추가</div>
                    <input className="imgInput"
                        ref={inputRef}
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        style={{ display: 'none' }}  // input 요소를 화면에서 숨기기
                        onChange={(event) => handleUploadFile(event)}
                        
                    />
            </LineDiv>
        );
    }
    // ** 파일 끝 ============================================ //

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

            <FileUpload postImg = {postImg} previewImg={previewImg}/>

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