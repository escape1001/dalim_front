import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Empty from "../../../components/Empty";
import { convertDayKorFull } from "../../../utils/convert";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section h2{
        font-size: var(--font-size-bigger);
        padding-bottom: 3rem;
    }

    .crew-list{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .crew-list li a{
        display: flex;
        border: 1px solid var(--color-light-grey);
        border-radius: .5rem;
        transition: var(--default-transition);
    }

    .crew-list li a:hover{
        box-shadow: var(--default-shadow);
    }

    .crew-list .img-area{
        border-radius: .5rem;
        overflow: hidden;
        width: 30%;
        aspect-ratio: 1/1;
    }

    .crew-list img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .crew-list .text-area{
        padding:3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap:1rem;
    }

    .crew-list .text-area strong{
        font-size: var(--font-size-big);
    }

    .btn-area{
        padding-top: 3rem;
        text-align: center;
    }

    .txt-s{
        padding-top: 3rem;
        text-align: center;
        color: var(--color-navy);
    }
`;

export default function CrewManageList(){
    const [crewList, setCrewList] = useState([]);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_list 받아와야 함
        // GET /crews/manage/
        // 헤더 토큰 필요
        const crew_list_mock = [
            {
            "id": 1,
            "name": "멋있는 크루",
            "member_count": 5,
            "thumbnail_image": "https://picsum.photos/200",
            "is_favorite": false,
            "location_city": "서울특별시",
            "location_district": "강남구",
            "meet_days": ["mon", "wed", "fri"],
            "meet_time": "07:00 PM",
            "is_opened" : "모집중",
            },
            {
            "id": 2,
            "name": "크루아상",
            "member_count": 8,
            "thumbnail_image": "https://picsum.photos/200",
            "is_favorite": false,
            "location_city": "부산광역시",
            "location_district": "해운대구",
            "meet_days": ["sat", "sun"],
            "meet_time": "08:00 AM",
            "is_opened" : "모집중",
            }
        ];
        setCrewList(crew_list_mock);
    },[])
    
    return(
        <Wrapper className="center-content">
            <section>
                <h2>크루 관리</h2>
                {
                    crewList.length > 0 ?
                    <ul className="crew-list">
                        {
                            crewList.map(crew => (
                                <li key={crew.id}>
                                    <Link href={`/manage/crew/${crew.id}`}>
                                        <p className="img-area">
                                            <img src={crew.thumbnail_image} alt=""/>
                                        </p>
                                        <div className="text-area">
                                            <strong>{crew.name}</strong>
                                            <p className="default-badge">{crew.location_city} &gt; {crew.location_district}</p>
                                            <p><b>정기런 :</b> {convertDayKorFull(crew.meet_days)} {crew.meet_time}</p>
                                            <p><b>멤버 수 :</b> {crew.member_count}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>:
                    <Empty text="아직 등록된 크루가 없습니다."/>
                }
                <p className="btn-area">
                    <Link className="default-btn" href="/manage/crew/form">
                        크루 추가하기
                    </Link>
                </p>
                <p className="txt-s">* 크루 삭제는 운영팀에 문의하세요.</p>
            </section>
        </Wrapper>
    );
}