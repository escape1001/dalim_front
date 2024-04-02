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

  const validateForm = (data)=>{
    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
  
    // 비밀번호 유효성 검사
    if (data.password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }
  
    return true;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const isValid = validateForm(Object.fromEntries(data));
    
    // 유효성 검사를 통과한 경우, 로그인 로직을 수행
    if (isValid) {
      login(data);
    }
  }

  return (
    <Wrapper>
      <form className='default-form' onSubmit={loginSubmit}>
        <h2>로그인</h2>
        <ul>
          <li>
            <label htmlFor='email'>이메일</label>
            <input id="email" name="email" type="email" required/>
          </li>
          <li>
            <label htmlFor='password'>비밀번호</label>
            <input id="password" name="password" type="password" required/>
          </li>
        </ul>
        <button className='default-btn'>로그인</button>
      </form>
    </Wrapper>
  )
}
