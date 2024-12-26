import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, isBefore, setHours, setMinutes, startOfWeek } from "date-fns";

import { forms } from "../../data";

import modalStyles from "./modal.module.css";
import WeekView from "../calendar/weekview";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Modal(props) {
  const { handleAlterModalStatus, type = "" } = props || {};
  const [events, setEvents] = useState([]);

  const fetchWorkingHours = () => {
    fetch("http://localhost:3000/job/17", {method: "GET", credentials: "include"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dayJSday = dayjs().day();
        const currentDay = dayJSday === 0 ? 7 : dayJSday;
        const currentHour = dayjs().hour();
        const events = [];
        const today = dayjs();
        let dayAtCalendar = today;
        for (let i = 0; i < 30; i++) {
          for (const [dayNum, hours] of Object.entries(data.working_hours)) {
            if (
              Number(dayNum) !== dayAtCalendar.day() ||
              (today.isSame(dayAtCalendar, "week") && dayNum < currentDay)
            )
              continue;
            for (const [hourNum, hourData] of Object.entries(hours)) {
              // render only for next 30 days, no need for more
              if (today.isSame(dayAtCalendar, "D") && hourNum < currentHour)
                continue;
              if (hourData.available) {
                const dateStr = dayAtCalendar.format("YYYY-MM-DD")
                events.push({
                  id: `${hourData.id}/${dateStr}`,
                  startDate: setHours(dayAtCalendar, hourNum),
                  endDate: setHours(dayAtCalendar, hourNum),
                  reserved: !!data.reservations.find(
                    (r) => r.working_hour_id === hourData.id && r.date == dateStr
                  ),
                });
              }
            }
          }
          dayAtCalendar = dayAtCalendar.add(1, "day");
        }

        setEvents(events);
      });
  };
  useEffect(() => {
    fetch("http://localhost:3000/getDummySession", {
      method: "get"
    }).then((res) => {
      return res.json();
    });
    fetchWorkingHours();
  }, []);

  const makeReservation = ({ whId, date }) => {
    fetch("http://localhost:3000/reservation", {
      method: "POST",
      body: JSON.stringify({
        working_hour_id: Number(whId),
        date: date,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then(() => {
      fetchWorkingHours()
    });
  };

  return (
    <div className={modalStyles?.modal_wrapper}>
      <div>{type}</div>
      <div onClick={() => handleAlterModalStatus()}>
        <FontAwesomeIcon icon={forms?.jobs?.[type]?.closeIcon} />
      </div>
      {type === "calendar" && (
        <div style={{height: "80vh", width: "80vw"}}>
          <WeekView
            initialDate={new Date()}
            weekStartsOn={1}
            disabledCell={(date) => {
              return isBefore(date, new Date());
            }}
            disabledWeek={(startDayOfWeek) => {
              return isBefore(startDayOfWeek, startOfWeek(new Date()));
            }}
            minuteStep={60}
            events={events}
            onCellClick={(cell) => alert(`Clicked ${format(cell.date, "Pp")}`)}
            onEventClick={
              (event) => {
                console.log(event);
                const [whId, date] = event.id.split("/");
                console.log(event.id.split("/"))
                makeReservation({ whId, date });
              }
              // alert(
              //   `${event.title} ${format(event.startDate, "Pp")} - ${format(
              //     event.endDate,
              //     "Pp"
              //   )}`
              // )
            }
          />
        </div>
      )}
    </div>
  );
}
