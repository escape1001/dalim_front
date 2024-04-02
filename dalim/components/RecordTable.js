import styled from "styled-components";

const Wrapper = styled.table`
    .btn-area{
        display: inline-flex;
        gap: 1rem;
    }
`;

export default function RecordTable({record}) {
    const patchRecord = (record) => {
        // prompt로 수정할 값 입력받기. 숫자만 입력받도록 유효성 검사
        const mod_record = prompt(`기존 기록은 ${record.distance}m 입니다. 수정할 값을 입력해주세요.`);

        if (mod_record === null) return;
        
        if (isNaN(mod_record)) {
            alert("숫자만 입력해주세요.");
            return;
        } else {
            // 수정 요청 [TO DO : /accounts/mypage/record/<int:record_id> PATCH 요청]
            const data = {
                id:record.is,
                distance: parseInt(mod_record)
            }
        }        
    };
    
    const deleteRecord = (record) => {
        // confirm으로 삭제 여부 확인
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        
        if(isDelete){
            // 삭제 요청 [TO DO : /accounts/mypage/record/<int:record_id> DELETE 요청]
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
                    record.map((item, index) => {
                        return (
                        <tr key={index}>
                            <td>{item.created_at}</td>
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
                    record.length === 0 &&
                    <tr>
                        <td colSpan="4">아직 기록이 없습니다.</td>
                    </tr>
                }
            </tbody>
        </Wrapper>
    );
}