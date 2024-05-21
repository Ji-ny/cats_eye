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


function MyPage(){
    // ==== * 전역변수 관리 ====== //
    // * 전역 변수 받아오기 (로그인 상태)
    const isLogin = useSelector(state => state.isLogin); // 전역 redux stroe 내의 isLogin을가져온다.

    // * 전역변수 isLogin - 수정하는 함수 받아오기 ex ( dispatch(setIsLogin(true)))
    const dispatch = useDispatch();

    // ====================== //

    // 네비게이트 함수 
    const {goAddPet, goLogin} = useNavigates();

    
    // 반려동물 목록
    const petList = [
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"

        },
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"

        },
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"

        },
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"
        },            
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"
        }

        

    ];

    // 유저 정보 
    const userInfo = {
        image : testImg,
        name : "김땡땡",
        email : "abc@gmail.com"
    }

        
    // ** 로그아웃 버튼 ============//
    const handleLogout = () => {
        // 1. localSTroage를 지운다.
        localStorage.clear(); 

        // 2. 로그인 상태를 false로 바꾼다.
        dispatch(setIsLogin(false));
        // 2. 로그인 화면으로 넘어간다..
        goLogin();
        console.log(' 로그아웃 : 현재 로그인 상태 : ', isLogin);

        alert('로그아웃 되었습니다.');
    }

    // ** 로그아웃 끝 ================//
        



    return(
        <div className="screen_MyPage">
            <TitleDefault>마이페이지</TitleDefault>
            <section className="container_myinfo">
                <div className="myinfo__body">
                    <div><img src={userInfo.image} alt="기존 진단 사진" /></div>
                    <div>
                        <div>이름 : {userInfo.name}</div>
                        <div>나이 : {userInfo.email}</div>
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
                {/* //펫리스트 맵을 넣어줌 */}
                {petList.map((value, index) => (
                    <PetComponent key={index} pet={value}/>
                ))}
                
            </section>

            <NavBar/>
        </div>
    );
}




export default MyPage;