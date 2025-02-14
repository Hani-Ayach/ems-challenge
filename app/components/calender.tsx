import {
  createViewDay,
  createViewWeek,
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import "../app.css";
import { useEffect, useState } from "react";
import "@schedule-x/theme-default/dist/index.css";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";

function formatDateTime(dateTime: string) {
  return dateTime.replace("T", " ").split(":").slice(0, 2).join(":"); // Removes seconds
}

export default function Calendar({ timesheetsAndEmployees }: any) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const events = timesheetsAndEmployees.map((timesheet: any, index: number) => {
    return {
      id: index + 1,
      title: timesheet.full_name,
      start: formatDateTime(timesheet.start_time),
      end: formatDateTime(timesheet.end_time),
    };
  });
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [...events],
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
