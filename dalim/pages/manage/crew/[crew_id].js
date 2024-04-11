import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImgTitleSection from "../../../components/ImgTitleSection";
import { convertDate, convertLocationKor } from "../../../utils/convert";
import Link from "next/link";
import WeekList from "../../../components/WeekList";
import { AuthContext } from "../../../context/authContext";


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
    const {user, refreshToken} = useContext(AuthContext);
    const [crew, setCrew] = useState();
    const [memberList, setMemberList] = useState([]);

    const getCrewInfo = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage//${crew_id}/`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("dalim_access")}`
        };

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        
        if (response.status === 404){
            alert("해당하는 크루 정보가 없습니다.");
            router.push("/404");
        } else if (user && response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getCrewInfo();
        }

        const data = await response.json();
        setCrew(data);
    };

    const getMemberList = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage/${crew_id}/members//`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("dalim_access")}`
        };

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (response.status === 401){
            console.log("토큰 재요청");
            await refreshToken();
            await getMemberList();
        } else if (response.status === 200){
            const data = await response.json();
            setMemberList(data);
        } else {
            alert("멤버 정보를 가져오는데 실패했습니다.");
        }

    };

    useEffect(() => {
        if (crew_id){
            getCrewInfo();
            getMemberList();
        }
    },[crew_id])

    const toggleCrewOpen = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage//${crew_id}/`;
        const data = {
            is_opened: crew.is_opened === "모집중" ? false : true
        }
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
            "Content-Type": "application/json"
        }
        const response = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.status === 401){
            console.log("토큰 재요청");
            await refreshToken();
            await toggleCrewOpen();
        } else if (response.status === 200){
            alert("크루 상태가 변경되었습니다.");
            getCrewInfo();
        } else {
            alert("크루 상태 변경에 실패했습니다.");
        }
    }

    const changeSubmit = async (e, member_id) => {
        e.preventDefault();

        const data = {
            id: member_id,
            status: e.target.value
        };
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage/${crew_id}/members//${member_id}/`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("dalim_access")}`
        };
        const response = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.status === 401){
            console.log("토큰 재요청");
            await refreshToken();
            await changeSubmit(e, member_id);
        } else if (response.status === 200){
            alert("멤버 상태가 변경되었습니다.");
            getMemberList();
        } else {
            alert("멤버 상태 변경에 실패했습니다.");
        }
    };
    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={null}
                name={crew?.name}
                badgeTxt={`${convertLocationKor(crew?.location_city)} > ${crew?.location_district}`}
                imgUrl={crew?.thumbnail_image}
            />

            <section className="crew-info-area center-content">
                <div className="top-area">
                    <p className={`default-badge ${crew?.is_opened === "모집마감" ? "grey" : ""}`}>
                        {crew?.is_opened}
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
                                crew?.is_opened === "모집중" ?
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
                                                    <option selected={member.status === "keeping" } value="keeping">심사중</option>
                                                    <option selected={member.status === "member" } value="member">승인</option>
                                                    <option selected={member.status === "not_member" } value="not_member">미승인</option>
                                                    <option selected={member.status === "quit" } value="quit">탈퇴</option>
                                                </select>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        {
                            memberList.length === 0 &&
                            <tr>
                                <td colSpan="4">아직 가입한 멤버가 없습니다.</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </section>
        </Wrapper>
    );
}