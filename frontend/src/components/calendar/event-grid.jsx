/* eslint-disable react/prop-types */
import { format, getDay, getHours, getMinutes, isSameWeek } from "date-fns";

export default function EventGrid({
  days,
  events,
  weekStartsOn,
  locale,
  minuteStep,
  rowHeight,
  onEventClick,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
      }}
    >
      {(events || [])
        .filter((event) => isSameWeek(days[0].date, event.startDate))
        .map((event) => {
          const start = getHours(event.startDate) +1;
          const end = getHours(event.endDate) +2;
          const paddingTop = 0;
          const paddingBottom = 0

          return (
            <div
              key={event.id}
              className="relative flex mt-[1px] transition-all"
              style={{
                gridRowStart: start,
                gridRowEnd: end,
                gridColumnStart: getDay(event.startDate) - weekStartsOn + 1,
                gridColumnEnd: "span 1",
              }}
            >
                <span
                  className={`${event.reserved ? "bg-red-300" : "bg-blue-50"} ${event.reserved ? "" : "hover:bg-blue-100"} absolute inset-1 flex flex-col overflow-y-auto rounded-md p-2 text-xs leading-5 border border-transparent border-dashed transition cursor-pointer`}
                  style={{
                    top: paddingTop + 4,
                    bottom: paddingBottom + 4,
                  }}
                  onClick={!event.reserved ? () => onEventClick?.(event): ()=>{}}
                >
                  <p className="text-blue-500 leading-4">
                    {format(new Date(event.startDate), "H", {
                      weekStartsOn,
                      locale,
                    }) + ":00"}
                  </p>
                  {/* <p className="font-semibold text-blue-700">{event.title}</p> */}
                </span>
            </div>
          );
        })}
    </div>
  );
}
