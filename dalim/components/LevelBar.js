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
    const convertDistance = (meter) => {
        return (meter / 1000).toFixed(2);
    }

    const percent = (distance - level?.prev_distance) / (level?.next_distance - level?.prev_distance) * 100;

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
