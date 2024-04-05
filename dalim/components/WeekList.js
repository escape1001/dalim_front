export default function WeekList({days}) {
  const dayList = {
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
    sun: '일',
  }

  return Object.entries(dayList).map(([key, value], index) => (
    <li key={index} className={days?.includes(key) ? "on" : ""}>{value}</li>
  ))
}
