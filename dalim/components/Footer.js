import styled from 'styled-components';
import Link from 'next/link';


const Wrapper = styled.footer`
  padding: 5rem 0 8rem;
  background-color: var(--color-navy);
  color: var(--color-light);

  .center-content{
    display: flex;
    gap:2rem;
    flex-direction: column;
  }
`;

export default function Header() {
  return (
    <Wrapper>
      <div className='center-content'>
        <p>
          달림(Dalim) © 2024 All rights reserved.<br/>
          <Link target='_blank' href="https://github.com/orm-final-101/dalim_api">
            About project Dalim
          </Link>
        </p>
        <p>
          본 서비스는 Django Rest Framework로 개발되었습니다.
        </p>
      </div>
    </Wrapper>
  )
}
