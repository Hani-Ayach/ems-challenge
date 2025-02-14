import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";
import Paging from "~/components/paging";
import type { Route } from "./+types/employee";


export function getNumberOfPageForPagination(
  nbOfRows: number,
  dataCount: number
) {
  var pageCount = 0;
  var modulo = dataCount % nbOfRows;
  if (modulo != 0 && dataCount < nbOfRows) pageCount += 1;
  else if (modulo != 0 && dataCount > nbOfRows)
    pageCount = (dataCount - modulo) / nbOfRows + 1;
  else pageCount = dataCount / nbOfRows;

  return pageCount;
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const searchKeywork = url.searchParams.get("searchkey") || "";
  const orderby = url.searchParams.get("orderby") || "";

  const nbOfRows = 4;
  const offset = (+page - 1) * nbOfRows;

  const db = await getDB();
  const employeesCount = await db.all(
    `SELECT COUNT(*) AS EmployeesCount FROM employees ${
      searchKeywork != "" ? `WHERE email LIKE '%${searchKeywork}%'` : ""
    }`
  );
  const employees = await db.all(
    `SELECT * FROM employees ${
      searchKeywork != "" ? `WHERE email LIKE '%${searchKeywork}%'` : ""
    } ${orderby != "" ? `ORDER BY ${orderby}` : ""} LIMIT (?) OFFSET (?);`,
    [nbOfRows, offset]
  );
  const pageCount = getNumberOfPageForPagination(
    nbOfRows,
    employeesCount[0].EmployeesCount
  );

  return { pageCount, employees };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const seachKeywork = formData.get("search");
  return redirect(`${seachKeywork != "" ? `?searchkey=${seachKeywork}` : ""}`);
};

export default function EmployeesPage() {
  const { pageCount, employees }: any = useLoaderData();

  return (
    <>
      <div className="mb-8 sm:mr-30 float-right">
        <a href="/employees/new" className="mr-2">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            New Employee
          </button>
        </a>
        <a href="/timesheets">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Timesheets
          </button>
        </a>
      </div>
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
                placeholder="search by user email"
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
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Email</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Department
                  <a href="?orderby=department_name">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Job Title</div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Start Day
                  <a href="?orderby=start_date">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit/View</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.full_name}
                </th>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.department_name}</td>
                <td className="px-6 py-4">{employee.job_title}</td>
                <td className="px-6 py-4">{employee.start_date}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={"/employees/" + employee.id}
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
    </>
  );
}
