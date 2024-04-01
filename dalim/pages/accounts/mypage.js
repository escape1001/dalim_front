import styled from 'styled-components';

const Wrapper = styled.main`
  color:red;
`;

export default function Mypage() {
  return (
    <Wrapper>
      <div className='center-content'>
        마이페이지
      </div>
    </Wrapper>
  )
}
