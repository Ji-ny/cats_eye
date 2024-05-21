import NavBar from "../../components/NavBar/NavBar";
import { TitleDefault } from "../../styles/styles_custom";
import './MapPage.scss';
import ShowMap from "./ShowMap";

// ! 인근 병원 찾기 페이지
function MapPage(){
    
    return(
        <div className="screen_MapPage">
            <TitleDefault >인근 병원 찾기</TitleDefault>
            {/* 지도 컨테이너 */}
            <section className="container_map">
                <ShowMap/>
            
            </section>
            <NavBar/>

            
        </div>
    );

}


export default MapPage;