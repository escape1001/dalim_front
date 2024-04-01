import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 5rem 0 8rem;
  background-color: var(--color-navy);
  color: var(--color-light);
`;

export default function Header() {
  return (
    <Wrapper>
      <div className='center-content'>
        footer 내용
      </div>
    </Wrapper>
  )
}
