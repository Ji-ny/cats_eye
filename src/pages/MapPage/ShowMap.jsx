import { Map, MapMarker } from 'react-kakao-maps-sdk' ;
// 카카오 지도 API 사용
import axios from 'axios';
import { useEffect, useState } from 'react';

import markerImg from '../../images/marker_img.svg';

// ! 지도 보여주는 컴포넌트 ! 
function ShowMap(){
    console.log(navigator.geolocation);

    const [myLatitude, setMyLatitude] = useState(0); // 위도 기본 울대 (x)
    const [myLongitude, setMyLongitude] = useState(0); // 경도 : 기본 울대 (y)

    const getCurrentPos = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // alert("위치 정보를 가져오는데 성공했습니다.")
                console.log('pos.coords.latitude : 위도 ',pos.coords.latitude);
                console.log('pos.coords.longitude : 경도',pos.coords.longitude );
                setMyLatitude(pos.coords.latitude); // 위도 업데이트
                setMyLongitude(pos.coords.longitude); // 경도 업데이트
            },
            () => alert("위치 정보를 가져오는데 실패했습니다."), //실패시
            { // 속성.
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            }
        )
    }
    
    useEffect(()=>{
        getCurrentPos();

    },[]);
    // const [hospitalData, setHospitalData]  = useState([]); // 병원 위치 데이터

    const hospitalData = [
        {
            name: '울산대학교',
            X_Pos : 35.54427, 
            Y_Pos : 129.2563
        },

        {
            name: '타코야킹',
            X_Pos : 35.54734, 
            Y_Pos : 129.2590
        }
    ] 

    // 현재 내 위치 (울산대 기준)
    const myLocation = {
        X_Pos : 35.54427,
        Y_Pos : 129.2563
    }

    // //========= 상태 ==============//
    // // 위치 정보를 받아옵니당
    // const [ricData, setRicData] = useState([]);
    // //=============================//
    // const getRicData = async () => {
    //     try {
    //     let url = `http://localhost:5000/ric-info`;
    //     const response = await axios.get(url); // 호출해 데이터를 가져온다.
        
    //     // 성공 핸들링
    //     setRicData(response.data);
        
    //     } catch (error) {
    //     // 실패시 핸들링
    //     console.log(error);
    //     // throw error; // 오류를 다시 던져서 호출한 쪽에서 오류 처리 가능
    //     }
    // }    


    
    return(
        <Map // 지도를 표시할 Container
            center={{ lat: myLatitude , lng: myLongitude }} // 지도 중심 좌표 (etri 11동 건물 기준)
            style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            level={3}
        >
            {hospitalData.map((hospital, index) => (

                <MapMarker 
                    key = {index}
                    position={{lat : hospital['X_Pos'], lng : hospital['Y_Pos']}} 
                    
                    image={{
                        //마커 이미지 설정
                        src: markerImg,
                        // 마커 커스텀 이미지 사이즈 지정    
                        size: {
                            width: 30,
                            height: 30,
                            },        
                    }}
                    // 마커의 클릭 버튼
                    onClick={ () => {console.log(hospital['Y_Pos'])}}

                >
                    {/* 마커 위에 띄울 것  */}
                    <div style={{ color: "#000" }} >  
                        <div>  {hospital['name']} </div>
                    </div>
                </MapMarker>
            ))}

        </Map>
    );
}


export default ShowMap;


