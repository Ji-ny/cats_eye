import "./MyPage.scss";
// ! MyPage 마이페이지 
import testImg from "../../images/puppy.svg";
import PetComponent from "../../components/NavBar/PetComponent";
import { DefaultBlutButton, StyledHr, TitleDefault } from "../../styles/styles_custom";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import useNavigates from "../../components/NavBar/useNavigates";

import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../store/store";
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";
import CustomModal from "../../components/CustomModal/CustomModal";
// process.env.REACT_APP_BASE_URL
import Swal from "sweetalert2";

function MyPage(){
    // ==== * 전역상태 관리 ====== //
    // * 전역 상태 받아오기 (로그인 상태)
    const isLogin = useSelector(state => state.isLogin); // 전역 redux stroe 내의 isLogin을가져온다.

    // * 전역상태 isLogin - 수정하는 함수 받아오기 ex ( dispatch(setIsLogin(true)))
    const dispatch = useDispatch();
    
    // ====================== //
    // ** 상태 & 변수관리 =========== //

    // 유저 정보 
    const [userInfo, setUserInfo] = useState( {
        image : testImg,
        name : "김땡땡",
        email : "abc@gmail.com"
    })

    // 반려동물 목록
    const [petList, setPetList] = useState([
    //     {   
    //         name: "테레",
    //         age : 5,
    //         species : "말티즈" ,// 종,
    //         comment : "기타사항입니다",
    //         petImageUrl : testImg,

    // },
    ]);

    // * ----------------------------------------------------- //
    // ** ======================== //


    // 네비게이트 함수 
    const {goAddPet, goLogin} = useNavigates();



        
    // ** 로그아웃 버튼 ============//
    const handleLogout = () => {
        // 1. localSTroage를 지운다.
        localStorage.clear(); 

        
        

        // 모달을 띄운다.
        // openModal('로그아웃 되었습니다.');

        //alert를 띄운다.
        Swal.fire({
            icon: 'success',
            text: '로그아웃 되었습니다.',
            });
        

        goLogin();


        dispatch(setIsLogin(false));


        
        

        // console.log(' 로그아웃 : 현재 로그인 상태 : ', isLogin);
        
    }


    // useEffect(() => {
    //     if (modalIsOpen === false && isLogin === false ) {
    //         goLogin();
    //     }
    // }, [modalIsOpen, isLogin]);
    // ** 로그아웃 끝 ================//


        
    // ** 유저 ======== //
    // 사용자 정보 받기 ---------- //
    const getAuthInfo = async () => {
        const URL = `/api/v1/auth/info`;
        // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
        
        try{
            const response = await defaultAxios.get( URL);
            // console.log('성공 /api/v1/auth/info response : ', response);

            // userInfo 업데이트
            setUserInfo(
            {
                email: response?.data?.result?.email,
                name: response?.data?.result?.name,
                image: response?.data?.result?.profileUrl
            });
            // console.log(userInfo);
        }    
        catch(error){
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

    }
    // -------------------------- //

    // ** =============== //

    // ** 반려동물 ===== // 

    // 반려동물 목록 데이터 받기 ----- //
    const getPetList = async () => {
        const URL = `/api/v1/pet/search`;

        try{

            // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
            const response = await defaultAxios.get(URL);
            console.log('성공 getPetLis response : ', response);

            // setPetList(반려동물 목록) 업데이트
            setPetList(response?.data?.result);
            console.log(response);
        }    
        catch(error){
            if (error.response?.data?.code ==="4010"){
                        // 모달을 띄운다.
            Swal.fire({
                text: '반려동물이 등록되어 있지 않습니다.',
                icon: "info"
            });                        // openModal('반려동물이 등록되어 있지 않습니다.');
                // alert("반려동물이 등록되어 있지 않습니다.");
            }else{
                console.error("오류 발생!", error);
                
            }
            
        }

    }

    useEffect(()=>{},[petList]);
    // ------------------------------ //

    // 내 반려동물 삭제하기
    const handlePetRemove = async (petId)  => {

        Swal.fire({
            icon: 'warning',
            text: '해당 반려동물을 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '예', 
            cancelButtonText: '아니오',
            confirmButtonColor: '#429f50',
            cancelButtonColor: '#d33',

        }).then(async result => {
            if (result.isConfirmed) {
                const URL =`/api/v1/pet/remove`;
                // const data = {petId : petId}; // 삭제할 petId ()
                // 폼 형식으로 만들어준다.
                const formData = new FormData();
                // formData.append("petId", new Blob([JSON.stringify(data)],{type : "application/json"})); 
                formData.append("petId", JSON.stringify(petId));
        
                try{
                    await defaultAxios.patch(URL, formData);
                    // console.log('삭제성공 /api/v1/pet/remove : ', response);
    
                    // * 모달 
                    Swal.fire({
                        icon: 'success',
                        text: '삭제되었습니다.',
                        });
                    
                    // openModal('삭제되었습니다.');
                    
                    // setPetList(반려동물 목록) 다시 업데이트
                    await getPetList();
                }    
                catch(error){
                    console.error("오류 발생!", error);
                    // alert(error);
                }
            } 

        })





    }

    

    // ** =============== //

    // 페이지가 처음 렌더링 됐을떄,

    // ekstnsgl 으로 로그인 되어 있는지 확인을 하자
    useEffect(() => {
        if (isLogin) { // 로그인이 되어 있다면!
            getAuthInfo(); // 사용자 정보를 받아온다.
            getPetList(); // 반려동물 데이터를 받아온다.
        } else{            
            // * 모달 
            Swal.fire({
                text: "로그인 후 이용해주세요.",
                icon: "info"
            });



            goLogin();
        }
    },[]);
 //



    return(
        <div className="screen_MyPage">
            <TitleDefault>마이페이지</TitleDefault>
            <section className="container_myinfo">
                <div className="myinfo__body">
                    <div><img src={userInfo.image} alt="기존 진단 사진" /></div>
                    <div>
                        <div>이름 : {userInfo.name}</div>
                        <div>이메일 : {userInfo.email}</div>
                        <button className="myingo__btn-logout" onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>
                

            </section>

            <StyledHr/>
            
            <section className="container_pet-list">
                <div className="pet-list__header">
                    <span className="pet-list__title"> 반려동물 목록 </span>
                    <DefaultBlutButton className="pet-list__btn-add" onClick={goAddPet}>동물 추가 +</DefaultBlutButton>
                </div>
                <div className="pet-list__body">
                    {/* //펫리스트 맵을 넣어줌 */}
                    {petList.map((value, index) => (
                        <div key={index} className="pet-list__component">
                            <button style={{ animationDelay: `${index * 0.2}s` }} className="myingo__btn-remove"  onClick = {()=>{ handlePetRemove(value?.perId)}}>삭제 </button>
                            <PetComponent index={index}  key={index} pet={value}/>
                        </div>
                        
                    ))}
                </div>

                
            </section>

            <NavBar/>
        </div>
    );
}




export default MyPage;