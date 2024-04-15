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

    form li{
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .btn-row{
        justify-content: flex-end;
    }
`;

export default function PostForm(){
    const {user, refreshToken} = useContext(AuthContext);
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

    const getCategoryList = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/category`;

        const response = await fetch(url, {
            method: "GET"
        });
        
        const data = await response.json();
        setCateList(data);
    };

    const getPost = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id}`;

        const response = await fetch(url, {
            method: "GET"
        });
        
        const data = await response.json();
        setPost(data);
        setValue(data.contents);
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const contents_text = quillRef.current.getEditor().getText();
        const contents_html = quillRef.current.getEditor().root.innerHTML;
        formData.append('contents', contents_html);
        
        // 비어있는 input 제외
        for (var pair of formData.entries()) {
            if (pair[1] === ""){
                formData.delete(pair[0]);
            }
        }

        // 만역 post_classification이 없으면 추가
        if(!formData.get('post_classification')){
            formData.set('post_classification', 'general');
        }

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

        const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/${post_id ? post_id+"/" : ""}`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('dalim_access')}`
        }
        const response = await fetch(url, {
            headers: headers,
            method: post_id ? "PUT" : "POST",
            body: formData
        });

        if (user && response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await postSubmit(e);
        } else if (response.status === 201) {
            const data = await response.json();
            router.push(`/board/${data.id}`);
        } else if(response.status === 200){
            router.push(`/board/${post_id}`);
        } else {
            alert("글 등록에 실패했습니다.");
            console.log(response);
        }

    };

    useEffect(() => {
        getCategoryList();
        
        if(post_id){
            getPost();
        }
    },[post_id]);

    return(
        <Wrapper className="center-content">
            <section>
                <h2>글 {post_id ? "수정": "작성"}</h2>
                <form className="default-form grey" onSubmit={postSubmit}>
                    <ul>
                        {
                            user?.is_staff &&
                            <li>
                                <label>공지 카테고리</label>
                                <ul className="checkbox-group">
                                    {
                                        cateList?.post_classification?.map((el, idx) => (
                                            <li key={idx}>
                                                <input
                                                    type="radio"
                                                    id={el.value}
                                                    name="post_classification"
                                                    value={el.value}
                                                    checked={
                                                        post?.post_classification.includes(el.value)
                                                    }
                                                    onChange={(e) => {
                                                        if (post){
                                                            if (e.target.checked){
                                                                setPost({...post, post_classification: [...post?.post_classification, e.target.value]});
                                                            } else {
                                                                setPost({...post, post_classification: post?.post_classification.filter((item) => item !== e.target.value)});
                                                            }
                                                        }
                                                    }}
                                                    required
                                                />
                                                <label htmlFor={el.value}>{el.label}</label>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        }
                        <li>
                            <label>카테고리</label>
                            <ul className="checkbox-group">
                                {
                                    cateList?.category?.map((el, idx) => (
                                        <li key={idx}>
                                            <input
                                                type="radio"
                                                id={el.value}
                                                name="category"
                                                value={el.value}
                                                checked={
                                                    post?.category.includes(el.value)
                                                }
                                                onChange={(e) => {
                                                    if (post){
                                                        if (e.target.checked){
                                                            setPost({...post, category: [...post?.category, e.target.value]});
                                                        } else {
                                                            setPost({...post, category: post?.category.filter((item) => item !== e.target.value)});
                                                        }
                                                    }
                                                }}
                                                required
                                            />
                                            <label htmlFor={el.value}> {el.value} / {el.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li>
                            <label>제목</label>
                            <input
                                type="text"
                                name="title"
                                value={post?.title}
                                onChange={(e) => {
                                    if (post){
                                        setPost({...post, title: e.target.value});
                                    }
                                }}
                                required
                            />
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