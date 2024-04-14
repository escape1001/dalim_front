import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';


const Wrapper = styled.header`
  background-color: var(--color-point-yellow);
  padding: 1.5rem 0;

  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--color-point);
    gap:4rem;
  }
  
  h1 {
    font-size: var(--font-size-huge);
    font-weight: 800;
    flex-grow: 1;
  }

  ul {
    display: flex;
    gap: 2rem;
    color: var(--color-navy);
  }
`;

export default function Header() {
  const {user, logout} = useContext(AuthContext);
  
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
              {
                user &&
                <li>
                  <Link href="/accounts/mypage">
                    마이페이지
                  </Link>
                </li>
              }
              {
                user?.user_type === 'crew' &&
                <li>
                  <Link href="/manage/crew">
                    크루 관리
                  </Link>
                </li>
              }
            </ul>
            <div>
              {
                user ? 
                <button onClick={logout}>로그아웃</button> :
                <>
                  <Link href="/accounts/login">
                    로그인
                  </Link> /&nbsp;
                  <Link href="/accounts/signup">
                    회원가입
                  </Link>
                </>
              }
            </div>
        </nav>
    </Wrapper>
  )
}
