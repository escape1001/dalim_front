import styled from 'styled-components';


const Wrapper = styled.div`
    .level-txt{
        padding-bottom: .5rem;
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        color:var(--color-point);
    }

    .level-txt span{
        color:var(--color-dark);
    }

    .level-bar{
        height: 1rem;
        background-color: var(--color-light-grey);
        border-radius: 1rem;
        overflow: hidden;
    }

    .level-bar p{
        height: 100%;
        background-color: var(--color-point);
    }
`;

export default function LevelBar({level, distance}) {
    // 미터를 km로 변환하는 함수
    const convertDistance = (distance) => {
        return (distance / 1000).toFixed(1);
    }

    const percent = distance / level?.next_distance * 100;

    return (
        <Wrapper>
            <div className="level-txt">
              <p>
                {convertDistance(distance)}/<span>{convertDistance(level?.next_distance)}km</span>
              </p>
              <p>
                Lv.{level?.number}
              </p>
            </div>
            <div className='level-bar'>
              <p style={{"width":`${percent}%`}}></p>
            </div>
        </Wrapper>
    )
}
