import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Empty from "../../../components/Empty";
import { convertDayKorFull, convertLocationKor } from "../../../utils/convert";
import { AuthContext } from "../../../context/authContext";


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
    const {user, refreshToken} = useContext(AuthContext);
    const [crewList, setCrewList] = useState([]);

    const getCrewList = async (q) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage/`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('dalim_access')}`
        };

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (user && response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getCrewList();
        }
        
        const data = await response.json();
        setCrewList(data);
    };

    useEffect(() => {
        if (user.user_type !== "crew"){
            alert("크루 관리 페이지는 크루만 접근 가능합니다.");
        } else{
            getCrewList();
        }
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
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_PORXY_URL}${crew.thumbnail_image}`}
                                                alt=""
                                            />
                                        </p>
                                        <div className="text-area">
                                            <p>
                                                <strong>{crew.name}</strong> - {crew.is_opened}
                                            </p>
                                            <p className="default-badge">{convertLocationKor(crew.location_city)} &gt; {crew.location_district}</p>
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