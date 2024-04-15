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
    const router = useRouter();
    const { user, refreshToken } = useContext(AuthContext);
    const { user_id } = router.query;
    const [profile, setProfile] = useState();

    const getProfile = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/${user_id}/profile`;
        let headers = {};

        if (user){
            headers['Authorization'] = `Bearer ${localStorage.getItem('dalim_access')}`;
        }

        const response = await fetch(url, {headers});
        if (response.status === 401){
            await refreshToken();
        } else if (response.status === 404){
            router.push('/404');
        } else if (response.status === 200){
            const data = await response.json();
            setProfile(data);
        } else {
            alert("프로필을 불러오는데 실패했습니다.");
            console.log(response);
        }
    };

    useEffect(() => {
        if (user_id){
            getProfile();
        }
    }, [user_id])

    return (
        <Wrapper className='center-content'>
            <section className='user-info-section'>
                <h2 className='ir-hidden'>유저 기본정보</h2>
                <div className='info-area'>
                    <p className='img-area'>
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}${profile?.user.profile_image}`} alt=""/>
                    </p>
                    <div className='text-area'>
                        <div className="greeting">
                            <p><b>#{profile?.user.level.title}</b> {profile?.user.nickname}</p>
                        </div>
                        <p>작성한 글: {profile?.posts.length} 건</p>
                        <p>작성한 덧글: {profile?.comments.length} 건</p>
                        <p>{profile?.user.crew.join(",")} 크루에서 달리는 중!</p>
                    </div>
                </div>

                <div className="level-area">
                    <LevelBar level={profile?.user.level} distance={profile?.user.distance}/>
                </div>
            </section>

            <section>
                <h2>작성한 글</h2>
                <ul>
                    {
                        profile?.posts.map((post, index) => (
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
                        profile?.comments.map((comment, index) => (
                            <li key={index}>
                                <Link href={`/board/${comment.post.id}`}>
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
                            profile?.likes.map((post, index) => (
                                <li key={index}>
                                    <Link href={`/board/${post.post_id}`}>
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
                <h2>{profile?.user.nickname}님이 남긴 후기</h2>
                <ul>
                    {
                        profile?.reviews.crew.map((review, index) => (
                            <li key={index}>
                                <Link href={`/crew/${review.crew_id}`}>
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
                        profile?.reviews.race.map((review, index) => (
                            <li key={index}>
                                <Link href={`/race/${review.race_id}`}>
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
