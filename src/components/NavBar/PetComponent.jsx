import "./PetComponent.scss";

// 펫 컴포넌트 
const PetComponent = ({pet}) =>{ // 요소 하나로 받는다.
    return(
        <section className="pet_container">
            <div><img src={pet.image} alt="기존 진단 사진" /></div>
            <div>
                <div>이름 : {pet.name}</div>
                <div>나이 : {pet.age}</div>
                <div>종 : {pet.breed}</div>
                <div>상세내용 : {pet.detail}</div>
            </div>
        </section>
    );
} 

export default PetComponent;