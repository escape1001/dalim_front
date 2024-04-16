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
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';


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

  .promotion-area .promotion-banner img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  const {user, refreshToken}  = useContext(AuthContext);
  const [bannerList, setBannerList] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [articleList, setArticleList] = useState([]);

  const getBannerList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/promotions/`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      setBannerList(data);
    } else {
      console.log('배너 목록을 가져오는데 실패했습니다.');
    }
  };

  const getCrewList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/top6/`;
    let headers = {};

    if (user) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('dalim_access')}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getCrewList();
    } else if (response.status === 200) {
      setCrewList(data);
    } else {
      console.log('크루 목록을 가져오는데 실패했습니다.');
    }
  };

  const getRaceList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/races/top6/`;
    let headers = {};

    if (user) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('dalim_access')}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    if (user && response.status === 401) {
      console.log("토큰 재요청");
      await refreshToken();
      await getRaceList();
    } else if (response.status === 200) {
      setRaceList(data);
    } else {
      console.log('대회 목록을 가져오는데 실패했습니다.');
    }
  };

  const getArticleList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/promotions/post/`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      setArticleList(data);
      console.log(data);
    } else {
      console.log('아티클 목록을 가져오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    getBannerList();
    getCrewList();
    getRaceList();
    getArticleList();
  },[]);

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

          {
            bannerList.map((item, index) => (
              <SwiperSlide className='promotion-banner' key={index}>
                <Link href={item.link_path}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_PORXY_URL}${item.banner_image}`}
                    alt={item.title}
                  />
                </Link>
              </SwiperSlide>
            ))
          }
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
            crewList?.map((item, index) => (
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
            raceList?.map((item, index) => (
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
            articleList?.map((item, index) => (
              <li key={index}>
                <ArticleCard article ={item}/>
              </li>
            ))
          }
        </ul>
      </section>
    </Wrapper>
  )
}
