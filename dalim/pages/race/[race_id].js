import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import styled from "styled-components";
import ImgTitleSection from "../../components/ImgTitleSection";
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
    }

    .race-info-area aside{
        flex-shrink: 0;
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
        flex-grow: 1;
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
    const {user, refreshToken} = useContext(AuthContext);
    const { race_id } = useRouter().query;
    const [race, setRace] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(race?.is_favorite);

    const getRaceInfo = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}`;
        let headers = {};

        if (user) {
            headers["Authorization"] = `Bearer ${localStorage.getItem("dalim_access")}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        
        if (response.status === 404){
            alert("해당하는 대회 정보가 없습니다.");
            router.push("/404");
        } else if (user && response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getRaceInfo();
        }

        const data = await response.json();
        setRace(data);
        setIsFavorite(data.is_favorite);
    };

    const getReviews = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}/reviews/`);
        const data = await response.json();
        setReviews(data);
    };

    const toggleFavorite = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}/favorite/`;
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
        } else if (response.status === 204 || response.status === 201){
            setIsFavorite(!isFavorite);
        }
    };

    const patchReview = async(review_id) => {
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}/reviews/${review_id}/`;
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
            const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}/reviews/${review_id}/`;
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
            const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${race_id}/reviews/`;
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
            } else if (response.status === 201){
                e.target.querySelector("textarea").value = "";
                getReviews();
            }

        } else {
            alert("내용을 입력해주세요.");
        }
    };

    useEffect(() => {
        if(race_id){
            getRaceInfo();
            getReviews();
        }
    },[race_id])
    
    return(
        <Wrapper>
            <ImgTitleSection
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                name={race?.title}
                badgeTxt={`${race?.reg_status}${race?.d_day>0 ? ` D${race?.d_day * -1}`: ""}`}
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
                                대회 홈페이지 바로가기
                            </Link>
                        </p>
                    </div>
                </aside>
                <div className="race-description">
                    <p className="txt-b">대회 소개</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html : race?.description
                        }}
                    />
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
                                            review.author_id == user?.pk &&
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