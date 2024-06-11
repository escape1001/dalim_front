import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RaceCard from "../../components/RaceCard";
import { AuthContext } from "../../context/authContext";
import Empty from "../../components/Empty";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section{
        padding-bottom: 8rem;
        position: relative;
    }

    section h2{
        font-size: var(--font-size-bigger);
        padding-bottom: 3rem;
    }

    section>ul{
        width: 100%;
        display: flex;
        gap:1rem;
        flex-wrap: wrap;
    }
    
    section>ul>li{
        width: calc((100% - 1rem)/2);
        flex-grow: 0;
    }

    section>ul>li.full-row{
        width: 100%;
    }

    .search-area form{
        display: flex;
        flex-wrap: wrap;
        gap:3rem;
        padding:3rem 5rem;
        border: 1px solid var(--color-point);
        border-radius: .5rem;
    }

    .search-area form p{
        display: flex;
        align-items: center;
        gap:1rem;
        flex-grow: 1;
    }

    .search-area form p:last-child{
        justify-content: end;
    }

    .search-area form label{
        font-weight: 800;
        padding-right: 2rem;
    }

    .search-area form input[type=text]{
        padding:1rem;
        border-radius: .5rem;
        border: 1px solid var(--color-point);
    }

    .search-area form ul{
        display: flex;
        gap:2rem;
    }

    .search-area form ul label{
        padding:0;
        font-weight: 400;
    }

    .search-area form ul label input{
        margin-right: 1rem;
    }
`;

export default function RaceList(){
    const {user, refreshToken} = useContext(AuthContext);
    const [raceList, setRaceList] = useState([]);
    const [query, setQuery] = useState("");

    const getRaceList = async (q) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/races/${q? q : ""}`;
        let headers = {};
        if (user) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('dalim_access')}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (user && response.reg_status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getRaceList();
        }
        
        const data = await response.json();
        setRaceList(data);
    };
    
    useEffect(() => {
        query ? getRaceList("?" + query) : getRaceList();
    },[query])

    const searchSubmit = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const reg_status = Array.from(e.target.reg_status).filter((el) => el.checked).map((el) => el.value).join(",");
        const encodedSearch = encodeURIComponent(search);
        const encodedreg_Status = encodeURIComponent(reg_status);
        const query_string = (search ? `search=${encodedSearch}` : "") + (reg_status ? `&reg_status=${encodedreg_Status}` : "");


        if(query_string){
            setQuery(query_string);
            console.log(query_string);
        } else {
            setQuery("");
        }
    };
    
    return(
        <Wrapper className="center-content">
            <section className="search-area">
                <h2>검색 필터</h2>
                <form onSubmit={searchSubmit}>
                    <p>
                        <label htmlFor="race_name">대회명</label>
                        <input id="race_name" name="search"  placeholder="대회명을 입력해주세요" type="text" maxLength={100}/>
                    </p>
                    <p>
                        <label>상태</label>
                        <ul>
                            <li>
                                <label>
                                    <input name="reg_status" type="radio" value=""/>
                                    선택안함
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="reg_status" type="radio" value="접수중"/>
                                    접수중
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="reg_status" type="radio" value="접수예정"/>
                                    접수예정
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="reg_status" type="radio" value="접수완료"/>
                                    접수완료
                                </label>
                            </li>
                        </ul>
                    </p>
                    <p>
                        <button className="default-btn small">검색</button>
                    </p>
                </form>
            </section>

            <section>
                <h2>대회 리스트</h2>
                <ul>
                    {raceList.map((race, index) => (
                        <li key={index}>
                            <RaceCard race={race}/>
                        </li>
                    ))}
                    {
                        raceList.length === 0 &&
                        <li className="full-row">
                            <Empty text="해당하는 대회가 없습니다." imgOn={true}/>
                        </li>
                    }
                </ul>
            </section>
        </Wrapper>
    );
}