import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImgTitleSection from "../../components/ImgTitleSection";
import { AuthContext } from "../../context/authContext";


const Wrapper = styled.main`
    section {
        padding-bottom: 8rem;
        position: relative;
    }

    section:first-child{
        padding-bottom: 3rem;
    }

    section h2{
        font-size: var(--font-size-big);
        padding-bottom: 2rem;
    }

    .crew-info-area{
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-start;
        position: relative;
        flex-wrap: wrap;
    }

    .crew-info-area h2{
        width: 100%;
    }

    .crew-info-area aside{
        position: sticky;
        top: 0;
        right: 0;
        padding:2rem;
        font-size: var(--font-size-big);
        border: 1px solid var(--color-grey);
        border-radius: .5rem;
    }

    .crew-info-area aside .top-area,
    .crew-info-area aside .bottom-area{
        display: flex;
        flex-direction: column;
        gap:2rem;
    }

    .crew-info-area aside .top-area{
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--color-grey);
    }

    .crew-info-area aside .bottom-area{
        padding-top: 2rem;
    }

    .crew-info-area aside p{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:5rem;
    }

    .crew-info-area aside .week-list{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .crew-info-area aside .week-list li{
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

    .crew-info-area aside .week-list li.on{
        background-color: var(--color-point-yellow);
    }

    .crew-info-area aside button{
        max-width: unset;
    }

    .crew-info-area .crew-description{
        flex-grow: 1;
        padding-right: 1rem;
    }

    .crew-info-area .crew-description .txt-b{
        padding-bottom: 2rem;
        font-weight: 800;
        font-size: var(--font-size-big);
    }

    .review-area ul li{
        padding: 2rem 0;
        border-bottom: 1px solid var(--color-grey);
    }

    .review-area ul li:last-child{
        border-bottom: none;
    }

    .review-area ul li div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
    }

    .review-area ul li div p{
        display: flex;
        gap:1rem;
    }

    .review-area form{
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items:flex-end;
        gap:2rem;
    }

    .review-area textarea{
        width: 100%;
        height: 10rem;
        border-color: var(--color-grey);
    }

    @media all and (max-width:1023px) {
        section:first-child{
            padding-bottom: 0;
        }
        
        .crew-info-area{
            flex-direction: column;
        }

        .crew-info-area aside{
            width: 100%;
            order: -1;
            position: unset;
        }

        .crew-info-area h2{
            padding-top: 5rem;
        }

        .crew-info-area .crew-description{
            padding-top: 8rem;
            padding-right: 0;
        }
    }
`;

export default function CrewDetail(){
    const {user} = useContext(AuthContext);
    const { crew_id } = useRouter().query;
    const [crew, setCrew] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(crew?.is_favorite);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_id에 해당하는 크루 정보를 가져와야 함
        // GET /crews/<int:crew_id>/
        // 헤더 토큰 필요
        const crew_mock = {
            "id": 1,
            "name": "멋있는 크루",
            "location_city": "서울특별시",
            "location_district": "강남구",
            "meet_days": ["mon", "wed", "fri"],
            "meet_time": "07:00 PM",
            "member_count": 5,
            "description": "함께 달리는 런닝 크루입니다.",
            "thumbnail_image": "https://picsum.photos/200",
            "sns_link": "https://example.com/running_crew",
            "is_favorite": false,
            "status" : "모집중",
        };
        const review_mock = [
            {
                "id": 1,
                "author_id": 1,
                "author_nickname": "닉네임",
                "contents": "좋은 크루입니다!",
                "created_at": "2023-06-01T10:00:00Z",
                "updated_at": "2023-06-01T10:00:00Z"
            },
            {
                "id": 2,
                "author_id": 1,
                "author_nickname": "닉네임",
                "contents": "좋은 크루아상입니다!",
                "created_at": "2024-06-01T10:00:00Z",
                "updated_at": "2024-06-01T10:00:00Z"
            }
        ];
        // 크루 정보를 받아온 후에 crew state에 저장
        setCrew(crew_mock);
        setReviews(review_mock);
        // 해당하는 크루 정보 없는 경우 404 페이지로 이동
    },[crew_id])

    const parseWeekList = (days) => {
        const dayList = {
            mon: '월',
            tue: '화',
            wed: '수',
            thu: '목',
            fri: '금',
            sat: '토',
            sun: '일',
        }

        return Object.entries(dayList).map(([key, value], index) => {
            return <li key={index} className={days?.includes(key) ? "on" : ""}>{value}</li>
        })
    };

    // API관련 함수
    const joinCrew = () => {
        // [TO DO] POST /crews/<int:crew_id>/join/
        // 헤더 토큰 필요
        // 응답 메세지에 따라 alert 해주기
        alert("크루 가입이 신청되었습니다.");
    };

    const patchReview = (review_id) => {
        // 수정할 내용을 prompt로 입력받기
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            // [TO DO] PATCH /crews/<int:crew_id>/reviews/<int:review_id>/
            // 헤더 토큰 필요
            // 응답 제대로 오면 setReviews
        }
    };

    const deleteReview = (review_id) => {
        // confirm으로 삭제 여부 확인
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            // [TO DO] DELETE /crews/<int:crew_id>/reviews/<int:review_id>/
            // 200? 204? 정상 응답 오면 setReviews
        }
    };

    const addReview = (e) => {
        e.preventDefault();

        const contents = e.target.querySelector("textarea").value;
        if (contents){
            // [TO DO] POST /crews/<int:crew_id>/reviews/
            // 헤더 토큰 필요
            // 응답 제대로 오면 reload해버려~
        } else {
            alert("내용을 입력해주세요.");
        }
    };

    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                name={crew?.name}
                badgeTxt={`${crew?.location_city} > ${crew?.location_district}`}
                imgUrl={crew?.thumbnail_image}
                favApiPath={`/crews/${crew_id}/favorite/`}
            />

            <section className="crew-info-area center-content">
                <h2 className="ir-hidden">크루 소개</h2>
                <aside>
                    <div className="top-area">
                        <p>
                            <b>정기런 일정</b>
                            <span>{crew?.meet_time}</span>
                        </p>
                        <ul className="week-list">
                            {
                                parseWeekList(crew?.meet_days)
                            }
                        </ul>
                    </div>
                    <div className="bottom-area">
                        <p>
                            <b>현재 크루 멤버</b>
                            <span>{crew?.member_count}명</span>
                        </p>
                        <p>
                            <button onClick={joinCrew} className="default-btn">크루 가입하기</button>
                        </p>
                    </div>
                </aside>
                <div className="crew-description">
                    <p className="txt-b">크루 소개</p>
                    <pre>
                        {crew?.description}
                    </pre>

                    <p>
                        크루 SNS:
                        <Link
                            className="txt-btn"
                            href={crew?.sns_link || ""}
                            target="_blank"
                        >
                            {crew?.sns_link}
                        </Link>
                    </p>
                </div>
            </section>

            <section className="review-area center-content">
                <h2>후기</h2>
                <ul>
                    {
                        reviews?.map((review, index) => {
                            return (
                                <li key={index}>
                                    <div className="user-area">
                                        <b>{review.author_nickname}님의 후기</b>
                                        {
                                            review.author_id === user?.pk &&
                                            <p>
                                                <button
                                                    onClick={()=>{patchReview(review.id);}}
                                                    className="txt-btn"
                                                >
                                                    수정하기
                                                </button>
                                                <button
                                                    onClick={()=>{deleteReview(review.id);}}
                                                    className="txt-btn"
                                                >
                                                    삭제하기
                                                </button>
                                            </p>
                                        }
                                    </div>
                                    <p>{review.contents}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    user &&
                    <form className="default-form" onSubmit={addReview}>
                        <textarea placeholder="후기를 작성해주세요" maxLength={300}></textarea>
                        <button className="default-btn small">질문 등록</button>
                    </form>
                }
            </section>
        </Wrapper>

    );
}