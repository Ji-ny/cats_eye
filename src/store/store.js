import { configureStore, createSlice } from "@reduxjs/toolkit";

// 상태 관리를 위한 slice를 생성
export const isLoginSlice = createSlice({
    name: 'isLogin', // slice의 이름을 지정 (컴포넌트와 동일하게)
    initialState: true, // slice state의 초기 상태를 지정 // ! 임시로 true로 해둠(기본 false)
    
    // 상태 수정 함수 생성 (setCellId)
    reducers: { 
        // cellId 상태 업데이트하는 함수 리듀서 선언
        setIsLogin: (state, action) => {
            return action.payload;
        },
    },
});

// 액션 생성자를 export
export const { setIsLogin } = isLoginSlice.actions;

// 1. store 만들기 (store은 한개만 만들어야함.)
const store = configureStore({
    reducer: {
        isLogin: isLoginSlice.reducer,
    },
});

export default store;
