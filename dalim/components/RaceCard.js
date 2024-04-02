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
        aspect-ratio: 3/3.5;
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
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        color:var(--color-white);
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0));
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

    .record{
        display: flex;
        flex-wrap: wrap;
        gap:.5rem;
    }

    .record span{
        width: 100%;
        flex-grow: 1;
    }

    .record span i{
        font-style: normal;
        font-weight: 600;
        color: var(--color-point);
    }

    .record button{
        padding: .5rem;
        font-size: var(--font-size-small);
    }
`;

export default function RaceCard({race, is_personal=false}) {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(race.is_favorite);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        
        // [TO DO] 여기서 서버에 요청을 보내서 is_favorite를 업데이트해야 함
        setIsFavorite(!isFavorite);
    }
    
    const addRecord = (e) => {
        e.stopPropagation();
        // prompt로 수정할 값 입력받기.
        const race_record = prompt("대회 기록을 입력해주세요.");
        
        if (race_record === null) return;
        
        // [TO DO] 여기서 서버에 요청을 보내서 레코드를 추가해야 함
        alert(`add record : ${race.id} / ${race_record}`);
    };
    
    const patchRecord = (e) => {
        e.stopPropagation();

        // prompt로 수정할 값 입력받기.
        const mod_record = prompt(`기존 기록은 ${race.record} 입니다. 수정할 값을 입력해주세요.`);

        if (mod_record === null) return;
        
        // 수정 요청 [TO DO : /accounts/mypage/race/record/<int:race_id> PATCH 요청]
        alert(`patch record : ${race.id} / ${mod_record}m`);
    };
    
    const deleteRecord = (e) => {
        e.stopPropagation();
        // [TO DO] 여기서 서버에 요청을 보내서 레코드를 삭제해야 함
        alert(`delete record : ${race.id}`);
    };


    return (
        <Wrapper onClick={()=>{router.push(`/race/${race.id}`)}}>
            <div className='img-area'>
                <img src={race.thumbnail_image} alt={race.name}/>
                <p className='overlay'>
                    {
                        !is_personal &&
                        <button onClick={(e)=>{toggleFavorite(e);}}>
                            {
                                isFavorite ?
                                <Icon.Star fill="true" size="2.5rem"/>:
                                <Icon.Star size="2.5rem"/>
                            }
                        </button>
                    }
                    <i className="default-badge">{race.status}{race.d_day ? ` D-${race.d_day}`: ""}</i>
                </p>
            </div>
            <div className='text-area'>
                <strong>{race.name}</strong>
                <p>일시 : {race.start_date} ~ {race.end_date}</p>
                <div>
                    종목 :
                    <ul className="course-list">
                        {
                            race.courses.map((course, index) => (
                                <li className="default-badge yellow" key={index}>
                                    {course}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {
                    !race.d_day && (
                        race.record ?
                        <p className='record'>
                            <span>
                                내 기록 : <i>{race.record}</i>
                            </span>
                            <button
                                onClick={(e)=>{patchRecord(e);}}
                                className='default-btn line small'
                            >
                                내 기록 수정하기
                            </button>
                            <button
                                onClick={(e)=>{deleteRecord(e);}}
                                className='default-btn line small'
                            >
                                내 기록 삭제하기
                            </button>
                        </p>:
                        <p className='record'>
                            <button
                                onClick={(e)=>{addRecord(e);}}
                                className='default-btn line small'
                            >
                                내 기록 추가하기
                            </button>
                        </p>
                    )                    
                }
            </div>
        </Wrapper>
    )
}
