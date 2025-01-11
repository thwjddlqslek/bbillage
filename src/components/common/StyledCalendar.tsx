import Calendar from "react-calendar";
import cStyles from "@/src/styles/Calendar.module.css";
import pStyle from "@/src/styles/Product.module.css";
import Button from "./Button";

interface StyledCalendarProps {
  onClose: () => void;
}

const StyledCalendar = ({ onClose }: StyledCalendarProps) => {
  return (
    <div className={cStyles.container}>
      <div className={cStyles.header}>
        <h3>대여 캘린더</h3>
        <span onClick={onClose}>x</span>
      </div>
      <Calendar locale="en" prev2Label={null} next2Label={null} />
      <Button
        className={`${pStyle["btn-base"]} ${pStyle["rental-btn"]}`}
        href="https://play.google.com/store/apps/details?id=app.dejay.village"
        target="_blank"
        text="선택한 기간으로 대여하기"
        ariaLabel="Google Play Store에서 앱 다운로드하기 (새 탭에서 열림)"
      />
    </div>
  );
};

export default StyledCalendar;
