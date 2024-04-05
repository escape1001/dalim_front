import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { location_city_list } from '../../utils/constants';


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

  .agreement {
    justify-content: flex-end;
  }

  .agreement input{
    margin-left: 1rem;
  }
`;

export default function Signup() {
  const {signup} = useContext(AuthContext);

  const validateForm = (data)=>{
    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
  
    // 비밀번호 유효성 검사
    if (data.password1.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }
  
    // 비밀번호 확인
    if (data.password1 !== data.password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
  
    // 이름 유효성 검사
    if (data.username.trim() === "") {
      alert("이름을 입력해주세요.");
      return false;
    }
  
    // 닉네임 유효성 검사
    if (data.nickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return false;
    }
  
    // 생년월일 유효성 검사
    if (data.birth_date.trim() === "") {
      alert("생년월일을 입력해주세요.");
      return false;
    }
  
    // 성별 유효성 검사
    if (!["female", "male", "none"].includes(data.gender)) {
      alert("성별을 선택해주세요.");
      return false;
    }
  
    // 가입유형 유효성 검사
    if (!["normal", "crew"].includes(data.user_type)) {
      alert("가입유형을 선택해주세요.");
      return false;
    }
  
    // 활동지역 유효성 검사
    if (data.location_city.trim() === "") {
      alert("활동지역을 선택해주세요.");
      return false;
    }
  
    // 휴대폰 번호 유효성 검사
    const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phonePattern.test(data.phone)) {
      alert("유효한 휴대폰 번호를 입력해주세요.");
      return false;
    }

    // 개인정보약관 동의 검사
    if (!data.agreement) {
      alert("개인정보 약관에 동의해주세요.");
      return false;
    }
  
    // 모든 검사를 통과
    return true;
  }

  const signupSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const isValid = validateForm(Object.fromEntries(data));

    // 유효성 검사를 통과한 경우, 회원가입 로직을 수행
    if (isValid) {
      signup(data);
    }
    
    // [TO DO : 삭제] formdata를 json으로 변환
    let object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    console.log(object);
    // 유효성 검사 하고 signup(data);
    // signup(data);
  }

  return (
    <Wrapper>
      <form className='default-form' onSubmit={signupSubmit} autoComplete='false'>
        <h2>회원가입</h2>
        <ul>
          <li>
            <label htmlFor='email'>이메일</label>
            <input id="email" name="email" type="email" required/>
          </li>
          <li>
            <label htmlFor='password1'>비밀번호</label>
            <input id="password1" name="password1" type="password" required/>
          </li>
          <li>
            <label htmlFor='password2'>비밀번호 확인</label>
            <input id="password2" name="password2" type="password" required/>
          </li>
          <li>
            <label htmlFor='username'>이름</label>
            <input id="username" name="username" required maxLength={30}/>
          </li>
          <li>
            <label htmlFor='nickname'>닉네임</label>
            <input id="nickname" name="nickname" required maxLength={30}/>
          </li>
          <li>
            <label htmlFor='birth_date'>생년월일</label>
            <input id="birth_date" name="birth_date" type="date" required/>
          </li>
          <li>
            <label htmlFor='gender'>성별</label>
            <div className='radio-group'>
              <label htmlFor='female'>
                여성
                <input value="female" id="female" name="gender" type="radio" required/>
              </label>
              <label htmlFor='male'>
                남성
                <input value="male" id="male" name="gender" type="radio" required/>
              </label>
              <label htmlFor='none'>
                답변안함
                <input checked value="none" id="none" name="gender" type="radio" required/>
              </label>
            </div>
          </li>
          <li>
            <label htmlFor='user_type'>가입유형</label>
            <div className='radio-group'>
              <label htmlFor='normal'>
                일반
                <input checked value="normal" id="normal" name="user_type" type="radio" required/>
              </label>
              <label htmlFor='crew'>
                크루장
                <input value="crew" id="crew" name="user_type" type="radio" required/>
              </label>
            </div>
          </li>
          <li>
            <label htmlFor='location_city'>활동지역</label>
            <select name="location_city" required>
              <option value=''>대분류 선택</option>
              {
                location_city_list.map((city, index) => (
                    <option key={index} value={city.value}>{city.label}</option>
                ))                                    
              }
            </select>
            <input title="location_district" name="location_district" maxLength={30}/>
          </li>
          <li>
            <label htmlFor='phone'>휴대폰 번호</label>
            <input id="phone" name="phone" type="tel" required placeholder='010-1234-1234'/>
          </li>
          <li className='agreement'>
            <label htmlFor='agreement'>
              개인정보 동의 약관
              <input id="agreement" name="agreement" type="checkbox" required/>
            </label>
          </li>
        </ul>
        <button className='default-btn'>회원가입</button>
      </form>
    </Wrapper>
  )
}
