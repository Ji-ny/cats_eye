import "./PetComponent.scss";

// 펫 컴포넌트 (onClick : 클릭 이벤트 처리)
const PetComponent = ({pet, onClick = () => console.log('클릭됨!')}) =>{ // 요소 하나로 받는다.
    return(
        <section onClick = {onClick} className="pet_container">
            <div><img src={pet.petImageUrl} alt="기존 진단 사진" /></div>
            <div>
                <li>이름 : {pet.name}</li>
                <li>나이 : {pet.age}</li>
                <li>종 : {pet.species}</li>
                <li>상세내용 : {pet.comment}</li>
            </div>
        </section>
    );
} 

export default PetComponent;