import styled from 'styled-components';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CrewCard from '../components/CrewCard';
import Link from 'next/link';
import RaceCard from '../components/RaceCard';
import ArticleCard from '../components/ArticleCard';


const Wrapper = styled.main`
  section{
    padding-bottom: 8rem;
    position: relative;
  }

  section h2{
    font-size: var(--font-size-bigger);
    padding-bottom: 3rem;
  }

  section .more{
    position: absolute;
    right: 0;
    top: 1rem;
    font-weight: 600;
  }

  .promotion-area .promotion-banner{
    width: 100%;
    height: 40rem;
    background-color: #ccc;
  }

  .article-area ul{
    display: flex;
    flex-direction: column;
    gap:1rem;
  }

  // swiper 커스텀
  .swiper-scrollbar{
    display: none;
  }

  .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
    display: none;
  }
  
  .swiper-button-prev, .swiper-button-next{
    color:var(--color-point);
    transform: translateY(-100%);
    display: none;
  }  

  section:not(.promotion-area) .swiper{
    padding-bottom: 5rem;
  }

  .swiper-pagination-bullet{
    opacity: 1;
  }

  .promotion-area .swiper-button-prev, .promotion-area .swiper-button-next{
    display: block;
  }  
`;

export default function Home() {
  const crew_list = [
    {
      "id": 1,
      "name": "러닝 크루 A",
      "is_favorite": false,
      "meet_days": ["sat"],
      "meet_time": "07:00",
      "thumbnail_image": "https://picsum.photos/200",
      "member_count": 20,
      "location_city": "서울",
      "location_district": "잠실"
    },
    {
      "id": 1,
      "name": "러닝 크루 A",
      "is_favorite": false,
      "meet_days": ["sat"],
      "meet_time": "07:00",
      "thumbnail_image": "https://picsum.photos/200",
      "member_count": 20,
      "location_city": "서울",
      "location_district": "잠실"
    },
    {
      "id": 1,
      "name": "러닝 크루 A",
      "is_favorite": false,
      "meet_days": ["sat"],
      "meet_time": "07:00",
      "thumbnail_image": "https://picsum.photos/200",
      "member_count": 20,
      "location_city": "서울",
      "location_district": "잠실"
    },
    {
      "id": 1,
      "name": "러닝 크루 A",
      "is_favorite": false,
      "meet_days": ["sat"],
      "meet_time": "07:00",
      "thumbnail_image": "https://picsum.photos/200",
      "member_count": 20,
      "location_city": "서울",
      "location_district": "잠실"
    },
  ];

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
        "thumbnail_image": "이미지 path",
        "is_favorite": false,
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
        "thumbnail_image": "이미지 path",
        "is_favorite": false,
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
        "thumbnail_image": "이미지 path",
        "is_favorite": false,
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
        "thumbnail_image": "이미지 path",
        "is_favorite": false,
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
        "thumbnail_image": "이미지 path",
        "is_favorite": false,
      },
    ];

  return (
    <Wrapper>
      <section className='promotion-area'>
        <h2 className='ir-hidden'>프로모션 캐러셀</h2>
        <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{clickable:true}}
            scrollbar={{draggable:true}}
            navigation
            autoplay={{delay:1000}}
            >
          <SwiperSlide>
            <p className='promotion-banner'>img1</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className='promotion-banner'>img2</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className='promotion-banner'>img3</p>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className='crews-area center-content'>
        <h2>모집중인 러닝크루🔥</h2>
        <Link className='more txt-btn' href='/crew'>전체보기</Link>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1.5}
          pagination={{clickable:true}}
          scrollbar={{draggable:true}}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
        >
          {
            crew_list.map((item, index) => (
              <SwiperSlide key={index}>
                <CrewCard crew={item}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>

      <section className='crews-area center-content'>
        <h2>접수중인 대회 🏃</h2>
        <Link className='more txt-btn' href='/race'>전체보기</Link>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1.5}
          pagination={{clickable:true}}
          scrollbar={{draggable:true}}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
        >
          {
            race_list.map((item, index) => (
              <SwiperSlide key={index}>
                <RaceCard race={item}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>

      <section className='article-area center-content'>
        <h2>달림 아티클 👀</h2>
        <Link className='more txt-btn' href='/board'>전체보기</Link>
        <ul>
          {
            Array(3).fill(0).map((item, index) => (
              <li key={index}>
                <ArticleCard/>
              </li>
            ))
          }
        </ul>
      </section>
    </Wrapper>
  )
}
