import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  form{
    width: 90%;
    max-width: 60rem;
  }

  h2{
    font-size: var(--font-size-max);
    text-align: center;
  }
  
  ul{
    padding: 5rem 0;
  }

  button{
    max-width: unset;
  }
`;

export default function Login() {
  const {login} = useContext(AuthContext);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    // 유효성 검사 하고 login(data);
    login(data);
  }

  return (
    <Wrapper>
      <form className='default-form' onSubmit={loginSubmit}>
        <h2>로그인</h2>
        <ul>
          <li>
            <label htmlFor='username'>아이디</label>
            <input id="username" name="username" />
          </li>
          <li>
            <label htmlFor='password'>비밀번호</label>
            <input id="password" name="password" type="password" />
          </li>
        </ul>
        <button className='default-btn'>로그인</button>
      </form>
    </Wrapper>
  )
}
