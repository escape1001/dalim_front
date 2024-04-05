import styled from 'styled-components';

const Wrapper = styled.footer`
  text-align: center;

  img{
    width: 70%;
    max-width: 40rem;
  }

  p{
    padding-top: 3rem;
    font-size: var(--font-size-big);
  }
`;

export default function Empty({text, imgOn=false}) {
  return (
    <Wrapper>
      <img src="/assets/images/obj_empty.jpeg"/>
      <p>{text}</p>
    </Wrapper>
  )
}
