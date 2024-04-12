import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImgTitleSection from "../../components/ImgTitleSection";
import { AuthContext } from "../../context/authContext";
import WeekList from "../../components/WeekList";
import { convertLocationKor } from "../../utils/convert";


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
        /* flex-wrap: wrap; */
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
    const {user, refreshToken} = useContext(AuthContext);
    const router = useRouter();
    const { crew_id } = router.query;
    const [crew, setCrew] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState();

    const getCrewInfo = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}`;
        let headers = {};

        if (user) {
            headers["Authorization"] = `Bearer ${localStorage.getItem("dalim_access")}`;
        }

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
        setIsFavorite(data.is_favorite);
    };

    const getReviews = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/reviews/`);
        const data = await response.json();
        setReviews(data);
    };

    useEffect(() => {
        if (crew_id){
            getCrewInfo();
            getReviews();
        }
    },[crew_id])

    // API관련 함수
    const toggleFavorite = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/favorite/`;
        let headers = {};

        if (!user){
            alert("로그인 후 이용해주세요.");
            return;
        } else {
            headers["Authorization"] = `Bearer ${localStorage.getItem("dalim_access")}`;
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

    const joinCrew = async () => {
        if (!user){
            alert("로그인 후 이용해주세요.");
            router.push("/accounts/login");
        }
        
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/join/`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,                
        };
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
        });

        if (response.status === 401){
            console.log("토큰 재요청");
            refreshToken();
            joinCrew();
        }

        const data = await response.json();
        alert(data.message || data.error);
    };

    const patchReview = async(review_id) => {
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/reviews/${review_id}/`;
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,                
            };
            const data = {
                contents: mod_contents,
            };
            const response = await fetch(url, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.status === 401){
                console.log("토큰 재요청");
                refreshToken();
                patchReview(review_id);
            } else if (response.status === 200){
                getReviews();
            } else {
                alert("수정에 실패했습니다.");
                console.log(response);
            }

        }
    };

    const deleteReview = async (review_id) => {
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/reviews/${review_id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
            };
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });

            if (response.status === 401){
                console.log("토큰 재요청");
                refreshToken();
                deleteReview(review_id);
            } else if (response.status === 204){
                getReviews();
            } else {
                alert("삭제에 실패했습니다.");
                console.log(response);
            }
        }
    };

    const addReview = async (e) => {
        e.preventDefault();

        const contents = e.target.querySelector("textarea").value;
        if (contents){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}/reviews/`;
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,                
            };
            const data = {
                contents: contents,
            };
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.status === 401){
                console.log("토큰 재요청");
                refreshToken();
                addReview(e);
            } else if (response.status === 403){
                alert("크루 가입 완료 후 후기를 남길 수 있습니다.");
            } else if (response.status === 201){
                e.target.querySelector("textarea").value = "";
                getReviews();
            }

        } else {
            alert("내용을 입력해주세요.");
        }
    };

    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                name={crew?.name}
                badgeTxt={`${convertLocationKor(crew?.location_city)} > ${crew?.location_district}`}
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
                            <WeekList days={crew?.meet_days} />
                        </ul>
                    </div>
                    <div className="bottom-area">
                        <p>
                            <b>현재 크루 멤버</b>
                            <span>{crew?.member_count}명</span>
                        </p>
                        <p>
                            {
                                crew?.is_opened == "모집중" ?
                                <button onClick={joinCrew} className="default-btn">크루 가입하기</button> :
                                <button disabled className="default-btn grey">모집 마감</button>
                            }
                        </p>
                    </div>
                </aside>
                <div className="crew-description">
                    <p className="txt-b">크루 소개</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: crew?.description || ""
                        }}
                    />

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
                                            (user && review.author_id == user?.pk) &&
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
                        <button className="default-btn small">후기 등록</button>
                    </form>
                }
            </section>
        </Wrapper>

    );
}