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

    // 기본 위치를 null로 하지 않고, 정해줌으로서 내 위치 제대로 나온다. (이게뭐임?)
    const [myLatitude, setMyLatitude] = useState( 35.5459795); // 위도 기본 울대 (x)
    const [myLongitude, setMyLongitude] = useState(129.2580912); // 경도 : 기본 울대 (y)
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

    const [markerData,setMarkerData] =useState( [] ) // 마커들 데이터
    const [nearMarkerData, setNearMarkerData] = useState([]); // 내 위치 근처 마커 데이터.


    // ! (안씀 ) 전체 지도 데이터 조회 --------- //
    const getMarkers = async () => {
        const URL = `/api/v1/marker`;
        // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
        
        try{
            const response = await defaultAxios.get( URL);
            console.log('성공 /api/v1/marker response : ', response);

            // userInfo 업데이트
            setMarkerData(response.data.result);
            // console.log(userInfo);
        }    
        catch(error){
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

    }


    // ** 내 위치 기반 근처 지도 데이터 //
    const getNearMarkers = async (lng, lat) => {
        const URL = `/api/v1/marker/near?lat=${lat}&lng=${lng}`;
        // const headers = {"Authorization" : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`}; // 헤더 토큰 
        
        try{
            const response = await defaultAxios.get( URL);
            console.log('성공 /api/v1/marker/near response : ', response);

            // userInfo 업데이트
            setNearMarkerData(response.data.result);
            // console.log(userInfo);
        }    
        catch(error){
            console.error("오류 발생!", error);
            // console.log(error.response);
        }

    }

// // todo. 현재위치 이상하게 찍히는것도 해결해야함
// ** 전체 마커를 받는 API ** //
    // useEffect(()=>{
    //     getMarkers(); // 마커 먼저 위치 받고.       
    // },[]);

    // useEffect(()=>{

    //     // 마커 위치가 여러개라면!
    //     if (markerData.length>0){
    //         getCurrentPos(); // 현재 위치 받기
    //     }
        
        
    // },[markerData]);


    // useEffect(()=>{
    //     console.log(myLatitude,myLongitude)
    // },[myLatitude,myLongitude]
    // )
// ** --------------------- ** //


// ** 현재 내 위치 주변 마커를 받는 API ** //

useEffect(()=>{
    getCurrentPos(); // 마커 먼저 위치 받고.      
    // getNearMarkers();
},[]);

// 현재 위치를 받는다면, 주위 마커도 받는다.
useEffect(()=>{
    getNearMarkers(myLongitude,myLatitude);
},[myLatitude,myLongitude])

// ** --------------------------//

    
    

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
            center={{ lat: myLatitude , lng: myLongitude}} //  lat: myLatitude , lng: myLongitude지도 중심 좌표 (etri 11동 건물 기준)
            style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            level={4}
        >

        {/* 내 위치  */}
        <MapMarker position={{ lat : myLatitude, lng : myLongitude }}> 
            <div style={{ color: "#ff0000"}} >  
                    <div>  현재 내 위치 </div>
                    {/* <div> lat : {myLatitude}, lan : {myLongitude}</div> */}
            </div>
        </MapMarker>

{/* nearMarkerData : 근처  / markerData : 전체*/}
        {nearMarkerData?.map((marker, index) => (

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


