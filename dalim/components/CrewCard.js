import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { Icon } from './Icons';
import { convertDayKorFull, convertLocationKor, convertCrewStatus } from '../utils/convert';
import { AuthContext } from '../context/authContext';


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
    const {user, refreshToken} = useContext(AuthContext);

    const toggleFavorite = async (e) => {
        e.stopPropagation();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew.id}/favorite/`;
        let headers = {};

        if (!user){
            alert("로그인 후 이용해주세요.");
            return;
        } else {
            headers['Authorization'] = `Bearer ${localStorage.getItem('dalim_access')}`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            data: {
                user_id: user.pk,
            }
        });

        if (response.status === 401){
            console.log("토큰 재요청");
            await refreshToken();
            await toggleFavorite();
        } else if (response.status === 200){
            setIsFavorite(!isFavorite);
        }
    };

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
                            <i className='default-badge yellow'>{convertCrewStatus(crew.status)}</i>
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
                <i className='default-badge'>{convertLocationKor(crew.location_city)}&gt;{crew.location_district}</i>
                <strong>{crew.name}</strong>
                <p>정기런 {convertDayKorFull(crew.meet_days)} / {crew.meet_time}</p>
            </div>
        </Wrapper>
    )
}
