import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function CrewManageList(){

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_list 받아와야 함
    },[])
    
    return(
        <Wrapper>
            <h2>크루 관리</h2>
            <Link className="default-btn" href="/admin/crew/form">
                크루 목록 / 등록버튼
            </Link>
        </Wrapper>
    );
}