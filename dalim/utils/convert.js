import {location_city_list} from './constants';

// 2024-10-20 16:00:00, 2024/12/23.. 어떤 형식의 날짜가 들어와도 "2024/10/20" 형식으로 변환
export const convertDate = (date) => {
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');;
    const day = _date.getDate().toString().padStart(2, '0');;

    // 시간이 있는 경우 시간까지 표시. 시간은 00:00 형식으로 두자리수로 표시
    if (date?.includes('T')) {
        const hour = _date.getHours().toString().padStart(2, '0');
        const minute = _date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hour}:${minute}`;
    }
    return `${year}/${month}/${day}`;
};

// ["mon", "sat"]을 "월요일, 토요일"로 변경하는 함수
export const convertDayKorFull = (days) => {
    const dayList = {
        mon: '월요일',
        tue: '화요일',
        wed: '수요일',
        thu: '목요일',
        fri: '금요일',
        sat: '토요일',
        sun: '일요일',
    }

    return days.map(d => dayList[d]).join(', ');
};

// 지역명 "seoul"을 "서울"로 변경하는 함수
export const convertLocationKor = (location) => {
    return location_city_list.find(city => city.value === location).label;
};