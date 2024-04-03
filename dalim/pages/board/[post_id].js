import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function PostDetail(){
    const { post_id } = useRouter().query;

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 post_id에 해당하는 게시글 정보를 가져와야 함
    },[post_id])
    
    return(
        <Wrapper>
            <h2>게시글 상세 페이지</h2>
            <p>게시글 아이디: {post_id}</p>
        </Wrapper>
    );
}