import { useEffect, useState } from "react";
import styled from "styled-components";
import CrewCard from "../../components/CrewCard";


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

    .search-area form input[type=text],
    .search-area form select{
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

export default function CrewList(){
    const [crewList, setCrewList] = useState([]);

    useEffect(() => {
        // [TO DO] 서버에 요청을 보내서 crew_list 받아와야 함
        // GET /crews/
        const crew_list_mock = [
                {
                    id : 1,
                    name : "멋있는 크루",
                    member_count : 5,
                    thumbnail_image : "https://example.com/image.jpg",
                    is_favorite : false,
                    location_city : "서울",
                    location_district : "강남구",
                    meet_days : ["mon", "wed", "fri"],
                    meet_time : "07:00 PM",
                },
                {
                    id : 1,
                    name : "멋있는 크루",
                    member_count : 5,
                    thumbnail_image : "https://example.com/image.jpg",
                    is_favorite : false,
                    location_city : "서울",
                    location_district : "강남구",
                    meet_days : ["mon", "wed", "fri"],
                    meet_time : "07:00 PM",
                },
            ];

        setCrewList(crew_list_mock);
    },[])

    const searchSubmit = (e) => {
        e.preventDefault();

        const search = e.target.search.value;
        const location_city = e.target.location_city.value;
        const meet_days = Array.from(e.target.meet_days).filter((el) => el.checked).map((el) => el.value).join(",");
        const query_string = (search ? `search=${search}` : "") + (location_city ? `&location_city=${location_city}` : "") + (meet_days ? `&meet_days=${meet_days}` : "");

        if(query_string){
            // [TO DO] 서버에 요청을 보내서 검색 결과를 받아와야 함
            // GET /crews/?search=검색어&location_city=지역&meet_days=요일
            console.log(query_string);
            //setCrewList(검색결과);
        }
    };
    
    return(
        <Wrapper className="center-content">
            <section className="search-area">
                <h2>검색 필터</h2>
                <form onSubmit={searchSubmit}>
                    <p>
                        <label htmlFor="crew_name">크루명</label>
                        <input id="crew_name" name="search" type="text" placeholder="크루명을 입력해주세요" maxLength={100}/>
                    </p>
                    <p>
                        <label htmlFor="location_city">지역</label>
                        <select name="location_city">
                            <option value=''>대분류 선택</option>
                            <option value='seoul'>서울</option>
                            <option value='gyeonggi'>경기</option>
                            <option value='gangwon'>강원</option>
                            <option value='chungcheong'>충청</option>
                            <option value='jeolla'>전라</option>
                            <option value='gyeongsang'>경상</option>
                            <option value='jeju'>제주</option>
                            <option value='etc'>기타</option>
                        </select>
                    </p>
                    <p>
                        <label>정기런 요일</label>
                        <ul>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="mon"/>
                                    월
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="tue"/>
                                    화
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="wed"/>
                                    수
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="thu"/>
                                    목
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="fri"/>
                                    금
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="sat"/>
                                    토
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input name="meet_days" type="checkbox" value="sun"/>
                                    일
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
                <h2>크루 리스트</h2>
                <ul>
                    {crewList.map((crew, index) => (
                        <li key={index}>
                            <CrewCard crew={crew}/>
                        </li>
                    ))}
                </ul>
            </section>
        </Wrapper>
    );
}