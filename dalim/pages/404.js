import styled from 'styled-components';


const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  img{
    width: 50%;
  }
  p{
    font-size: var(--font-size-bigger);
    padding-top: 3rem;
    font-weight: 600;
  }
`;

export default function Home() {

  return (
    <Wrapper className='center-content'>
      <img src="/assets/images/obj_empty.jpeg"/>
      <p>
        페이지를 찾을 수 없습니다.
      </p>
    </Wrapper>
  )
}
