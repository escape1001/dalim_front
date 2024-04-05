import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { Icon } from "../../components/Icons";
import { convertDate } from "../../utils/convert";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section{
        padding-bottom: 8rem;
        position: relative;
    }

    section h2{
        font-size: var(--font-size-big);
    }

    .post-area .title-row h3{
        font-size: var(--font-size-bigger);
        padding:1.5rem 0;
    }
    .post-area .title-row>div,
    .post-area .title-row>div>p{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .post-area .title-row>div:last-child{
        padding: 1rem 0;
        border: 1px solid var(--color-light-grey);
        border-left: none;
        border-right: none;
    }

    .post-area pre{
        padding:4rem 0 8rem;
    }

    .post-area .btn-area{
        display: flex;
        align-items: stretch;
        justify-content: space-between;
    }

    .comment-area ul li{
        padding: 2rem 0;
        border-bottom: 1px solid var(--color-grey);
    }

    .comment-area ul li:last-child{
        border-bottom: none;
    }

    .comment-area ul li div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
    }

    .comment-area ul li div p{
        display: flex;
        gap:1rem;
    }

    .comment-area form{
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items:flex-end;
        gap:2rem;
    }

    .comment-area textarea{
        width: 100%;
        height: 10rem;
        border-color: var(--color-grey);
    }
`;

export default function PostDetail(){
    const { user } = useContext(AuthContext);
    const { post_id } = useRouter().query;
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(null);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 post_id에 해당하는 게시글 정보를 가져와야 함
        const post_mock = {
            "id": 1,
            "author_id": 2,
            "author_nickname": "john_doe",
            "title": "New Post",
            "contents": "This is a new post?.",
            "thumbnail_image": "이미지 필드",
            "post_classification": ["training", "general"],
            "category": ["training", "general"],
            "view_count": 10,
            "created_at": "2023-04-04T12:00:00Z",
            "updated_at": "2023-04-04T12:00:00Z",
            "likes":{
                "count": 10,
                "is_liked":false
            }
        };
        const comments_mock = [
            {
                "id": 1,
                "author_id": 2,
                "author_nickname": "john_doe",
                "contents": "금연합시다",
                "created_at": "2023-04-04T15:00:00Z"
            },
            {
                "id": 2,
                "author_id": 1,
                "author_nickname": "john_doe",
                "contents": "Django",
                "created_at": "2023-04-04T15:30:00Z"
            }
        ];
        // 해당 id에 포스트 있는 경우 setPost, 없는 경우 404 페이지로 이동
        setPost(post_mock);
        setComments(comments_mock);
        setLikes(post_mock.likes);
    },[post_id])

    // API 관련 함수
    const deletePost = () => {
        // confirm으로 삭제 여부 확인
        const isDelete = confirm("정말로 삭제하시겠습니까?");

        if(isDelete){
            // [TO DO] DELETE /boards/int:post_id
            // 헤더 토큰 필요
            // 정상 응답 오면 router.push("/board")
        }
    };

    const toggleLiked = () => {        
        // [TO DO] 여기서 서버에 요청을 보내서 setLikes로 업데이트해야 함
        // POST /boards/int:post_id/like
        setLikes({
            count: likes.count + (likes.is_liked ? -1 : 1),
            is_liked: !likes.is_liked
        });
    }

    const patchComment = (comment_id) => {
        // 수정할 내용을 prompt로 입력받기
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            // [TO DO] PATCH /crews/<int:crew_id>/reviews/<int:comment_id>/
            // 헤더 토큰 필요
            // 응답 제대로 오면 setComments
        }
    };

    const deleteComment = (comment_id) => {
        // confirm으로 삭제 여부 확인
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            // [TO DO] DELETE /crews/<int:crew_id>/reviews/<int:comment_id>/
            // 200? 204? 정상 응답 오면 setComments
        }
    };

    const addComment = (e) => {
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
        <Wrapper className="center-content">
            <section className="post-area">
                <h2 className="ir-hidden">게시글 상세보기</h2>
                <div>
                    <div className="title-row">
                        <div>
                            <p>
                                [
                                {
                                    // post?.category와 post?.post_classification를 합친 배열을 join
                                    post?.category.concat(post?.post_classification).join(" / ")
                                }
                                ]
                            </p>
                            
                            <p>
                                <b>조회수</b> {post?.view_count} | <b>덧글수</b> {comments.length} | <b>좋아요</b> {likes?.count}
                            </p>
                        </div>
                        <h3>{post?.title}</h3>
                        <div>
                            <p>
                                <Link className="txt-btn" href={`/profile/${post?.author_id}`}>
                                    {post?.author_nickname}
                                </Link>
                                {convertDate(post?.created_at)}
                            </p>
                            {
                                post?.author_id === user?.pk &&
                                <p>
                                    <Link className="txt-btn" href={`/board/form?post_id=${post_id}`}>
                                        수정
                                    </Link>
                                    <button onClick={deletePost} className="txt-btn">삭제</button>
                                </p>
                            }
                        </div>
                    </div>
                    <pre>
                        포스트 내용 contents
                    </pre>
                    <p className="btn-area">
                        <button className="default-btn small" onClick={router.back}>
                            목록
                        </button>
                        <button className="default-btn small line" onClick={toggleLiked}>
                            {
                                likes?.is_liked ?
                                <Icon.Star fill="true" size="2.5rem" color="var(--color-point-yellow)"/>:
                                <Icon.Star size="2.5rem" color="var(--color-point-yellow)"/>
                            }
                            {likes?.count} 
                        </button>
                    </p>
                </div>
            </section>

            <section className="comment-area">
                <h2>덧글</h2>
                <ul>
                    {
                        comments?.map((comment, index) => {
                            return (
                                <li key={index}>
                                    <div className="user-area">
                                        <b>
                                            <Link className="txt-btn" href={`/profile/${comment.author_id}`}>
                                                {comment.author_nickname}
                                            </Link>
                                            님의 덧글
                                        </b>
                                        {
                                            comment.author_id === user?.pk &&
                                            <p>
                                                <button
                                                    onClick={()=>{patchComment(comment.id);}}
                                                    className="txt-btn"
                                                >
                                                    수정하기
                                                </button>
                                                <button
                                                    onClick={()=>{deleteComment(comment.id);}}
                                                    className="txt-btn"
                                                >
                                                    삭제하기
                                                </button>
                                            </p>
                                        }
                                    </div>
                                    <p>{comment.contents}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    user &&
                    <form className="default-form" onSubmit={addComment}>
                        <textarea placeholder="덧글을 작성해주세요" maxLength={300}></textarea>
                        <button className="default-btn small">등록</button>
                    </form>
                }
            </section>
        </Wrapper>
    );
}