import { getDB } from "~/db/getDB";
import { useLoaderData, Form, redirect, useFetcher, data } from "react-router";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  return { employees };
}

import type { ActionFunction } from "react-router";
import TimesheetForm from "~/components/timesheet_form";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time: any = formData.get("start_time");
  const end_time: any = formData.get("end_time");
  const work_summary = formData.get("work_summary");

  const errors: any = {};

  if (start_time >= end_time) {
    errors.datetime = "End time must be greater than start time";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  const db = await getDB();
  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time,work_summary) VALUES (?, ?, ?, ?)",
    [employee_id, start_time, end_time, work_summary]
  );

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); // Used to create a select input
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  return (
    <div>
      <fetcher.Form
        method="post"
        className="max-w-xl mx-auto my-0 sm:my-20 sm:ml-10 p-12 bg-white shadow-md rounded"
      >
        <TimesheetForm errors={errors} employees={employees} />
      </fetcher.Form>
    </div>
  );
}
