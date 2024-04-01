import styled from 'styled-components';
import Link from 'next/link';


const Wrapper = styled.header`
  background-color: var(--color-point-yellow);
  padding: 1.5rem 0;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-point);
  }
  
  h1 {
    font-size: var(--font-size-huge);
    font-weight: 800;
  }

  ul {
    display: flex;
    gap: 2rem;
  }

`;

export default function Header() {
  return (
    <Wrapper>
        <nav className='center-content'>
            <h1>
                <Link href="/">
                    DALIM
                </Link>
            </h1>
            <ul>
              <li>
                <Link href="/crew">
                  러닝 크루
                </Link>
              </li>
              <li>
                <Link href="/race">
                  대회
                </Link>
              </li>
              <li>
                <Link href="/board">
                  게시판
                </Link>
              </li>
            </ul>
        </nav>
    </Wrapper>
  )
}
