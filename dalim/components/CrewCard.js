import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from "next/router";
import { Icon } from './Icons';


const Wrapper = styled.div`
    width: 100%;
    border-radius: .5rem;
    overflow: hidden;
    border: 1px solid var(--color-light-grey);
    cursor: pointer;
    transition: var(--default-transition);

    &:hover{
        box-shadow: var(--default-shadow);

        .img-area img{
            transform: scale(1.1);
        }
    }
  
    .img-area{
        aspect-ratio: 16/9;
        position: relative;
        overflow: hidden;
    }

    .img-area img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5));
        transition: var(--default-transition);
    }

    .img-area .overlay{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding:1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        color:var(--color-white);
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0));
    }

    .img-area .overlay .default-badge{
        justify-self: flex-end;
    }

    .text-area{
        padding:1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap:.5rem;
        font-size: var(--font-size-small);
    }

    .text-area strong{
        font-size: var(--font-size-big);
    }
`;

export default function CrewCard({crew, is_personal=false}) {
    const [isFavorite, setIsFavorite] = useState(crew.is_favorite);

    // ["mon", "sat"]을 "월요일, 토요일"로 변경하는 함수
    const getDayKor = (days) => {
        const dayList = {
            mon: '월요일',
            tue: '화요일',
            wed: '수요일',
            thu: '목요일',
            fri: '금요일',
            sat: '토요일',
            sun: '일요일',
        }

        return days.map(d => dayList[d]).join(', ');
    };

    const toggleFavorite = (e) => {
        console.log(e.target);
        e.stopPropagation();
        
        // [TO DO] 여기서 서버에 요청을 보내서 is_favorite를 업데이트해야 함
        setIsFavorite(!isFavorite);
    }

    const router = useRouter();

    return (
        <Wrapper onClick={()=>{router.push(`/crew/${crew.id}`)}}>
            <div className='img-area'>
                <img src={crew.thumbnail_image} alt={crew.name}/>
                <p className='overlay'>
                    {
                        is_personal ?
                        <>
                            <span></span>
                            <i className='default-badge yellow'>{crew.status}</i>
                        </>:
                        <>
                            <span>{crew.member_count}명의 러너가 달리는 중</span>
                            <button onClick={(e)=>{toggleFavorite(e);}}>
                                {
                                    isFavorite ?
                                    <Icon.Star fill="true" size="2.5rem"/>:
                                    <Icon.Star size="2.5rem"/>
                                }
                            </button>
                        </>
                    }
                </p>
            </div>
            <div className='text-area'>
                <i className='default-badge'>{crew.location_city}&gt;{crew.location_district}</i>
                <strong>{crew.name}</strong>
                <p>정기런 {getDayKor(crew.meet_days)} / {crew.meet_time}</p>
            </div>
        </Wrapper>
    )
}
