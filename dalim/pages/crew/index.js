import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function CrewList(){

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_list 받아와야 함
    },[])
    
    return(
        <Wrapper>
            <h2>크루 전체 리스트</h2>
        </Wrapper>
    );
}