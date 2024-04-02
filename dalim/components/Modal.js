import styled from "styled-components"
import { Icon } from "./Icons";

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2{
        text-align: center;
        padding-bottom: 3rem;
        font-size: var(--font-size-bigger);
    }

    .content-area{
        width: 90%;
        max-width: 50rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .content-area .btn-area{
        padding-bottom: 1rem;
    }

    .content-area .box-area{
        width: 100%;
        padding:3rem;
        background-color: var(--color-white);
        border-radius: .5rem;
        box-sizing: border-box;
    }
`;

export default function modal({setModalOpen, title="", children}) {
    return (
        <Wrapper>
            <div className="content-area">
                <p className="btn-area">
                    <button className="close" onClick={() => setModalOpen(false)}>
                        <Icon.Close color="var(--color-white)" size="2rem"/>
                    </button>
                </p>
                <div className="box-area">
                    {
                        title && <h2>{title}</h2>
                    }
                    {children}
                </div>
            </div>
        </Wrapper>
    )
}