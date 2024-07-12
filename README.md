# cats_eye
[캡스톤디자인II] 고양이 눈 진단 반응형 웹 사이트입니다.

![image](https://github.com/user-attachments/assets/3426d5b9-c4bb-42db-80b5-758f95815621)


## **🔗  Links**

- **배포 홈페이지** : [Cat's eye (cats-eye-it.netlify.app)](https://cats-eye-it.netlify.app/login)
- **시연영상** : https://youtu.be/kzKyBpSzyZA?si=m2jUCrvRN0EJawVZ
- **Github** : https://github.com/Ji-ny/cats_eye

## 📖 요약

- 딥러닝을 활용하여 고양이 결막염 유무를 판단하는 자동화 된 시스템을 개발하여 **결막염 여부를 신속하게 확인**하고 **주변 동물 병원 추천** 및 **챗봇 기능**을 통해 **양육자가 반려묘 관리를 편리하게, 그리고 조기 진단과 치료에 도움**을 줄 수 있도록 함.

## 🛠️ 사용 기술 및 라이브러리

1. **주요 기술**
    - React, JavaScript
2. **주요 라이브러리**
    - 모달 : react-modal, sweetalert2
    - 지도 : React-kakao-maps-sdk , navigator.geolocation.
    - 스타일링 :  Scss, Styled-Components
    - 전역 상태관리 : @reduxjs/toolkit react-redux
    - API : axios (axios  interceptors)
    - CI/CD : netlify, github, gh-pages
3. **기타**
    - 데이터가공 : Blob class
    - 환경변수 저장 : .evn
    

## 🙋‍♂️ 담당한 역할

### Web Frontend (100%)

- 전체 화면 제작 (로그인, 메인화면, 마이페이지, 인근동물병원/약국지도, 고양이 눈 질병 챗봇, 진단하기 등 )
    
   ![image](https://github.com/user-attachments/assets/c6f18bcc-9220-4bf0-b2c4-2854e7c06c48)

- 특히 진단하기 페이지 업로드에서, 사진 업로드 후 formData로 사진 업로드후 백엔드 AI에서 정상/비정상 판별 후 받아오는 데이터를 토대로 데이터를 띄워줌.
    
   ![image](https://github.com/user-attachments/assets/03f64284-d973-42e4-bb68-3ec9448ad9de)

- netlify를 활용하여 배포 진행
- react-redux를 활용해 로그인 정보 state 저장
- aixos interceptors를 활용해, 토큰 만료시 리프레시 토큰 요청 코드 제작
- kakao map api를 활용해 인근 병원/약국의 지도를 마커를 찍어서 나타냄
- 고양이 눈 질병 챗봇에서 messageQueue 배열을 제작해 메시지를 주고 받고 저장
- useNavigate 훅을 커스텀하여 여러 페이지에서 편리하게 페이지를 이동할 수 있는 함수 제작 등
- 모바일 사이즈 맞춤 반응형 웹 제작

### Design

- Figma 활용 디자인

## 💡 성장 경험

- netlify를 활용해 CI/CD 구축에 대해 이해하게 됐습니다.
- 메세지를 주고받을때 messageQueue를 활용해서 메세지를 나타내는 방식을 알게되었습니다.
- 커스텀 훅을 제작하는 법을 알게됐습니다.
- axios 인스턴스를 커스텀해서 미리 url및 헤더를 지정하고, interceptors를 이용해 오류를 가로채 토큰 재요청하는 등의 로직을 이해하게 됐습니다.
- 소셜 로그인 과정에서 토큰을 localStorage에 저장하고 사용하는 법을 알게됐습니다
- 사진과 글자 데이터를 함께 전송할때는, formData로 보내야하는데 이때 Content-type을 다르게 전송해야 하는 경우,이미지 파일의 경우 Blob(Binary Large Object)의 형태로 보내야 원활하게 백엔드 서버로 전송할 수 있음을 알게됐습니다.
- 현재 위치를 받아오기 위해서는 navigator.geolocation.getCurrentPosition를 사용해 받아올 수 있다는 것을 알게됐습니다.
- 로그인 후 url에서 토큰을 추출하고, url 쿼리스트링을 없애기 위해서는 간단하게 window.history.replaceState 함수로 변경할 수 있음을 알게됐습니다. 이 경험을 통해 바닐라 자바스크립트 기초 지식의  필요성을 느끼게 되었습니다.
- 이번 프로젝트에서는 githubDesktop을 쓰지 않고, git만 사용하여 프로젝트를 진행해보고자 했습니다. 결과적으로 git에 간단하게 push, pull, dev브랜치, main브랜치 등으로 나눠서 커밋하는 정도는 익숙하게 할 수 있게 되었습니다.
- gitignore을 활용해 환경변수파일 (.env)을 가렸습니다. 환경변수를 가리는 것은 보안상 매우 중요하다는 것을 알게되었습니다.

## ✨ 성과

- 울산대학교 캡스톤디자인 어워드 출품 : [울산대학교 캡스톤디자인 어워드 홈페이지 (ulsan.ac.kr)](https://universe.ulsan.ac.kr/award/award_detail?csrf_test_name=61f693895eb2ec513c1d4b1197d452c2&schCode=KOSW198998&schState=&schKeyword=%EA%B3%A0%EC%96%91%EC%9D%B4&schCategory=&schSite=&schYear=&schSemeter=&schCategory=&schItem=&schKeyword=%EA%B3%A0%EC%96%91%EC%9D%B4&page=1)
