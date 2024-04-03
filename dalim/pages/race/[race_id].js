import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
`;

export default function RaceDetail(){
    const { race_id } = useRouter().query;

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 race_id에 해당하는 대회 정보를 가져와야 함
    },[race_id])
    
    return(
        <Wrapper>
            <h2>대회 상세 페이지</h2>
            <p>대회 아이디: {race_id}</p>
        </Wrapper>
    );
}