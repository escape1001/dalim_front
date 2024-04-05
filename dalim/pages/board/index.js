import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { convertDate } from "../../utils/convert";
import { useRouter } from "next/router";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    .category-area{
        display: flex;
        gap: 1rem;
    }

    .category-area li{
        border: 1px solid var(--color-light-grey);
        padding: 0.5rem 1rem;
        border-radius: .5rem;
    }

    .category-area li.selected {
        font-weight: 800;
        border-color: var(--color-point);
        color:var(--color-point);
    }

    .post-list-area{
        padding:3rem 0;
    }

    .post-list-area table th.title{
        width: 50%;
    }

    .post-list-area table td.title a{
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap:1rem;
        color: var(--color-dark);
    }

    .post-list-area table td.title img{
        width: 20rem;
        height: 20rem;
        object-fit: contain;
        border-radius: .5rem;
    }

    .post-list-area table td.title b{
        padding-left: 1.5rem;
        color: var(--color-point);
    }

    .post-list-area .btn-row{
        padding-top: 1rem;
        text-align: right;
    }

    .pagination-area{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .pagination-area li {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-light-grey);
        border-radius: 50%;
    }

    .pagination-area li.selected {
        font-weight: 800;
        background-color: var(--color-point-yellow);
    }
`;

export default function PostList(){
    const router = useRouter();
    const {page, classification, category} = router.query;
    const [currentPage, setCurrentPage] = useState(1);
    const [cateList, setCateList] = useState();
    const [postList, setPostList] = useState([]);
    

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 caterory_list 받아와야 함
        // GET /boards/category
        const category_list_mock = {
            post_classification : [
                    {"value":"general", "label":"일반"},
                    {"value":"event", "label":"이벤트"},
                    {"value":"announcementl", "label":"공지"},
            ],
            category : [
                    {"value":"general", "label":"일반"},
                    {"value":"training", "label":"훈련"},
                    {"value":"running_gear", "label":"러닝용품"},
                    {"value":"end_of_month_sale", "label":"월말결산"},
                    {"value":"course_recommendation", "label":"코스추천"},
                ]
        };
        setCateList(category_list_mock);
        console.log("category_list_mock");
    },[]);

    useEffect(() => {
        page ? setCurrentPage(page) : setCurrentPage(1);
        // [TO DO] 카테고리 선택 바뀔 때 마다 서버에 요청을 보내서 post_list 받아와야 함
        // GET /boards/?page=1&size=20&category=general,notice&post_classification=general
        // classification, category에 따라 다른 쿼리스트링을 보내야 함
        const query_string = `?page=1&size=20${category ? `&category=${category}` : ""}${classification ? `&post_classification=${classification}` : ""}`;
        console.log(query_string);
        const post_list_mock = {
            "count": 20,
            "results": [
                {
                "id": 1,
                "author_id": 1,
                "author_nickname": "user123",
                "title": "Example Post 1",
                "thumbnail_image": null,
                "post_classification": "general",
                "category": "일반",
                "view_count": 10,
                "comment_count": 3,
                "created_at": "2024-04-01T12:00:00",
                "updated_at": "2024-04-02T08:00:00"
                },
                {
                "id": 2,
                "author_id": 2,
                "author_nickname": "user123",
                "title": "Example Post 2",
                "thumbnail_image": "https://picsum.photos/200",
                "post_classification": "event",
                "category": "이벤트",
                "view_count": 5,
                "comment_count": 3,
                "created_at": "2024-04-02T10:00:00",
                "updated_at": "2024-04-03T09:00:00"
                },
            ]
        };
        
        setPostList(post_list_mock);
    },[router.query])
    
    return(
        <Wrapper className="center-content">
            <section>
                <h2 className="ir-hidden">달림 게시판</h2>
                {/* 카테고리 선택 */}
                <ul className="category-area">
                    <li
                        className={(!classification && !category) ? "selected" : ""}
                    >
                        <Link href={`/board`}>
                            전체
                        </Link>
                    </li>
                    {
                        // staff 권한 카테고리
                        cateList?.post_classification?.map((cate, index) => (
                            <li
                                key={index}
                                className={classification === cate.value ? "selected" : ""}
                            >
                                <Link href={`/board?classification=${cate.value}`}>
                                    {cate.label}
                                </Link>
                            </li>
                        ))
                    }
                    {
                        // staff 권한 카테고리
                        cateList?.category?.map((cate, index) => (
                            <li
                                key={index}
                                className={category === cate.value ? "selected" : ""}
                            >
                                <Link href={`/board?category=${cate.value}`}>
                                    {cate.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                
                {/* 게시글 리스트 */}
                <div className="post-list-area">
                    <table className="default-table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th className="title">제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList.results?.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.id}</td>
                                    <td className="title">
                                        <Link className="txt-btn" href={`/board/${post.id}`}>
                                            {
                                                post.thumbnail_image &&
                                                <img src={post.thumbnail_image} alt="" />
                                            }
                                            <p>
                                                
                                                {post.title}
                                                <b>{post.comment_count}</b>
                                            </p>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link className="txt-btn" href={`/profile/${post.author_id}`}>
                                            {post.author_nickname}
                                        </Link>
                                    </td>
                                    <td>{convertDate(post.created_at)}</td>
                                    <td>{post.view_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="btn-row">
                        <Link className="default-btn small line" href="/board/form">
                            글쓰기
                        </Link>
                    </p>
                </div>

                {/* 페이지네이션 */}
                <ul className="pagination-area">
                    {
                        Array(postList.count).fill(0).map((_, index) => (
                            <li
                                key={index+1}
                                className={currentPage == index+1 ? "selected" : ""}
                            >
                                <Link href={`/board?page=${index+1}${category ? `&category=${category}` : ""}${classification ? `&classification=${classification}` : ""}`}>
                                    {index+1}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>

        </Wrapper>
    );
}