import { useEffect, useState } from "react";
import styled from "styled-components";
import RaceCard from "../../components/RaceCard";


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
    const [raceList, setRaceList] = useState([]);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 race_list 받아와야 함
        // GET /races/?status='keyword'&q="대회이름"   (status 로 필터링) 
        const race_list_mock = [
            {
                id:2,
                status:"접수중/대회종료",
                d_day: 3,
                name : "양천마라톤",
                start_date: "2024/05/30",
                end_date: "2024/05/31",
                courses: ["full", "half", "5km"],
                thumbnail_image: "https://example.com/image.jpg",
                is_favorite: true
            }
        ];

        setRaceList(race_list_mock);
    },[])

    const searchSubmit = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const status = Array.from(e.target.status).filter((el) => el.checked).map((el) => el.value).join(",");
        const query_string = (search ? `search=${search}` : "") + (status ? `&status=${status}` : "");

        if(query_string){
            // [TO DO] 서버에 요청을 보내서 검색 결과를 받아와야 함
            // GET /crews/?search=검색어&location_city=지역&meet_days=요일
            console.log(query_string);
            //setRaceList(검색결과);
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
                                    <input name="status" type="checkbox" value="접수중"/>
                                    접수중
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="status" type="checkbox" value="접수예정"/>
                                    접수예정
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="status" type="checkbox" value="접수완료"/>
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
                </ul>
            </section>
        </Wrapper>
    );
}