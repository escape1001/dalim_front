import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import LevelBar from '../../components/LevelBar';
import { AuthContext } from '../../context/authContext';


const Wrapper = styled.main`
    padding-top: 10rem;

    section {
        padding-bottom: 8rem;
        position: relative;
    }

    section h2{
        font-size: var(--font-size-big);
        padding-bottom: 2rem;
    }

    section>ul{
        width: 100%;
        display: flex;
        gap:1rem;
        flex-wrap: wrap;
    }
    
    section>ul>li{
        width: calc((100% - 2rem)/3);
        flex-grow: 0;
    }

    section>ul>li>a{
        padding:2rem;
        border: 1px solid var(--color-light-grey);
        border-radius: .5rem;
        transition: var(--default-transition);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap:.5rem;
    }

    section>ul>li>a:hover{
        box-shadow: var(--default-shadow);
    }
    
    section>ul>li>a p{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
    }
    
    section>ul>li>a .sub{
        font-size: var(--font-size-small);
        font-weight: 400;
    }

    // 개별 스타일링
    .user-info-section .info-area{
        display: flex;
        align-items: center;
        gap:2rem;
    }

    .user-info-section .info-area .img-area{
        width: 20rem;
        height: 20rem;
        border-radius: 1rem;
        overflow: hidden;
    }

    .user-info-section .info-area .img-area img{
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .user-info-section .info-area .text-area{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }

    .user-info-section .info-area .text-area .greeting{
        font-size: var(--font-size-bigger);
        line-height: 1.5;
        font-weight: 800;
    }

    .user-info-section .info-area .text-area .greeting b{
        color: var(--color-point);
    }

    .user-info-section .level-area{
        padding-top: 2rem;
    }
`;

export default function Userhome() {
    // userid 를 받아서 해당 유저의 정보를 보여주는 페이지
    const { user } = useContext(AuthContext);    
    const { user_id } = useRouter().query;
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 user_id에 해당하는 유저 정보를 가져와야 함
        // GET /accounts/<int:pk>/profile
        const test_data = {
            user:{
                id:2,
                username: "김달림",
                nickname: "달려달려",
                distance:42500,
                level: {
                    title:"새싹 달림이",
                    number: 1,
                    next_distance: 50000
                },
                profile_image: "https://picsum.photos/200",
                crew : ["크루이름", "크루이름2"],
                post_count: 3,
                comment_count: 10
            },
            posts:[
                {
                    id: 2,
                    title: "포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목",
                    author: "글쓴이",
                    comment_count: 123,
                    like_count: 123,
                }
            ],
            comments:[
                {
                    post: {
                        id: 1,
                        title: "포스트 제목",
                        author: "글쓴이"
                    },
                    comment: "코멘트 내용"
                },
                {
                    post: {
                        id: 2,
                        title: "포스트 제목",
                        author: "글쓴이"
                    },
                    comment: "코멘트 내용"
                },
            ],
            likes:[
                {
                    id: 2,
                    title: "포스트 제목",
                    author: "글쓴이",
                    comment_count: 123,
                    like_count: 123,
                }
            ],
            reviews:{
                crew:[
                    {
                        id: 2,
                        name: "크루이름/대회이름",
                        contents: "리뷰내용"
                    }
                ],
                race:[
                    {
                        id: 2,
                        name: "크루이름/대회이름",
                        contents: "리뷰내용"
                    }
                ],
            }
        };

        setProfileData(test_data);
        // 만약 해당 유저 없을 시 404 페이지로 이동
    }, [user_id])

    return (
        <Wrapper className='center-content'>
            <section className='user-info-section'>
                <h2 className='ir-hidden'>유저 기본정보</h2>
                <div className='info-area'>
                    <p className='img-area'>
                        <img src={profileData?.user.profile_image} alt=""/>
                    </p>
                    <div className='text-area'>
                        <div className="greeting">
                            <p><b>#{profileData?.user.level.title}</b> {profileData?.user.nickname}</p>
                        </div>
                        <p>작성한 글: {profileData?.user.post_count} 건</p>
                        <p>작성한 덧글: {profileData?.user.comment_count_count} 건</p>
                        <p>{profileData?.user.crew.join(",")} 크루에서 달리는 중!</p>
                    </div>
                </div>

                <div className="level-area">
                    <LevelBar level={profileData?.user.level} distance={profileData?.user.distance}/>
                </div>
            </section>

            <section>
                <h2>작성한 글</h2>
                <ul>
                    {
                        profileData?.posts.map((post, index) => (
                            <li key={index}>
                                <Link href={`/board/${post.id}`}>
                                    <p>
                                        {post.title}
                                    </p>
                                    <p className='sub'>
                                        덧글 {post.comment_count} 개 / 좋아요 {post.like_count}개
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section>
                <h2>작성한 덧글</h2>
                <ul>
                    {
                        profileData?.comments.map((comment, index) => (
                            <li key={index}>
                                <Link href={`/post/${comment.post.id}`}>
                                    <p>
                                        "{comment.comment}"
                                    </p>
                                    <p className='sub'>
                                        {comment.post.title}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>

            {
                // 로그인한 유저 본인일 때만 노출
                user?.pk == user_id && 
                <section>
                    <h2>좋아한 글</h2>
                    <ul>
                        {
                            profileData?.likes.map((post, index) => (
                                <li key={index}>
                                    <Link href={`/post/${post.id}`}>
                                        <p>
                                            {post.title}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            }

            <section>
                <h2>내가 남긴 후기</h2>
                <ul>
                    {
                        profileData?.reviews.crew.map((review, index) => (
                            <li key={index}>
                                <Link href={`/crew/${review.id}`}>
                                    <p>
                                        "{review.contents}"
                                    </p>
                                    <p className='sub'>
                                        {review.name}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                    {
                        profileData?.reviews.race.map((review, index) => (
                            <li key={index}>
                                <Link href={`/race/${review.id}`}>
                                    <p>
                                        "{review.contents}"
                                    </p>
                                    <p className='sub'>
                                        {review.name}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </Wrapper>
    )
}
