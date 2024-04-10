import styled from "styled-components";
import { Icon } from "./Icons";


const Wrapper = styled.section`
    .img-area{
        width: 100%;
        height: 50vh;
        position: relative;
    }

    .img-area img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .img-area .overlay{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0));
    }
    
    .img-area .overlay p{
        padding: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .text-area{
        padding:3rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .text-area strong{
        font-size: var(--font-size-huge);
    }
`;

export default function ImgTitleSection({isFavorite, toggleFavorite, name, badgeTxt, imgUrl, favApiPath}){
    const toggleBtn = (e) => {
        e.stopPropagation();
        
        // [TO DO] 여기서 서버에 요청을 보내서 is_favorite를 업데이트해야 함
        // POST favApiPath
        toggleFavorite(!isFavorite);
    }
    
    return(
        <Wrapper>
            <h2 className="ir-hidden">{name}</h2>
            <div className='img-area'>
                <img src={imgUrl} alt=""/>
                <div className='overlay'>
                    <p className="center-content">
                        {
                            isFavorite !== null &&
                            <button onClick={(e)=>{toggleBtn(e);}}>
                                {
                                    isFavorite ?
                                    <Icon.Star fill="true" size="4rem"/>:
                                    <Icon.Star size="4rem"/>
                                }
                            </button>
                        }
                    </p>
                </div>
            </div>
            <div className="text-area center-content">
                <strong>{name}</strong>
                <i className='default-badge'>{badgeTxt}</i>
            </div>
        </Wrapper>
    );
}