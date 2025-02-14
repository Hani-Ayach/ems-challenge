import {
  data,
  Form,
  redirect,
  useFetcher,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";
import EmployeeForm from "~/components/employee_form";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const date_of_birthday: any = formData.get("date_of_birthday");
  const job_title = formData.get("job_title");
  const department_name = formData.get("department_name");
  const salary: any = formData.get("salary");
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");

  const minSalary = 1000;
  const errors: any = {};

  const today = new Date().getFullYear();
  const dateofbirth = new Date(date_of_birthday).getFullYear();

  if (today - dateofbirth < 18)
    errors.date_of_birthday = "The employee age must be greater than 18 old";

  if (salary < minSalary)
    errors.salary = "The salary must be equal or greater than 1000$";

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  const db = await getDB();
  await db.run(
    "INSERT INTO employees (full_name,email,phone_number,date_of_birthday,job_title,department_name,salary,start_date,end_date) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      full_name,
      email,
      phone_number,
      date_of_birthday,
      job_title,
      department_name,
      salary,
      start_date,
      end_date,
    ]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  return (
    <div>
      <fetcher.Form
        method="post"
        className="max-w-xl mx-auto my-0 sm:my-20 sm:ml-10 p-12 bg-white shadow-md rounded"
      >
        <EmployeeForm errors={errors} />
      </fetcher.Form>

      <hr className="w-48 h-1 mx-auto my-10 bg-blue-200 border-0 rounded-sm md:my-10 dark:bg-blue-500" />

      <div className="ml-10">
        <a
          href="/employees"
          className="ml-6 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Employees
        </a>
        <a
          href="/timesheets"
          className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Timesheets
        </a>
      </div>
    </div>
  );
}
