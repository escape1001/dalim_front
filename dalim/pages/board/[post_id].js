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

    .post-area .contents{
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
    const { user, refreshToken } = useContext(AuthContext);
    const { post_id } = useRouter().query;
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(null);

    const getPost = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}`;
        let headers = {};

        if (user) {
            headers["Authorization"] = `Bearer ${localStorage.getItem("dalim_access")}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        
        if (response.status === 404){
            alert("해당하는 게시글이 없습니다.");
            router.push("/404");
        } else if (user && response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getPost();
        }

        const data = await response.json();
        setPost(data);
        setLikes(data.likes);
    };

    const getComments = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}/comments`;
        let headers = {};

        const response = await fetch(url, {
            method: "GET",
        });
        
        const data = await response.json();
        setComments(data);
    };

    const deletePost = async() => {
        const isDelete = confirm("정말로 삭제하시겠습니까?");

        if(isDelete){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`
            };
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });

            if (response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await deletePost();
            } else if (response.status === 200){
                alert("게시글이 삭제되었습니다.");
                router.push("/board");
            } else {
                alert("게시글 삭제에 실패했습니다.");
                console.log(response);
            }
        }
    };

    const toggleLiked = async() => {        
        // [TO DO] 여기서 서버에 요청을 보내서 setLikes로 업데이트해야 함
        // POST /boards/int:post_id/like
        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}/like`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`
        };
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
        });

        if (response.status === 401) {
            console.log("토큰 재요청");
            refreshToken();
            toggleLiked();
        } else if (response.status == 200){
            setLikes({
                count: likes.count + (likes.is_liked ? -1 : 1),
                is_liked: !likes.is_liked
            });
        } else {
            alert("좋아요 요청에 실패했습니다.");
            console.log(response);
        }
    }

    const patchComment = async (comment_id) => {
        const mod_contents = prompt("수정할 덧글 내용을 입력해주세요");

        if (mod_contents){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}/comments/${comment_id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
                "Content-Type": "application/json",
            };
            const data = {
                contents: mod_contents,
            };
            const response = await fetch(url, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await patchComment(comment_id);
            } else if (response.status === 200){
                getComments();
            } else{
                alert("덧글 수정에 실패했습니다.");
                console.log(response);
            
            }
        }
    };

    const deleteComment = async (comment_id) => {
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}/comments/${comment_id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`
            };

            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });

            if (response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await deleteComment(comment_id);
            } else if (response.status === 200){
                getComments();
            } else {
                alert("덧글 삭제에 실패했습니다.");
                console.log(response);
            }

        }
    };

    const addComment = async (e) => {
        e.preventDefault();

        const contents = e.target.querySelector("textarea").value;
        if (contents){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}/comments/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
                "Content-Type": "application/json",
            };
            const data = {
                contents: contents,
            };
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });
            
            if (response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await addComment(e);
            } else if (response.status === 201){
                e.target.querySelector("textarea").value = "";
                getComments();
            } else {
                alert("덧글 등록에 실패했습니다.");
                console.log(response);
            }
        } else {
            alert("내용을 입력해주세요.");
        }
    };

    useEffect(() => {
        if (post_id){
            getPost();
            getComments();
        }
    },[post_id])
    
    return(
        <Wrapper className="center-content">
            <section className="post-area">
                <h2 className="ir-hidden">게시글 상세보기</h2>
                <div>
                    <div className="title-row">
                        <div>
                            <p>
                                [{post?.category || post?.post_classification}]
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
                    <div className="contents" dangerouslySetInnerHTML={{__html: post?.contents}}/>
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