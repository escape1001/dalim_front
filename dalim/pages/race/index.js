import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function RaceList(){

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 race_list 받아와야 함
    },[])
    
    return(
        <Wrapper>
            <h2>대회 전체 리스트</h2>
        </Wrapper>
    );
}