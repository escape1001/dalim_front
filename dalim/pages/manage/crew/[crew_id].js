import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function CrewManageDetail(){
    const { crew_id } = useRouter().query;

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_id에 해당하는 게시글 정보를 가져와야 함
    },[crew_id])
    
    return(
        <Wrapper>
            <h2>크루관리 상세 페이지</h2>
            <p>크루관리 아이디: {crew_id}</p>
        </Wrapper>
    );
}