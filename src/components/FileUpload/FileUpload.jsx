    // ** 파일! ================================ //

import { useRef } from "react";
import cameraImg from "../../images/camera_img.svg";
import { LineDiv } from "../../styles/styles_custom";

    // ----- --------- --------- // 
    // 동물 추가 페이지로 간다

    
    const FileUpload = ({ postImg, previewImg, setPostImg , setPreviewImg}) =>{

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
                {previewImg.length < 1 ?  // 프리뷰 사진 있다면, 프리뷰 사진 띄ㅜ고, 없으면 카메라 사진 띄움.
                <img src={cameraImg} alt="카메라 사진"/> :
                <img src={previewImg} alt="프리뷰 사진" style={!previewImg ? {} : { width: "100%", height: "100%" , borderRadius:"15px" }}/>                
                }
                <div style={previewImg.length < 1 ? {} : { display: "none" }}>동물 사진 추가</div>

                
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

    export default FileUpload;