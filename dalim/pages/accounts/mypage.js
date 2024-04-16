import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import LevelBar from '../../components/LevelBar';
import RecordTable from '../../components/RecordTable';
import Crewcard from '../../components/CrewCard';
import RaceCard from '../../components/RaceCard';
import Modal from '../../components/Modal';
import { Icon } from '../../components/Icons';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import { convertLocationKor } from '../../utils/convert';


const Wrapper = styled.main`
  padding-top: 10rem;

  section {
    padding-bottom: 8rem;
    position: relative;
  }

  section h2{
    font-size: var(--font-size-big);
    padding-bottom: 2rem;
  }

  section .top-sub-btn{
    position: absolute;
    right: 0;
    top: 0.5rem;
  }

  section>ul{
    display: flex;
    gap:1rem;
    flex-wrap: wrap;
  }

  section>ul>li{
    width: calc((100% - 2rem)/3);
  }

  .full-row{
    width: 100%;
    text-align: center;
  }

  // 개별 스타일링
  .user-info-section .info-area{
    display: flex;
    align-items: center;
    gap:2rem;
  }

  .user-info-section .info-area .img-area{
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
  }

  .user-info-section .info-area .img-area img{
    width:100%;
    height:100%;
    object-fit: cover;
  }

  .user-info-section .info-area .text-area{
    display: flex;
    flex-direction: column;
    gap:1rem;
  }

  .user-info-section .info-area .text-area .greeting{
    font-size: var(--font-size-bigger);
    line-height: 1.5;
    font-weight: 800;
  }

  .user-info-section .info-area .text-area .greeting b{
    color: var(--color-point);
  }

  .user-info-section .level-area{
    padding-top: 2rem;
  }

  .user-info-section .btn-area{
    padding-top: 2rem;
    display: flex;
    gap:1rem;
  }

  .race-list{
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--color-light-grey);
    border-radius: .5rem;
  }

  .race-list>li{
    width: 100%;
    padding:1rem;
    background-color: var(--color-white);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .race-list>li button{
    padding: .5rem 1rem;
    font-size: var(--font-size-small);
  }

  .race-list>li:nth-child(even){
    background-color: var(--color-light-grey);
  }

  .race-list>li:hover{
    filter: brightness(.95);
  }
  
  @media all and (max-width:1023px) {
    section>ul>li{
      width: calc((100% - 1rem)/2);
    }
  }
`;

export default function Mypage() {
  const [recordOpen, setRecordOpen] = useState(false);
  const [infomodalOpen, setInfoModalOpen] = useState(false);
  const [raceModalOpen, setRaceModalOpen] = useState(false);
  const [raceList, setRaceList] = useState([]);
  const {user, refreshToken} = useContext(AuthContext);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  const [recordList, setRecordList] = useState([]);
  const [myCrews, setMyCrews] = useState([]);
  const [myRaces, setMyRaces] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const getUserInfo = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/info/`;
    
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
    };

    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    if (user && response.status === 401) {
        console.log("토큰 재요청");
        await refreshToken();
        await getUserInfo();
    }
    
    const data = await response.json();
    setUserInfo(data);
  };

  const getRecordList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/record/`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getRecordList();
    } else if (response.status === 200) {
      const data = await response.json();
      setRecordList(data);
    } else {
      alert("기록을 불러오는데 실패했습니다.");
      console.log(response);
    }    
  };

  const getMyCrews = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/crew/`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getMyCrews();
    } else if (response.status === 200) {
      const data = await response.json();
      setMyCrews(data);
    }
  };

  const getFavoriteList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/favorites/`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getFavoriteList();
    } else if (response.status === 200) {
      const data = await response.json();
      setFavoriteList(data);
    }
  };

  const getMyRaces = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/race/`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getMyRaces();
    } else if (response.status === 200) {
      const data = await response.json();
      setMyRaces(data);
    }
  };


  // 모달 관련 함수
  const openRecordArea = () => {
    setRecordOpen(!recordOpen);
  };

  const openMyRace = async() => {
    // 0. 모달창 띄우기
    // 1. /accounts/mypage/race 대회 리스트 가져오기
    const url = `${process.env.NEXT_PUBLIC_API_URL}/races/`;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    if (response.status === 200) {
      setRaceList(data);
      setRaceModalOpen(true);
    } else {
      alert("대회 목록을 불러오는데 실패했습니다.");
      console.log(response);
    }
  };
  
  const validateForm = (data, formData) => {
    if (data.profile_image.size > 0) {
      // 첨부파일이 이미지파일인지, 용량 500mb 이하인지 확인
      const imageFile = data.profile_image;
      const imageSize = imageFile.size;
      const imageType = imageFile.type;
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
      const validImageSize = 500 * 1024 * 1024;
      if (!validImageTypes.includes(imageType)) {
        alert("이미지 파일만 첨부 가능합니다.");
        return false;
      }
      if (imageSize > validImageSize) {
        alert("이미지 파일은 500mb 이하만 첨부 가능합니다.");
        return false;
      }
    }

    // 만약 data(formData)에 빈 값이 있다면, 해당 값 삭제
    for (let key of formData.keys()) {
      if (!formData.get(key)) {
        formData.delete(key);
      }
    }

    // 만약 profile_imaged의 size가 0이라면, 해당 값 삭제
    if (formData.get("profile_image").size === 0) {
      formData.delete("profile_image");
    }

    // 만약 phone_number가 숫자가 아니라면, 해당 값 삭제
    if (isNaN(parseInt(formData.get("phone_number")))) {
      formData.delete("phone_number");
    }

    //만약 formData에 값이 없다면 alert
    let isEmpty = true;
    for (let key of formData.keys()) {
        isEmpty = false;
        break;
    }

    if (isEmpty) {
        alert("수정할 정보를 입력해주세요.");
    }


    return true;
  };

  // api 요청하는 함수
  const addRecord = async () => {
    const record_distance = prompt("몇 미터나 달리셨나요?");
    const record_description = prompt("어디서, 누구와 달리셨나요?");

    if (record_distance === null) return;
    
    if (isNaN(record_distance)) {
        alert("숫자만 입력해주세요.");
        return;
    } else {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/record/`;
        const headers = {
          "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
          "Content-Type": "application/json",
        };
        const data = {
          description: record_description,
          distance: parseInt(record_distance)
        }

        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        if (user && response.status === 401) {
          console.log("토큰 재요청");
          await refreshToken();
          await addRecord();
        } else if (response.status === 201) {
          getUserInfo();
          getRecordList();
        } else {
          alert("기록 추가에 실패했습니다.");
          console.log(response);
        }

    }      
  };

  const submitModUserInfo = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const isValid = validateForm(Object.fromEntries(data), data);

    if (isValid){
      const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/info/${user.pk}/`;
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
      };
      const response = await fetch(url, {
        method: "PATCH",
        headers: headers,
        body: data,
      });

      if (user && response.status === 401) {
        console.log("토큰 재요청");
        await refreshToken();
        await submitModUserInfo(e);
      } else if (response.status === 200) {
        getUserInfo();
        setInfoModalOpen(false);
      } else {
        alert("수정에 실패했습니다.");
        console.log(response);
      }
    }
  };

  const addMyRace = async(race_id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/race/`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
      "Content-Type": "application/json",
    };
    const data = {
      "race_id" : race_id
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await addMyRace(race_id);
    } else if (response.status === 201) {
      getMyRaces();
      setRaceModalOpen(false);
    } else {
      // respinse error 메세지 출력
      const data = await response.json();
      alert(data.error);
      console.log(response);
    }
  };

  useEffect(()=>{
    if (typeof window !== "undefined" && !user) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      router.push("/");
    } else {
      getUserInfo();
      getRecordList();
      getMyCrews();
      getMyRaces();
      getFavoriteList();
    }
  },[user])

  return (
    <Wrapper className='center-content'>
      <section className='user-info-section'>
        <h2 className='ir-hidden'>유저 기본정보</h2>
        <div className='info-area'>
          <p className='img-area'>
            <img src={
                userInfo?.profile_image ?
                `${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profile_image}` :
                '/assets/images/default_profile.jpg'
              }
              alt=""
            />
          </p>
          <div className='text-area'>
            <div className="greeting">
              {
                userInfo?.level?.title &&
                <p><b>#{userInfo?.level?.title}</b></p>
              }
              <p>
                <Link href={`/profile/${userInfo?.id}`} className="txt-btn">
                  {userInfo?.nickname}
                </Link>
                님 안녕하세요!
              </p>
            </div>
            <p>이름: {userInfo?.username}</p>
            <p>전화번호: {userInfo?.phone_number}</p>
            <p>활동지역: {convertLocationKor(userInfo?.location_city)} &gt; {userInfo?.location_district}</p>
            <button
              className='txt-btn top-sub-btn'
              onClick={()=>{setInfoModalOpen(true);}}
            >
              정보 수정하기
            </button>
          </div>
        </div>

        <div className="level-area">
          <LevelBar level={userInfo?.level} distance={userInfo?.distance}/>
        </div>
        <div className='btn-area'>
          <button
            onClick={openRecordArea}
            className='default-btn line'
          >
            {
              recordOpen ?
              <>
                달린 기록 닫기
                <Icon.Arrow direction="top" color="var(--color-point)"/>
              </>:
              <>
                달림 기록 보기
                <Icon.Arrow direction="bottom" color="var(--color-point)"/>
              </>
            }
          </button>
          <button
            onClick={addRecord}
            className='default-btn'
          >
            오늘 달린 거리 기록하기
          </button>
        </div>
      </section>

      {
        recordOpen &&
        <section>
          <h2>달린 기록 보기</h2>
          <RecordTable
            record={recordList}
            getUserInfo={getUserInfo}
            getRecordList={getRecordList}
          />
        </section>
      }

      <section>
        <h2>내가 신청한 크루 현황</h2>
        <ul>
          {
            myCrews?.map((item, index) => {
              return (
                <li key={index}>
                  <Crewcard crew={item} is_personal={true}/>
                </li>
              )
            })
          }
        </ul>
      </section>

      <section>
        <h2>내 대회 기록</h2>
        <button onClick={openMyRace} className='txt-btn top-sub-btn'>+ 대회 추가하기</button>
        <ul>
          {
            myRaces?.map((item, index) => {
              return (
                <li key={index}>
                  <RaceCard race={item} is_personal={true} getMyRaces={getMyRaces}/>
                </li>
              )
            })
          }
          {
            myRaces?.length === 0 &&
            <li className='full-row'>
              아직 참가한 대회가 없습니다.
            </li>
          }
        </ul>
      </section>

      <section>
        <h2>나의 관심 리스트</h2>
        <ul>
          {
            favoriteList?.crew?.map((item, index) => {
              return (
                <li key={index}>
                  <Crewcard crew={item}/>
                </li>
              )
            })
          }
          {
            favoriteList?.race?.map((item, index) => {
              return (
                <li key={index}>
                  <RaceCard race={item}/>
                </li>
              )
            })
          }
          {
            (favoriteList?.crew?.length === 0 && favoriteList?.race?.length === 0) &&
            <li className='full-row'>
              관심 리스트가 비어있습니다.
            </li>
          }
        </ul>
      </section>

      {
        // 정보 수정 모달
        infomodalOpen &&
        <Modal setModalOpen={setInfoModalOpen} title="정보 수정하기">
          <form onSubmit={submitModUserInfo} className='default-form'>
            <ul>
              <li>
                <label htmlFor="profile_image">프로필 사진</label>
                <input type="file" id="profile_image" name="profile_image"/>
              </li>
              <li>
                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" name="nickname" placeholder={userInfo?.nickname}/>
              </li>
              <li>
                <label htmlFor="phone_number">전화번호</label>
                <input type="text" id="phone_number" name="phone_number" placeholder={userInfo?.phone_number}/>
              </li>
              <li>
                <button type="submit" className='default-btn'>수정하기</button>
              </li>
            </ul>
          </form>
        </Modal>
      }

      {
        // 대회 추가하기 모달
        raceModalOpen &&
        <Modal setModalOpen={setRaceModalOpen}>
          <ul className='race-list'>
            {
              raceList?.map((item, index) => {
                return (
                  <li key={index}>
                    <p>
                      {item.title} / {item.start_date} ~ {item.end_date}
                    </p>
                    <p>
                      <button
                        onClick={()=>{addMyRace(item.id)}}
                        className='default-btn small'
                      >
                        내 대회에 추가하기
                      </button>
                    </p>
                  </li>
                )
              })
            }
          </ul>
        </Modal>
      }
    </Wrapper>
  )
}
