import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';


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
              <li>
                <Link href="/accounts/mypage">
                  마이페이지
                </Link>
              </li>
              <li>
                <Link href="/crews/admin">
                  크루 관리(크루유저)
                </Link>
              </li>
            </ul>

            <div>
              {
                user ? 
                <button onClick={logout}>로그아웃</button> :
                <>
                  <Link href="/accounts/login">
                    로그인
                  </Link>
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
