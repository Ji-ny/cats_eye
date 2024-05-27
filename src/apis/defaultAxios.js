import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// 헤더가 자동으로, 리프레시 토큰 요청을 자동으로 axios 설정!
// process.env.REACT_APP_BASE_URL
//todo 리프레시 성골하면, 전역변수로 로그인 상태 true로 해줘야함


// axios 인스턴스 생성하기
const defaultAxios = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL, // // 요청시에 추가적으로 앞에 붙는 기본 URL 설정
})



// request 헤더 지정해주기
defaultAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // hader에 accessToken을 넣는다.
        const accessToken = localStorage.getItem('ACCESS_TOKEN'); // access 토큰을 가져오는 함수
        
        if (accessToken) { // 토큰이 있다면
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
)


// * resetTokenAndReattemptRequest : 토큰 갱신과 재요청 ㅎ마수
//originalRequest를 받아서 토큰을 갱신한 후에 원래 요청을 재시도하도록 수정해야 g한다.
const resetTokenAndReattemptRequest = async ( originalRequest ) => { // originalRequest : 오리지널 요청 
    try{
        // const refreshToken =`eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjU2MTMyNiwiZXhwIjoxNzE2NTYxOTI2fQ.MkjGXp1XX47h4kTNU_9q5I89wwKUZ6zuo05QVlY6wbU`;
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');
        // console.log('refreshToken',refreshToken);

        // 리프레시 토큰으로 요청넣기.
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/reissue`, {
            refreshToken: refreshToken
        });

        console.log("refreshToken 요청성공", response);

        const ACCESS_TOKEN = response.data.result.accessToken; //accessToken 저장
        const REFRESH_TOKEN = response.data.result.refreshToken; //refreshToken 저장
        

        // 로컬스트리지에 토큰을 저장한다.
        localStorage.setItem('ACCESS_TOKEN' , ACCESS_TOKEN); 
        localStorage.setItem('REFRESH_TOKEN' , REFRESH_TOKEN);

        // 원래 요청에 새로운 토큰을 설정하고 재시도
        originalRequest.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
        return axios(originalRequest); // 원래 요청을 재시도

    } catch (retryError) {
        // 만약, 리프레시 토큰도 만료라면,
        if (retryError?.response?.data?.code === "JWT-401"){
            console.error("재시도 중 리프레시 토큰 만료!", retryError.response.data.code);
            // todo : redux 로그인 상태를 false로 넣어준다.
            // 로그인으로 이동.
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
            window.location.href = `${window.location.origin}/login`; //http://localhost:3000 자동 지정
        } 
        console.error('재시도 중 오류 발생!', retryError);
        
        return Promise.reject(retryError); // 에러 반환
    }

};

// response interceptor 설정해주기  (응답 가로채기)
// Add a response interceptor
defaultAxios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
        return response;
    },
    // *401 에러가 발생하면 위의 interceptors로 빠지고 error를 인자로 받는 두 번째 함수가 실행된다.
    async (error) => { // error 발생시,
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
        const { response: errorResponse } = error;
        const originalRequest = error.config;

        //! 이렇게하면 모든 401을 이걸로 처리하니 주의 . 나중에 후처리 해주자
        // 인증 에러 발생시 ( error 객체를 이용하여 status가 401인지를 확인)
        if  (errorResponse?.data?.code === "AUTH-401"){ //(errorResponse.status === 401) {
            try {
                return await resetTokenAndReattemptRequest(originalRequest); // 토큰을 리셋하고 원래 요청을 다시 보냄
            } catch (retryError) {
                return Promise.reject(retryError); // 재시도 중 에러가 발생하면 프로미스 반환
            }
        }

        return Promise.reject(error); //프로미스(Promise) 객체에서 에러를 명시적으로 반환
    }
    );



export default defaultAxios;
