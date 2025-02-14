import {
  data,
  Form,
  redirect,
  useFetcher,
  useLoaderData,
  useParams,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";
import type { Route } from "./+types/employee";
import TimesheetForm from "~/components/timesheet_form";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const timesheet_id = formData.get("timesheet_id");
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
    "Update timesheets set employee_id=(?),start_time=(?),end_time=(?),work_summary=(?) WHERE id=(?)",
    [employee_id, start_time, end_time, work_summary, timesheet_id]
  );
  return redirect("/timesheets");
};

export async function loader({ params }: Route.LoaderArgs) {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  const timesheetAnEmployee = await db.all(
    "SELECT timesheets.start_time, timesheets.end_time, timesheets.work_summary, timesheets.id AS timesheet_id,employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE timesheet_id=(?)",
    [params.timesheetId]
  );

  return { employees, timesheetAnEmployee };
}

export default function TimesheetPage() {
  const { employees, timesheetAnEmployee } = useLoaderData(); // Used to create a select input
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  return (
    <div>
      <div>
        <fetcher.Form
          method="post"
          className="max-w-xl mx-auto my-0 sm:my-20 sm:ml-10 p-12 bg-white shadow-md rounded"
        >
          <TimesheetForm
            isEdit={true}
            errors={errors}
            employees={employees}
            timesheetAnEmployee={timesheetAnEmployee[0]}
          />
        </fetcher.Form>
      </div>
    </div>
  );
}
