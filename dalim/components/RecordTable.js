import styled from "styled-components";
import { convertDate } from "../utils/convert";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Wrapper = styled.table`
    .btn-area{
        display: inline-flex;
        gap: 1rem;
    }
`;

export default function RecordTable({record, getUserInfo, getRecordList}) {
    const {user, refreshToken} = useContext(AuthContext);
    const patchRecord = async (record) => {
        const mod_record = prompt(`기존 기록은 ${record?.distance}m 입니다. 수정할 값을 입력해주세요.`);

        if (mod_record === null) return;
        
        if (isNaN(mod_record)) {
            alert("숫자만 입력해주세요.");
            return;
        } else {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/record/${record.id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
                "Content-Type": "application/json",
            };
        
            const data = {
                id:record?.id,
                distance: parseInt(mod_record)
            }

            const response = await fetch(url, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(data),
            });

            if (user && response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await patchRecord(record);
            } else if (response.status === 200) {
                const data = await response.json();
                getUserInfo();
                getRecordList(data);
            } else {
                alert("수정에 실패했습니다.");
                console.log(response);
            }            
        }        
    };
    
    const deleteRecord = async (record) => {
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/accounts/mypage/record/${record.id}/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("dalim_access")}`,
            };
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });

            if (user && response.status === 401) {
                console.log("토큰 재요청");
                await refreshToken();
                await deleteRecord(record);
            } else if (response.status === 204) {
                getUserInfo();
                getRecordList();
            } else {
                alert("삭제에 실패했습니다.");
                console.log(response);
            }
        }
    };

    return (
        <Wrapper className="default-table">
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>활동명</th>
                    <th>거리</th>
                    <th>수정</th>
                </tr>
            </thead>
            <tbody>
                {
                    record?.map((item, index) => {
                        return (
                        <tr key={index}>
                            <td>{convertDate(item.created_at)}</td>
                            <td>{item.description}</td>
                            <td>{item.distance}m</td>
                            <td>
                                <div className="btn-area">
                                    <button className="default-btn line small" onClick={()=>{patchRecord(item);}}>수정하기</button>
                                    <button className="default-btn line small" onClick={()=>{deleteRecord(item);}}>삭제하기</button>
                                </div>
                            </td>
                        </tr>
                        )
                    })
                }
                {
                    record?.length === 0 &&
                    <tr>
                        <td colSpan="4">아직 기록이 없습니다.</td>
                    </tr>
                }
            </tbody>
        </Wrapper>
    );
}