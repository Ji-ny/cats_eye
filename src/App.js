import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import './App.scss';
import { useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import DiagnosisHistoryPage from "./pages/DiagnosisHistoryPage/DiagnosisHistoryPage";
import MyPage from "./pages/MyPage/MyPage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import MapPage from "./pages/MapPage/MapPage";
import DiagnosisPage from "./pages/DiagnosisPage/DiagnosisPage";
import TestPage from "./pages/TestPage/TestPage";
function App() {

      // ** =============뷰포트 높이 구하기 ===============** //
    
      /** 현재 뷰포트 높이의 1%를 계산한다. */
      const setVh = () => {
        const vh = window.innerHeight * 0.01; //window.innerHeight : 뷰포트의 높이를 가져온다. | 뷰포트 높이를 100분의 1로 나누어서 사용하는 것 (1%)
        document.documentElement.style.setProperty('--vh', `${vh}px`); // css 변수를 만들어준다.
      }
      // * 첫 렌더링시, 뷰포트 사이즈 계산 후 적용
      useEffect(()=> {
        setVh();
        
        // 사이즈가 변경될 때, 다시 뷰포트 높이를 구한다.
        function onResize(){
          setVh();
        }
                                // 이벤트 유형 , 이벤트가 발생할때 실행하는 함수.
        window.addEventListener('resize', onResize);
      },[]);


    // ** ============================================** //

  return (
    
    <div className='screen'>
      <Routes>
        <Route path = "*" element= {<div> 404 페이지입니다.</div>}></Route>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/chatbot" element={<ChatBotPage/>}/>
        <Route path="/diagnosis_history" element={<DiagnosisHistoryPage/>}/>
        <Route path="/diagnosis" element={<DiagnosisPage/>}/> {/* 진단하기 */}
        <Route path="/mypage" element={<MyPage/>}/>         {/* 마이페이지 */}
        <Route path="/addpet" element={<AddPetPage/>} />  {/* 반려동물 추가 */}
        <Route path="/map" element = {<MapPage/>} /> {/* 근저처 병원 페이지 */}
        <Route path="test" element = {<TestPage/>}/>  {/* 테스트*/} 
      </Routes>
    </div>

  );
}

export default App;
