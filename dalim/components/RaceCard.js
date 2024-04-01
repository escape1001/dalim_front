import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";


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

    .img-area .overlay button{
        border: 1px solid red;
        background-color: aliceblue;
    }

    .img-area .overlay button.favorite{
        background-color: red;
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

export default function RaceCard() {
    const race = {
        id:2,
        status:"접수중",
        d_day: 3,
        name : "양천마라톤",
        start_date: "2024/05/30",
        end_date: "2024/05/31",
        courses: ["full", "half", "5km"],
        thumbnail_image: "https://picsum.photos/200",
        is_favorite: true
    }

    const [isFavorite, setIsFavorite] = useState(race.is_favorite);

    const toggleFavorite = (e) => {
        console.log(e.target);
        e.stopPropagation();
        
        // [TO DO] 여기서 서버에 요청을 보내서 is_favorite를 업데이트해야 함
        setIsFavorite(!isFavorite);
    }

    const router = useRouter();

    return (
        <Wrapper onClick={()=>{router.push(`/race/${race.id}`)}}>
            <div className='img-area'>
                <img src={race.thumbnail_image} alt={race.name}/>
                <p className='overlay'>
                    <button className={isFavorite ? "favorite" : ""} onClick={(e)=>{toggleFavorite(e);}}>관심</button>
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
            </div>
        </Wrapper>
    )
}
