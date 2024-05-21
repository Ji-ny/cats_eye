import styled from "styled-components";


    // 기본 사진 + 글자 + 검정라인 버튼
export const LineDiv = styled.div`
    box-sizing: border-box;
    /* padding: 10px; */
    border-radius: 15px;
    background-color: #FFFFFF;
    width: 334px;
    height: 200px;

    border: 0.5px solid black;
    display: flex;
    flex-direction: column; // 세로로 배치
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #4A4A4A;
    cursor: pointer;
`;

// 캣츠아이 : 핑크색 타이틀
export const  TitlePink = styled.div`
    box-sizing: border-box;
    padding: 10px;

    font-size: 2.5rem; // 25px
    font-weight: bold;
    color: #FFA6A6;
    text-align: center;
    line-height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
    height: 15%;



`;

// 제목 : 기본 제목 페이지들 (챗봇 페이지, 등..)
export const  TitleDefault = styled.div`
    box-sizing: border-box;
    padding: 10px;

    font-size: 2rem; // 25px
    font-weight: bold;
    color: #000000;
    text-align: center;
    line-height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    height: 10%;
    width: 100%;



`;





// 버튼 : 기본 블루 색 버튼
export const DefaultBlutButton = styled.div`
    background-color: #B6CCD8;
    border-radius: 10px;
    border:1px solid black;
    font-weight: bold;

    box-sizing: border-box;
    padding: 10px;

    width: 100%;
    text-align: center;

    font-size: 1.5rem;


`


// styled Hr (라인 선 )
export const StyledHr = styled.hr`
    background-color: #C6C6C8;
    border: 0.5px solid #C6C6C8;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
`