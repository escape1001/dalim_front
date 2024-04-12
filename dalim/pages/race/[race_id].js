import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImgTitleSection from "../../components/ImgTitleSection";
import { AuthContext } from "../../context/authContext";
import Link from "next/link";


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

    .race-info-area{
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-start;
        position: relative;
        /* flex-wrap: wrap; */
    }

    .race-info-area aside{
        position: sticky;
        top: 0;
        right: 0;
        padding:2rem;
        font-size: var(--font-size-big);
        border: 1px solid var(--color-grey);
        border-radius: .5rem;
    }

    .race-info-area aside .top-area,
    .race-info-area aside .bottom-area{
        display: flex;
        flex-direction: column;
        gap:2rem;
    }

    .race-info-area aside .top-area{
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--color-grey);
    }

    .race-info-area aside .bottom-area{
        padding-top: 2rem;
    }

    .race-info-area aside p,
    .race-info-area aside div{
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        gap:5rem;
    }

    .race-info-area aside span{
        flex-grow: 1;
        text-align: right;
    }

    .race-info-area aside .course-list ul{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .race-info-area aside .week-list li.on{
        background-color: var(--color-point-yellow);
    }

    .race-info-area aside a{
        max-width: unset;
    }

    .race-info-area .race-description{
        padding-right: 1rem;
    }

    .race-info-area .race-description .txt-b{
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
        
        .race-info-area{
            flex-direction: column;
        }

        .race-info-area aside{
            width: 100%;
            order: -1;
            position: unset;
        }

        .race-info-area h2{
            padding-top: 5rem;
        }

        .race-info-area .race-description{
            padding-top: 8rem;
            padding-right: 0;
        }
    }
`;

export default function RaceDetail(){
    const {user} = useContext(AuthContext);
    const { race_id } = useRouter().query;
    const [race, setRace] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(race?.is_favorite);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 race_id에 해당하는 대회 정보를 가져와야 함
        // GET /races/<int:race_id>/
        // 헤더 토큰 필요
        const race_mock = {
            "id": 1,
            "title": "양천구마라톤",
            "organizer":"양천구청",
            "reg_status": "접수중",
            "d_day":12,
            "location": "서울 양천운동장",
            "fees":10000,
            "start_date": "2024/05/30",
            "end_date": "2024/05/31",
            "reg_start_date": "2024/04/15",
            "reg_end_date": "2024/05/27",
            "courses": ["Full", "Half", "10km"],
            "description": "양천구청 주관 하프 마라톤 대회",
            "thumbnail_image": "이미지 path",
            "register_url": "대회 홈페이지 등록 링크",
            "is_favorite": false,
        };
        const review_mock = [
            {
                "id": 1,
                "author_id": 1,
                "author_nickname": "닉네임",
                "contents": "좋은 대회입니다!",
                "created_at": "2023-06-01T10:00:00Z",
                "updated_at": "2023-06-01T10:00:00Z"
            },
            {
                "id": 2,
                "author_id": 2,
                "author_nickname": "닉네임",
                "contents": "좋은 대회아상입니다!",
                "created_at": "2024-06-01T10:00:00Z",
                "updated_at": "2024-06-01T10:00:00Z"
            }
        ];
        // 대회 정보를 받아온 후에 race state에 저장
        setRace(race_mock);
        setReviews(review_mock);
        // 해당하는 대회 정보 없는 경우 404 페이지로 이동
    },[race_id])


    // API관련 함수
    const patchReview = (review_id) => {
        // 수정할 내용을 prompt로 입력받기
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            // [TO DO] PATCH /races/<int:race_id>/reviews/<int:review_id>/
            // 헤더 토큰 필요
            // 응답 제대로 오면 setReviews
        }
    };

    const deleteReview = (review_id) => {
        // confirm으로 삭제 여부 확인
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            // [TO DO] DELETE /races/<int:race_id>/reviews/<int:review_id>/
            // 200? 204? 정상 응답 오면 setReviews
        }
    };

    const addReview = (e) => {
        e.preventDefault();

        const contents = e.target.querySelector("textarea").value;
        if (contents){
            // [TO DO] POST /races/<int:race_id>/reviews/
            // 헤더 토큰 필요
            // 응답 제대로 오면 setReviews
        } else {
            alert("내용을 입력해주세요.");
        }
    };

    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                name={race?.title}
                badgeTxt={`${race?.d_day ? `D-${race?.d_day}` : ""} ${race?.reg_status}`}
                imgUrl={race?.thumbnail_image}
                favApiPath={`/races/${race_id}/favorite/`}
            />

            <section className="race-info-area center-content">
                <h2 className="ir-hidden">대회 소개</h2>
                <aside>
                    <div className="top-area">
                        <p>
                            <b>대회 기간</b>
                            <span>{race?.start_date} ~ {race?.end_date}</span>
                        </p>
                        <p>
                            <b>접수 기간</b>
                            <span>{race?.reg_start_date} ~ {race?.reg_end_date}</span>
                        </p>
                        <p>
                            <b>대회 장소</b>
                            <span>{race?.location}</span>
                        </p>
                        <p>
                            <b>주관사</b>
                            <span>{race?.organizer}</span>
                        </p>
                        <div className="course-list">
                            <b>종목</b>
                            <ul>
                                {
                                    race?.courses.map((course, index) => (
                                        <li className="default-badge yellow" key={index}>{course}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="bottom-area">
                        <p>
                            <b>참가 비용</b>
                            <span>{race?.fees}원</span>
                        </p>
                        <p>
                            <Link
                                href={race?.register_url || ""}
                                className="default-btn"
                                target="_blank"
                            >
                                대회 가입하기
                            </Link>
                        </p>
                    </div>
                </aside>
                <div className="race-description">
                    <p className="txt-b">대회 소개</p>
                    <pre>
                        {race?.description}
                    </pre>
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