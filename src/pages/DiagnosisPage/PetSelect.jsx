// ! 펫 선택 페이지
import { DefaultBlutButton, SubTitleDefault, TitleDefault } from "../../styles/styles_custom";
import catPadImg from '../../images/catPad_img.svg';
import "./PetSelect.scss";
import NavBar from "../../components/NavBar/NavBar";
import testImg from "../../images/puppy.svg";
import PetComponent from "../../components/NavBar/PetComponent";
import useNavigates from "../../components/NavBar/useNavigates";
import defaultAxios from "../../apis/defaultAxios";
import { useEffect, useState } from "react";


function PetSelect({setLevel}){

    // 동물 추가하기 페이지로 이동한다.

    const { goAddPet } = useNavigates();

    // ** 상태 선언 ============ //

    const [petList, setPetList] = useState([]); // 반려동물 목록
    // ** ===================== // 

    // todo : 진단 동물 선택 : 진단할 동물 개수로 진단하기 페이지로 넘어간다.
    const onPetSelect = () => {
        setLevel(2); // 진단하기 페이지 (레벨2로 넘어간다.)
        // todo 현재 선택된 동물의 이름을 기억해야한다.
    }


    // ** API ===== // 

    // 반려동물 목록 데이터 받기 ----- //
    const getPetList = async () => {
        const URL = `/api/v1/pet/search`;

        try{

            // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
            const response = await defaultAxios.get( URL);
            console.log('성공 getPetLis response : ', response);

            // setPetList(반려동물 목록) 업데이트
            setPetList(response?.data?.result);
            console.log(response);
        }    
        catch(error){
            console.error("오류 발생!", error);
        }

    }
    // ------------------------------ //

    // ** =============== //


    useEffect(()=>{
        // 페이지 첫 렌더링시, 펫 리스트 받기.
        getPetList();
    },[]);

    return(
        <div className="screen_PetSelect"> 
            <TitleDefault>진단 동물 선택</TitleDefault>
            <SubTitleDefault>진단할 동물을 선택해주세요.</SubTitleDefault>

            { petList.length < 1 ? // *만약, 동물 리스트가 0개 이하라면
                <section className="container_petSelect">
                    <div className="plus_pet_box" >
                        <div><img src={catPadImg} alt="고양이 발바닥" /></div>
                        <div>진단할 동물이 없습니다.<br/>동물을 추가해주세요. </div>
                    </div>
                    <div style={{ flex:"0.9"}}></div>
                    {/* 클릭시, 동물 추가하기 페이지로 이동 */}
                    <DefaultBlutButton onClick={goAddPet}>동물 추가하기</DefaultBlutButton>
                </section>

            :  // *만약, 동물 리스트가 1개 이상이라면 
            
                <section className="container_petSelect">
                    {petList?.map((value, index) => ( // ! 일단, TempPetList 데이터 수에 따라, 데이터가 나타나게 했다
                        <PetComponent onClick={onPetSelect} key={index} pet={value}/> // todo 클릭시, queryString으로 선택된 동물 이름 넘기고 , navigate로 이동시켜야할듯 
                    ))}
                </section>

            }

            <NavBar/>
        </div>
    )
}

export default PetSelect;