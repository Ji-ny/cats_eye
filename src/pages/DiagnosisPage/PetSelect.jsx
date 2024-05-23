// ! 펫 선택 페이지
import { DefaultBlutButton, SubTitleDefault, TitleDefault } from "../../styles/styles_custom";
import catPadImg from '../../images/catPad_img.svg';
import "./PetSelect.scss";
import NavBar from "../../components/NavBar/NavBar";
import testImg from "../../images/puppy.svg";
import PetComponent from "../../components/NavBar/PetComponent";
import useNavigates from "../../components/NavBar/useNavigates";

    // 반려동물 목록 더미데이터 
    const TempPetList = [
        {
            image : testImg,
            age : 5,
            name: "테레",
            breed : "말티즈" ,// 종,
            detail : "기타사항입니다"

        },
    ];


function PetSelect({setLevel}){
    // 동물 추가하기 페이지로 이동한다.

    const { goAddPet } = useNavigates();

    // todo : 진단 동물 선택 : 진단할 동물 개수로 진단하기 페이지로 넘어간다.
    const onPetSelect = () => {
        setLevel(2); // 진단하기 페이지 (레벨2로 넘어간다.)
        // todo 현재 선택된 동물의 이름을 기억해야한다.
    }
    return(
        <div className="screen_PetSelect"> 
            <TitleDefault>진단 동물 선택</TitleDefault>
            <SubTitleDefault>진단할 동물을 선택해주세요.</SubTitleDefault>

            { TempPetList.length < 1 ? // *만약, 동물 리스트가 0개 이하라면
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
                    {TempPetList?.map((value, index) => ( // ! 일단, TempPetList 데이터 수에 따라, 데이터가 나타나게 했다
                        <PetComponent onClick={onPetSelect} key={index} pet={value}/> // todo 클릭시, queryString으로 선택된 동물 이름 넘기고 , navigate로 이동시켜야할듯 
                    ))}
                </section>

            }

            <NavBar/>
        </div>
    )
}

export default PetSelect;