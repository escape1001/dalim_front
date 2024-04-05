import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
let ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { location_city_list, meet_time_list, week_list } from "../../../utils/constants";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section h2{
        font-size: var(--font-size-bigger);
        padding-bottom: 3rem;
    }

    ul{

    }
`;

export default function CrewForm(){
    const { crew_id } = useRouter().query;
    const [crew, setCrew] = useState();
    const [value, setValue] = useState();
    const quillRef = useRef();

    const modules = useMemo(() => {
        return {
          toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [
                    {
                    color: [],
                    },
                    { background: [] },
                ],
                ['link', 'image'],
                ['clean'],
            ],
          },
        };
    }, []);

    useEffect(() => {
        const crew_mock = {
            "id": 1,
            "name": "멋있는 크루",
            "location_city": "gangwon",
            "location_district": "강남구",
            "meet_days": ["mon", "wed", "fri"],
            "meet_time": "07:00 PM",
            "member_count": 5,
            "description": "함께 달리는 런닝 크루입니다.",
            "thumbnail_image": "https://picsum.photos/200",
            "sns_link": "https://example.com/running_crew"
        };

        if (crew_id) {
            // [TO DO] 서버에 요청을 보내서 crew_id에 해당하는 크루 정보를 가져와야 함
            setCrew(crew_mock);
        }
        setValue(crew_mock.description);
    },[crew_id])
    
    return(
        <Wrapper className="center-content">
            <section>
                <h2>크루 {crew_id ? "수정" : "등록"}</h2>
                <form className="default-form">
                    <ul>
                        <li>
                            <label>크루명</label>
                            <input name="name" value={crew?.name}/>
                        </li>
                        <li>
                            <label>활동지역</label>
                            <select name="location" required>
                                <option value=''>대분류 선택</option>
                                {
                                    location_city_list.map((city, index) => (
                                        <option
                                            key={index}
                                            value={city.value}
                                            selected={crew?.location_city === city.value}
                                        >
                                            {city.label}
                                        </option>
                                    ))                                    
                                }
                            </select>
                            <input title="location_district" name="location_district" value={crew?.location_district} maxLength={30}/>
                        </li>
                        <li>
                            <label>정기런 요일</label>
                            <ul className="checkbox-group">
                                {
                                    week_list.map((day, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                id={day.value}
                                                name="meet_days"
                                                value={day.value}
                                                checked={
                                                    crew?.meet_days.includes(day.value)
                                                }
                                            />
                                            <label htmlFor={day.value}>{day.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li>
                            <label>정기런 시간</label>
                            <select name="meet_time" required>
                                {
                                    meet_time_list?.map((time, index) => (
                                        <option
                                            key={index}
                                            value={time}
                                            selected={crew?.meet_time == time}
                                        >
                                            {time}
                                        </option>
                                    ))
                                }
                            </select>
                        </li>
                        <li>
                            <label>크루 대표 이미지</label>
                            <input type="file" name="thumbnail_image"/>
                        </li>
                        <li>
                            <label>크루 SNS</label>
                            <input type="link" name="sns_link" value={crew?.sns_link}/>
                        </li>
                        <li>
                            <label className="grow">크루 소개글</label>
                            <ReactQuill
                                modules={modules}
                                ref={quillRef}
                                theme="snow"
                                value={value}
                                onChange={setValue}
                            />
                        </li>
                        <li className="btn-area">
                            <button className="default-btn small" type="submit">제출</button>
                        </li>
                    </ul>
                </form>
            </section>
        </Wrapper>
    );
}