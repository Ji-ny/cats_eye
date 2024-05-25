import { Map, MapMarker } from 'react-kakao-maps-sdk' ;
// 카카오 지도 API 사용
import axios from 'axios';
import { useEffect, useState } from 'react';

import markerImg from '../../images/marker_img.svg';
import markerHospitalImg from '../../images/marker_hospital.png';
import defaultAxios from '../../apis/defaultAxios';

// ! 지도 보여주는 컴포넌트 ! 
function ShowMap(){
    // console.log(navigator.geolocation);

    const [myLatitude, setMyLatitude] = useState( null); // 위도 기본 울대 (x)
    const [myLongitude, setMyLongitude] = useState(null); // 경도 : 기본 울대 (y)
    const [markerDetailData, setMarkerDetailData] = useState(null); // 마커 디테일 정보 (약국/ 병원) 


    const getCurrentPos = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // alert("위치 정보를 가져오는데 성공했습니다.")
                // console.log('pos.coords.latitude : 위도 ',pos.coords.latitude);
                // console.log('pos.coords.longitude : 경도',pos.coords.longitude );
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
    

    // const [hospitalData, setHospitalData]  = useState([]); // 병원 위치 데이터

    const [markerData,setMarkerData] =useState( [
        {
            facility: '울산대학교', // name
            lat : 35.54427, // x
            lng : 129.2563, // y,
            type : "Hospital"
        },

        {
            facility: '타코야킹',
            lat : 35.54734, 
            lng : 129.2590,
            type : "pharmacy" // 약국
        }
    ] )


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

    // **지도 데이터 조회 --------- //
    const getMarkers = async () => {
        const URL = `/api/v1/marker`;
        // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
        
        try{
            const response = await defaultAxios.get( URL);
            // console.log('성공 /api/v1/marker response : ', response);

            // userInfo 업데이트
            setMarkerData(response.data.result);
            // console.log(userInfo);
        }    
        catch(error){
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

    }
// todo. 현재위치 이상하게 찍히는것도 해결해야함
    useEffect(()=>{
        getCurrentPos();
        getMarkers();
    },[]);
    
    useEffect(()=>{
        // console.log(myLatitude,myLongitude,markerData)
    },[myLatitude,myLongitude,markerData])


    // ** 마커 클릭시, ------------------------------------- //
    // 디테일한 병원 / 약국 정보 얻기 
    const handleClickMarker =  async ( marker) =>{
        console.log('id:',marker.id, 'name:',marker.facility)
        const URL = `/api/v1/marker/details/${marker.id}`
        
        try{
            const response = await defaultAxios.get( URL);
            console.log('마커 정보 성공 /api/v1/marker/details/ response : ', response);
            
            //marker Detail Data 업데이트
            setMarkerDetailData(response.data.result); // 마커 데이터 업데이트 (address, facility, id, streetNameAddress, tel)
            console.log('결과 데이터',response.data.result);

            // 병원 , 약국 디테일한 정보를 alert로 띄워준다.
            const result = `- 이름 : ${response.data.result.facility}\n- 도로명 주소 : ${response.data.result.address}\n- 주소 : ${response.data.result.streetNameAddress}\n- 전화번호 : ${response.data.result.tel}`;
            alert(result);

        }    
        catch(error){
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

    }
    // **-------------------------- //

    return(
        <Map // 지도를 표시할 Container
            center={{ lat: myLatitude , lng: myLongitude }} // 지도 중심 좌표 (etri 11동 건물 기준)
            style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            level={5}
        >
            {markerData.map((marker, index) => (

                <MapMarker 
                    key = {index}
                    position={{lat : marker.lat, lng : marker.lng}} 
                    
                    image={ marker.type === "Hospital" ? // * 병원이라면 : 병원 마커 
                    { 
                        //마커 이미지 설정
                        src: markerHospitalImg,
                        // 마커 커스텀 이미지 사이즈 지정    
                        size: {
                            width: 40,
                            height: 40,
                            },        
                    } :

                    { // * 약국이라면 : 약국 마커 
                        //마커 이미지 설정
                        src: markerImg,
                        // 마커 커스텀 이미지 사이즈 지정    
                        size: {
                            width: 40,
                            height: 40,
                            },        
                    }
                }
                    // 마커의 클릭 버튼
                    onClick={ ()=>{handleClickMarker(marker)}}

                >
                    {/* 마커 위에 띄울 것 (제목) */}
                    <div style={{ color: "#000", borderRadius:"10px" }} >  
                        <div>  {marker.facility} </div>
                    </div>
                </MapMarker>
            ))}

        </Map>
    );
}


export default ShowMap;


