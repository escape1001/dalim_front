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

export default function RaceCard({race, is_personal=false, getMyRaces=null}) {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(race.is_favorite);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        
        // [TO DO] 여기서 서버에 요청을 보내서 is_favorite를 업데이트해야 함
        setIsFavorite(!isFavorite);
    }
    
    const patchRecord = async (e, is_add) => {
        e.stopPropagation();

        let prompt_message =  is_add ? "대회 기록을 입력해주세요." : `기존 기록은 ${race.record} 입니다. 수정할 값을 입력해주세요.`;
        const race_record = prompt(prompt_message);
        
        if (race_record){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/race/${race?.joined_race_id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
                "Content-Type": "application/json",
            };
            const data = {
                "race_record" : race_record
            };

            const response = await fetch(url, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.status === 200){
                getMyRaces();
            } else{
                alert("기록 추가에 실패했습니다.");
                console.log(response);
            }
        }        
    };
    
    
    const deleteRecord = async (e) => {
        e.stopPropagation();
        
        const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/race/${race?.joined_race_id}/`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
        };
        const response = await fetch(url, {
            method: "DELETE",
            headers: headers,
        });

        if (response.status === 204){
            getMyRaces();
        }
    };


    return (
        <Wrapper onClick={()=>{router.push(`/race/${race.id}`)}}>
            <div className='img-area'>
                <img src={race.thumbnail_image} alt={race.title}/>
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
                    <i className="default-badge">
                        {race.reg_status}{race.d_day>0 ? ` D${race.d_day * -1}`: ""}
                    </i>
                </p>
            </div>
            <div className='text-area'>
                <strong>{race.title}</strong>
                <p>
                    <b>일시</b> {race.start_date} ~ {race.end_date}
                </p>
                <p>
                    <b>접수</b> {race.reg_start_date} ~ {race.reg_end_date}
                </p>
                <p>
                    <b>장소</b> {race.location}
                </p>
                <div>
                    <b>종목</b>&nbsp;
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
                    (is_personal && race.d_day < 0) && (
                        race.record ?
                        <p className='record'>
                            <span>
                                내 기록 : <i>{race.record}</i>
                            </span>
                            <button
                                onClick={(e)=>{patchRecord(e, false);}}
                                className='txt-btn'
                            >
                                내 기록 수정하기
                            </button>
                            <button
                                onClick={(e)=>{deleteRecord(e);}}
                                className='txt-btn'
                            >
                                내 기록 삭제하기
                            </button>
                        </p>:
                        <p className='record'>
                            <button
                                onClick={(e)=>{patchRecord(e, true);}}
                                className='txt-btn'
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
