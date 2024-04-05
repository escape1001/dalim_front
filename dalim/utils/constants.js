export const location_city_list = [
    {"value":"seoul", "label":"서울"},
    {"value":"gyeonggi", "label":"경기"},
    {"value":"gangwon", "label":"강원"},
    {"value":"chungcheong", "label":"충청"},
    {"value":"jeolla", "label":"전라"},
    {"value":"gyeongsang", "label":"경상"},
    {"value":"jeju", "label":"제주"},
    {"value":"etc", "label":"기타"}
];

export let meet_time_list = [];
for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
        let period = hour < 12 ? "AM" : "PM";
        let displayHour = hour % 12 || 12;
        let displayMinute = minute.toString().padStart(2, '0');
        let timeString = `${displayHour}:${displayMinute} ${period}`;
        meet_time_list.push(timeString);
    }
}

export const week_list = [
    {"value":"mon", "label":"월"},
    {"value":"tue", "label":"화"},
    {"value":"wed", "label":"수"},
    {"value":"thu", "label":"목"},
    {"value":"fri", "label":"금"},
    {"value":"sat", "label":"토"},
    {"value":"sun", "label":"일"}
];