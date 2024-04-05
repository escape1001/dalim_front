import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AuthContext } from '../../context/authContext';
let ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section h2{
        font-size: var(--font-size-bigger);
        padding-bottom: 3rem;
    }

    input{
        border-color: var(--color-grey);
    }

    .btn-row{
        justify-content: flex-end;
    }
`;

export default function PostForm(){
    const {user} = useContext(AuthContext);
    const router = useRouter();
    const {post_id} = router.query;
    const [post, setPost] = useState();
    const [cateList, setCateList] = useState([]);
    const [value, setValue] = useState();
    const quillRef = useRef();

    const modules = useMemo(() => {
        return {
          toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [
                    {
                    color: [],
                    },
                    { background: [] },
                ],
                ['link', 'image'],
                ['clean'],
            ],
          },
        };
    }, []);

    const postSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const contents_text = quillRef.current.getEditor().getText();
        const contents_html = quillRef.current.getEditor().root.innerHTML;
        formData.append('contents', contents_html);

        // 유효성 검사
        // 제목과 내용 필수, post_classification 혹은 category 중 하나는 선택해야함
        if(!formData.get('post_classification') && !formData.get('category')){
            alert('카테고리를 선택해주세요');
            return;
        }

        if(!formData.get('title')){
            alert('제목을 입력해주세요');
            return;
        }

        if(contents_text.length<10){
            alert('내용을 10자 이상 입력해주세요');
            return;
        }

        // 파일 첨부한 경우 이미지인지 확인, 용량 300
        if(formData.get('thumbnail_image').size > 0){
            const file = formData.get('thumbnail_image');
            if(file.size > 300000000){
                alert('이미지 용량이 너무 큽니다');
                return;
            }
            if(!file.type.includes('image')){
                alert('이미지 파일만 첨부 가능합니다');
                return;
            }
        } else {
            formData.delete('thumbnail_image');
        }
        
        // (확인용) formData를 json 형태로 변환
        let object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        console.log(object);

        // TO DO : 서버에 데이터 전송
        // 헤더에 토큰 필요
        if (post_id){
            // 수정인 경우 PUT /boards/int:post_id
            alert('수정');
        } else {
            // 신규 생성인 경우 POST /boards/
            alert('신규작성');
        }
    };

    useEffect(() => {
        // 0. 로그인한 유저 아니면 로그인 페이지로 이동

        // 1. 수정인 경우 기존 데이터 받아오기
        if(post_id){
            // GET /boards/int:post_id
            const post_mock = {
                "id": 1,
                "author_id": 1,
                "author_nickname": "john_doe",
                "title": "New Post",
                "contents": "<h2>This is a new post.</h2>",
                "thumbnail_image": "이미지 필드", 
                "post_classification": ["training", "general"],
                "category": ["training", "general"],
                "view_count": 10,
                "created_at": "2023-04-04T12:00:00Z",
                "updated_at": "2023-04-04T12:00:00Z",
                "likes":{
                    "count": 10,
                    "is_liked":true
                }
            };
            setPost(post_mock);
            setValue(post_mock.contents);
        }

        // 2. 카테고리 목록 받아오기
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
        
    },[post_id]);
    
    return(
        <Wrapper className="center-content">
            <section>
                <h2>글 {post_id ? "수정": "작성"}</h2>
                <form className="default-form" onSubmit={postSubmit}>
                    <ul>
                        <li>
                            <label>카테고리</label>
                            <ul className="checkbox-group">
                                {
                                    // staff만 post_classification 작성 가능
                                    // post.post_classification에 해당하는 값은 체크되어 있어야 함
                                    !user?.is_staff &&
                                    cateList.post_classification?.map((el, idx) => (
                                        <li key={idx}>
                                            <input
                                                type="checkbox"
                                                id={el.value}
                                                name="post_classification"
                                                value={el.value}
                                                checked={
                                                    post?.post_classification.includes(el.value)
                                                }
                                            />
                                            <label htmlFor={el.value}>{el.label}</label>
                                        </li>
                                    ))
                                }
                                {
                                    cateList.category?.map((el, idx) => (
                                        <li key={idx}>
                                            <input
                                                type="checkbox"
                                                id={el.value}
                                                name="category"
                                                value={el.value}
                                                checked={
                                                    post?.category.includes(el.value)
                                                }
                                            />
                                            <label htmlFor={el.value}>{el.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li>
                            <label>제목</label>
                            <input type="text" name="title" required value={post?.title}/>
                        </li>
                        <li>
                            <ReactQuill
                                modules={modules}
                                ref={quillRef}
                                theme="snow"
                                value={value}
                                onChange={setValue}
                            />
                        </li>
                        <li>
                            <label>대표이미지 첨부</label>
                            <input type="file" name="thumbnail_image"/>
                        </li>
                        <li className="btn-row">
                            <button className="default-btn small">제출</button>
                        </li>
                    </ul>
                </form>
            </section>
        </Wrapper>
    );
}