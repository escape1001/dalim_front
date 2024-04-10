import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImgTitleSection from "../../../components/ImgTitleSection";
import { convertDate } from "../../../utils/convert";
import Link from "next/link";
import WeekList from "../../../components/WeekList";


const Wrapper = styled.main`
    padding-bottom: 10rem;

    section h2{
        font-size: var(--font-size-big);
        padding-bottom: 2rem;
    }

    .crew-info-area{
        padding:2rem;
        font-size: var(--font-size-big);
        border: 1px solid var(--color-grey);
        border-radius: .5rem;
    }

    .crew-info-area .top-area,
    .crew-info-area .bottom-area{
        display: flex;
        flex-direction: column;
        gap:2rem;
    }

    .crew-info-area .top-area{
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--color-grey);
    }

    .crew-info-area .bottom-area{
        padding-top: 2rem;
    }

    .crew-info-area p{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:5rem;
    }

    .crew-info-area .default-badge{
        font-size: var(--font-size-bigger);
        align-self: center;
        padding: 1rem 2rem;
    }

    .crew-info-area .week-list{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .crew-info-area .week-list li{
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
        background-color: var(--color-light-grey);
        border-radius: 50%;
    }

    .crew-info-area .week-list li.on{
        background-color: var(--color-point-yellow);
    }

    .crew-info-area .btn-area{
        gap: 1rem;
    }

    .members-area{
        padding-top: 8rem;
    }
`;

export default function CrewManageDetail(){
    const { crew_id } = useRouter().query;
    const [crew, setCrew] = useState();
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_id에 해당하는 게시글 정보를 가져와야 함
        // GET /crews/manage/<int:crew_id>/
        // 헤더 토큰 필요
        // 만약 crew_id가 없다면 404 페이지로 이동
        const crew_mock = {
            "id": 1,
            "name": "멋있는 크루",
            "location_city": "서울특별시",
            "location_district": "강남구",
            "meet_days": ["tue", "thu", "sat"],
            "meet_time": "07:00 PM",
            "member_count": 5,
            "description": "강남에서 매주 화, 목, 토요일 저녁 7시에 함께 달려요!",
            "thumbnail_image": "https://picsum.photos/200",
            "sns_link": "https://example.com/sns",
            "is_opened" : true,
        };
        const member_list_mock = [
            {
            "id": 1,
            "username": "김철수",
            "email": "chulsu@example.com",
            "updated_at": "2023-01-01T00:00:00Z",
            "status": "심사중"
            },
            {
            "id": 2,
            "username": "이영희",
            "email": "younghee@example.com",
            "updated_at": "2023-01-01T00:00:00Z",
            "status": "승인"
            },
            {
            "id": 3,
            "username": "박민수",
            "email": "minsu@example.com",
            "updated_at": "2023-01-01T00:00:00Z",
            "status": "미승인"
            },
            {
            "id": 3,
            "username": "박민수",
            "email": "minsu@example.com",
            "updated_at": "2023-01-01T00:00:00Z",
            "status": "탈퇴"
            },
        ];
        setCrew(crew_mock);
        setMemberList(member_list_mock);
    },[crew_id])

    const toggleCrewOpen = () => {
        // [TO DO] 서버에 요청을 보내서 crew_id에 해당하는 크루의 is_opened를 업데이트해야 함
        // PATCH /crews/manage/<int:crew_id>/
        // 헤더 토큰 필요
        const data = {
            is_opened: !crew?.is_opened
        }
        alert(JSON.stringify(data));
    }

    const changeSubmit = (e, member_id) => {
        e.preventDefault();

        const data = {
            id: member_id,
            status: e.target.value
        };
        alert(JSON.stringify(data));
        // [TO DO] 서버에 요청을 보내서 member_id에 해당하는 멤버의 상태를 업데이트해야 함
        // PATCH ?? /crews/manage/<int:crew_id>/members/
        // setMemberList();
    };
    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={null}
                name={crew?.name}
                badgeTxt={`${crew?.location_city} > ${crew?.location_district}`}
                imgUrl={crew?.thumbnail_image}
            />

            <section className="crew-info-area center-content">
                <div className="top-area">
                    <p className={`default-badge ${crew?.is_opened ? "" : "grey"}`}>
                        {crew?.is_opened ? "모집중" : "모집마감"}
                    </p>
                    <p>
                        <b>정기런 일정</b>
                        <span>{crew?.meet_time}</span>
                    </p>
                    <ul className="week-list">
                        <WeekList days={crew?.meet_days} />
                    </ul>
                </div>
                <div className="bottom-area">
                    <p>
                        <b>현재 크루 멤버</b>
                        <span>{crew?.member_count}명</span>
                    </p>
                    <p className="btn-area">
                        <Link
                            href={`/manage/crew/form?crew_id=${crew_id}`}
                            className="default-btn line"
                        >
                            크루 정보 수정하기
                        </Link>
                        <button onClick={toggleCrewOpen} className="default-btn">
                            {
                                crew?.is_opened ?
                                "모집 마감하기":
                                "모집 시작하기"
                            }
                        </button>
                    </p>
                </div>
            </section>
            
            <section className="members-area center-content">
                <h2>크루 멤버 관리</h2>
                <table className="default-table">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>최근 활동일</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            memberList?.map((member, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{member.username}</td>
                                        <td>{member.email}</td>
                                        <td>{convertDate(member.updated_at)}</td>
                                        <td>
                                            <form onChange={(e)=>{changeSubmit(e, member.id);}}>
                                                <select name="status">
                                                    <option selected={member.status === "심사중" } value="심사중">심사중</option>
                                                    <option selected={member.status === "승인" } value="승인">승인</option>
                                                    <option selected={member.status === "미승인" } value="미승인">미승인</option>
                                                </select>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </section>
        </Wrapper>
    );
}