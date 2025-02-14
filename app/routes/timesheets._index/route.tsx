import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import Paging from "~/components/paging";
import Calendar from "~/components/calender";
import type { Route } from "./+types/employee";
import { getNumberOfPageForPagination } from "../employees._index/route";


export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const searchKeywork = url.searchParams.get("searchkey") || "";

  const nbOfRows = 4;
  const offset = (+page - 1) * nbOfRows;

  const db = await getDB();
  const timesheetsCount = await db.all(
    "SELECT COUNT(*) AS TimesheetsCount FROM timesheets"
  );
  const timesheetsAndEmployees = await db.all(
    `SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id  ${
      searchKeywork != "" ? `WHERE full_name LIKE '%${searchKeywork}%'` : ""
    } LIMIT (?) OFFSET (?);`,
    [nbOfRows, offset]
  );

  const pageCount = getNumberOfPageForPagination(
    nbOfRows,
    timesheetsCount[0].TimesheetsCount
  );

  return { pageCount, timesheetsAndEmployees };
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const seachKeywork = formData.get("search");
  return redirect(`${seachKeywork != "" ? `?searchkey=${seachKeywork}` : ""}`);
};

export default function TimesheetsPage() {
  const [isTableView, setIsTableView] = useState(true); // State variable
  const { pageCount, timesheetsAndEmployees } = useLoaderData();

  return (
    <div>
      <div className="mb-3 mr-7 sm:mr-30 float-right">
        <a href="/timesheets/new" className="mr-2">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            New Timesheet
          </button>
        </a>
        <a href="/employees">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Employees
          </button>
        </a>
      </div>
      <div className="ml-10 mb-8">
        <button
          onClick={() => setIsTableView(true)}
          type="button"
          className={
            isTableView == true
              ? "text-blue-700 text-white mr-0 rounded-r-none border border-blue-700 bg-blue-500 ring-4 outline-none ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              : "text-blue-700 hover:text-white mr-0 rounded-r-none  border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          }
        >
          Table View
        </button>
        <button
          onClick={() => setIsTableView(false)}
          type="button"
          className={
            isTableView == false
              ? "text-blue-700 text-white rounded-l-none border border-blue-700 bg-blue-500 ring-4 outline-none ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              : "text-blue-700 hover:text-white rounded-l-none border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          }
        >
          Calendar View
        </button>
      </div>

      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {isTableView == true ? (
        <div className="w-full md:w-9/12 relative sm:ml-10 overflow-x-scroll sm:overflow-x-auto shadow-md rounded-lg">
          <Form
            method="post"
            className="max-w-md  min-w-full px-10  py-5 bg-white"
          >
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  name="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-300 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="search by user name"
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </Form>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Start Time</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">End Time</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit/View</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {timesheetsAndEmployees.map((timesheet: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {timesheet.full_name}
                  </th>
                  <td className="px-6 py-4">{timesheet.start_time}</td>
                  <td className="px-6 py-4">{timesheet.end_time}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={"/timesheets/" + timesheet.id}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit/View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paging count={pageCount} />
        </div>
      ) : (
        <div className="w-full md:w-9/12 relative sm:ml-10 overflow-x-scroll sm:overflow-x-auto shadow-md rounded-lg">
          <Calendar timesheetsAndEmployees={timesheetsAndEmployees} />
        </div>
      )}
    </div>
  );
}
