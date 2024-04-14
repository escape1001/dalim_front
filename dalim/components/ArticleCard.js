import styled from 'styled-components';
import Link from 'next/link';


const Wrapper = styled.div`
    width: 100%;
    border-radius: .5rem;
    overflow: hidden;
    border: 1px solid var(--color-light-grey);
    transition: var(--default-transition);
    
    a{
        display: flex;
    }

    &:hover{
        box-shadow: var(--default-shadow);
    }
  
    .img-area{
        width:40%;
        aspect-ratio: 4/2.5;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
    }

    .img-area img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text-area{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        gap: .5rem;
    }

    .text-area p:first-child{
        opacity: 0.7;
    }

    .text-area p:last-child{
        font-weight: 600;
        font-size: var(--font-size-big);
    }
`;

export default function ArticleCard({article}) {

    return (
        <Wrapper>
            <Link href={article.link_path}>
                <div className='img-area'>
                    <img src={article.thumbnail_image} alt={article.title}/>
                </div>
                <div className='text-area'>
                    <p>{article.sub_title}</p>
                    <p>{article.title}</p>
                </div>
            </Link>
        </Wrapper>
    )
}
