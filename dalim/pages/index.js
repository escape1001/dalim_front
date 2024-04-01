import styled from 'styled-components';

const Wrapper = styled.main`
  color:red;
`;

export default function Home() {
  return (
    <Wrapper>
      <div className='center-content'>
        내용~~~~
      </div>
    </Wrapper>
  )
}
