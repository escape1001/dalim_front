import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";


const Wrapper = styled.main`
`;

export default function PostForm(){
    const router = useRouter();
    const {post_id} = router.query;
    
    
    return(
        <Wrapper className="center-content">
            글작성 form~
        </Wrapper>
    );
}