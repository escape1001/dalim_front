import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import LevelBar from '../../components/LevelBar';
import RecordTable from '../../components/RecordTable';
import Crewcard from '../../components/Crewcard';
import RaceCard from '../../components/RaceCard';
import Modal from '../../components/Modal';
import { Icon } from '../../components/Icons';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';


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
  const {user} = useContext(AuthContext);
  const router = useRouter();

  const user_info = {
    id:1,
    username: "김달림",
    nickname: "달려달려",
    phone_number: "010-1234-1234",
    location_city:"서울",
    location_district:"잠실",
    distance:42500,
    level: {
        title:"새싹 달림이",
        number: 1,
        next_distance: 50000
      },
    profile_image: "https://picsum.photos/200"
  };

  const record = [
    {
      id:2,
      created_at: "2023-24-25",
      description: "대회명 등 자유입력",
      distance : 500,
    },
    {
      id:3,
      created_at: "2023-24-25",
      description: "오늘뛴거",
      distance : 200,
    },
  ];

  const my_crews = [
    {
        id: 1,
        status:"심사중",
        name : "오름크루",
        location_city:"서울",
        location_district:"잠실",
        meet_days:["mon","sat"],
        meet_time:"PM 5:30",
        thumbnail_image: "https://picsum.photos/200"
    },
    {
        id: 2,
        status:"승인",
        name : "오름크루",
        location_city:"서울",
        location_district:"잠실",
        meet_days:["mon","sat"],
        meet_time:"PM 5:30",
        thumbnail_image: "https://picsum.photos/200"
    },
  ];

  const my_races = [
    {
      id:1,
      reg_status:"접수완료",
      d_day: 3,
      location: "서울 양천운동장",
      name : "양천마라톤",
      start_date: "2024/05/30",
      end_date: "2024/05/31",
      reg_start_date: "2024/04/15",
      reg_end_date: "2024/05/27",
      courses: ["full"],
      record: null,
      thumbnail_image: "https://picsum.photos/200"
    },
    {
      id:2,
      reg_status:"접수완료",
      d_day: null,
      location: "서울 양천운동장",
      name : "양천마라톤",
      start_date: "2024/05/30",
      end_date: "2024/05/31",
      reg_start_date: "2024/04/15",
      reg_end_date: "2024/05/27",
      courses: ["full"],
      record: "5:50",
      thumbnail_image: "https://picsum.photos/200"
    },
    {
      id:3,
      reg_status:"접수완료",
      d_day: null,
      location: "서울 양천운동장",
      name : "양천마라톤",
      start_date: "2024/05/30",
      end_date: "2024/05/31",
      reg_start_date: "2024/04/15",
      reg_end_date: "2024/05/27",
      courses: ["full"],
      record: null,
      thumbnail_image: "https://picsum.photos/200"
    },
  ];

  // races/에 있는 대회 리스트. for addMyRace
  const race_list = [
    {
      "id": 1,
      "title": "양천구마라톤",
      "reg_status": "접수중",
      "d_day":12,
      "location": "서울 양천운동장",
      "start_date": "2024/05/30",
      "end_date": "2024/05/31",
      "reg_start_date": "2024/04/15",
      "reg_end_date": "2024/05/27",
      "courses": ["full", "half", "5km", "3km"],
      "thumbnail_image": "https://picsum.photos/200",
      "is_favorite": true,
    },
    {
      "id": 1,
      "title": "양천구마라톤",
      "reg_status": "접수중",
      "d_day":12,
      "location": "서울 양천운동장",
      "start_date": "2024/05/30",
      "end_date": "2024/05/31",
      "reg_start_date": "2024/04/15",
      "reg_end_date": "2024/05/27",
      "courses": ["full", "half", "5km", "3km"],
      "thumbnail_image": "https://picsum.photos/200",
      "is_favorite": true,
    },
  ];

  const favorite_list = {
      crew: [
        {
          "id": 1,
          "name": "러닝 크루 A",
          "is_favorite": true,
          "meet_days": ["sat"],
          "meet_time": "07:00",
          "thumbnail_image": "https://picsum.photos/200",
          "member_count": 20,
          "location_city": "서울",
          "location_district": "잠실"
        },
      ],
      race: [
        {
          "id": 1,
          "title": "양천구마라톤",
          "reg_status": "접수중",
          "d_day":12,
          "location": "서울 양천운동장",
          "start_date": "2024/05/30",
          "end_date": "2024/05/31",
          "reg_start_date": "2024/04/15",
          "reg_end_date": "2024/05/27",
          "courses": ["full", "half", "5km", "3km"],
          "thumbnail_image": "https://picsum.photos/200",
          "is_favorite": true,
        },
        {
          "id": 1,
          "title": "양천구마라톤",
          "reg_status": "접수중",
          "d_day":12,
          "location": "서울 양천운동장",
          "start_date": "2024/05/30",
          "end_date": "2024/05/31",
          "reg_start_date": "2024/04/15",
          "reg_end_date": "2024/05/27",
          "courses": ["full", "half", "5km", "3km"],
          "thumbnail_image": "https://picsum.photos/200",
          "is_favorite": true,
        },
      ]
  };

  // 모달 관련 함수
  const openRecordArea = () => {
    setRecordOpen(!recordOpen);
  };

  const openMyRace = () => {
    // 0. 모달창 띄우기
    setRaceModalOpen(true);
    // 1. /accounts/mypage/race 대회 리스트 가져오기
    setRaceList(race_list);
  };
  
  const validateForm = (data) => {
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
    return true;
  };

  // api 요청하는 함수
  const addRecord = () => {
    // prompt로 입력할 값 입력받기. 숫자만 입력받도록 유효성 검사
    const record_distance = prompt("몇 미터나 달리셨나요?");
    const record_description = prompt("어디서, 누구와 달리셨나요?");

    if (record_distance === null) return;
    
    if (isNaN(record_distance)) {
        alert("숫자만 입력해주세요.");
        return;
    } else {
        // 입력 요청 [TO DO : /accounts/mypage/record/<int:record_id> POST 요청]
        const data = {
          description: record_description,
          distance: parseInt(record_distance)
        }
    }      
  };

  const submitModUserInfo = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const isValid = validateForm(Object.fromEntries(data));

    if (isValid){
      // [TO DO] 1. /accounts/mypage에 PATCH 요청하기
      alert("정보 수정 완료");
      setInfoModalOpen(false);

      // 확인용 : data의 formData json으로 변환
      let object = {};
      data.forEach((value, key) => {
        object[key] = value;
      });
      console.log(object);
    }
  };

  const addMyRace = (race_id) => {
    // [TO DO] 1. 선택한 대회 id로 /accounts/mypage/race에 POST 요청하기
    alert(race_id);
    // 200받고 reload해버리자..
  };

  useEffect(()=>{
    if (typeof window !== "undefined" && !user) {
      alert("없으면 접근불가");
      router.push("/");
    } else {
      // [TO DO] user.id로 api 요청
    }
  },[user])

  return (
    <Wrapper className='center-content'>
      <section className='user-info-section'>
        <h2 className='ir-hidden'>유저 기본정보</h2>
        <div className='info-area'>
          <p className='img-area'>
            <img src={user_info.profile_image} alt=""/>
          </p>
          <div className='text-area'>
            <div className="greeting">
              <p><b>#{user_info.level.title}</b></p>
              <p>
                <Link href={`/profile/${user_info.id}`} className="txt-btn">
                  {user_info.nickname}
                </Link>
                님 안녕하세요!
              </p>
            </div>
            <p>이름: {user_info.username}</p>
            <p>전화번호: {user_info.phone_number}</p>
            <p>활동지역: {user_info.location_city} {user_info.location_district}</p>
            <button
              className='txt-btn top-sub-btn'
              onClick={()=>{setInfoModalOpen(true);}}
            >
              정보 수정하기
            </button>
          </div>
        </div>

        <div className="level-area">
          <LevelBar level={user_info.level} distance={user_info.distance}/>
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
          <RecordTable record={record}/>
        </section>
      }

      <section>
        <h2>내가 신청한 크루 현황</h2>
        <ul>
          {
            my_crews.map((item, index) => {
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
            my_races.map((item, index) => {
              return (
                <li key={index}>
                  <RaceCard race={item} is_personal={true}/>
                </li>
              )
            })
          }
        </ul>
      </section>

      <section>
        <h2>나의 관심 리스트</h2>
        <ul>
          {
            favorite_list.crew.map((item, index) => {
              return (
                <li key={index}>
                  <Crewcard crew={item}/>
                </li>
              )
            })
          }
          {
            favorite_list.race.map((item, index) => {
              return (
                <li key={index}>
                  <RaceCard race={item}/>
                </li>
              )
            })
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
                <input type="text" id="nickname" name="nickname" placeholder={user_info.nickname}/>
              </li>
              <li>
                <label htmlFor="phone_number">전화번호</label>
                <input type="text" id="phone_number" name="phone_number" placeholder={user_info.phone_number}/>
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
              raceList.map((item, index) => {
                return (
                  <li key={index}>
                    <p>
                      {item.name} / {item.start_date} ~ {item.end_date}
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
