import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
let ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { location_city_list, meet_time_list, week_list } from "../../../utils/constants";
import { AuthContext } from "../../../context/authContext";


const Wrapper = styled.main`
    padding: var(--default-page-padding);

    section h2{
        font-size: var(--font-size-bigger);
        padding-bottom: 3rem;
    }
`;

export default function CrewForm(){
    const router = useRouter();
    const { crew_id } = router.query;
    const {user, refreshToken} = useContext(AuthContext);
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

    const addCrew = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const description = quillRef.current.getEditor().root.innerHTML;
        formData.set('description', description);
        // 값이 blank인 input은 제외
        for (var pair of formData.entries()) {
            if (pair[1] === ""){
                formData.delete(pair[0]);
            }
        }
        
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/manage/${crew_id ? "/"+crew_id : ""}/`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('dalim_access')}`
        };
        const response = await fetch(url, {
            headers: headers,
            method: crew_id ? "PATCH":"POST",
            body: formData
        });

        if (response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await addCrew();
        } else if (response.status === 201) {
            alert("크루가 등록되었습니다.");
            router.push("/manage/crew");
        } else if (response.status === 200) {
            alert("크루가 수정되었습니다.");
            router.push("/manage/crew");
        } else if (response.status === 404) {
            alert("크루 등록/수정 권한이 없습니다.");
        } else {
            alert("크루 등록/수정에 실패했습니다.");
            console.log(response);
        }
    };

    const getCrewInfo = async()=>{
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/${crew_id}`;
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('dalim_access')}`
        }
        const response = await fetch(url, {
            headers: headers,
            method: "GET"
        });
        const data = await response.json();
        
        if (response.status === 401) {
            console.log("토큰 재요청");
            await refreshToken();
            await getCrewInfo();
        } else if (response.status === 200) {
            setCrew(data);
            setValue(data.description);
        } else {
            alert("크루 정보를 가져오는데 실패했습니다.");
        }
    };

    useEffect(() => {
        if (!user){
            alert("로그인이 필요합니다.");
        } else if (user.user_type !== "crew"){
            alert("크루 관리 페이지는 크루만 접근 가능합니다.");
        }

        if (crew_id) {
            getCrewInfo();
        }
    },[crew_id])
    
    return(
        <Wrapper className="center-content">
            <section>
                <h2>크루 {crew_id ? "수정" : "등록"}</h2>
                <form className="default-form grey" onSubmit={addCrew}>
                    <ul>
                        <li>
                            <label>크루명</label>
                            <input name="name" placeholder={crew?.name}/>
                        </li>
                        <li>
                            <label>활동지역</label>
                            <select name="location_city" required>
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
                            <input title="location_district" name="location_district" placeholder={crew?.location_district} maxLength={30}/>
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
                                                onChange={(e) => {
                                                    if (e.target.checked){
                                                        setCrew({...crew, meet_days: [...crew.meet_days, e.target.value]});
                                                    } else {
                                                        setCrew({...crew, meet_days: crew.meet_days.filter((d) => d !== e.target.value)});
                                                    }
                                                }}
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
                                            value={time.value}
                                            selected={crew?.meet_time == time.value}
                                        >
                                            {time.label}
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
                            <input type="link" name="sns_link" placeholder={crew?.sns_link}/>
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