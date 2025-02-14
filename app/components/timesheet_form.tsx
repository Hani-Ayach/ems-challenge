export default function TimesheetForm({
  errors,
  isEdit,
  employees,
  timesheetAnEmployee,
}: any) {
  return (
    <>
      <h3 className="text-center text-3xl font-bold dark:text-blue-600">
        {!isEdit
          ? "Add New Timesheet"
          : "The Employee " + timesheetAnEmployee.full_name + " Details"}
      </h3>
      <hr className="w-48 h-1 mx-auto my-10 bg-blue-200 border-0 rounded-sm md:my-10 dark:bg-blue-500" />

      <div className="mb-10 grid md:grid-cols-1 md:gap-8">
        <input
          type="number"
          name="timesheet_id"
          id="timesheet_id"
          defaultValue={timesheetAnEmployee?.timesheet_id}
          hidden
        />
        <div>
          <label
            htmlFor="employee_id"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Employee Name
          </label>
          <select
            name="employee_id"
            id="employee_id"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={timesheetAnEmployee?.employee_id}
            required
          >
            <option value="">Select One</option>
            {employees.map((emp: any) => {
              return <option value={emp.id}>{emp.full_name}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="mb-12 grid md:grid-cols-2 md:gap-8">
        <div>
          <label
            htmlFor="start_date"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            defaultValue={timesheetAnEmployee?.start_time}
            required
          />
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            defaultValue={timesheetAnEmployee?.end_time}
            required
          />
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-1 md:gap-8">
        <div>
          <label
            htmlFor="work_summary"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Your Job Summary
          </label>
          <textarea
            id="work_summary"
            name="work_summary"
            rows={3}
            className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            defaultValue={timesheetAnEmployee?.work_summary}
          ></textarea>
        </div>
      </div>
      {!!errors ? (
        <div
          className="flex items-center p-4 mb-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            {Object.entries(errors).map(([key, error]) => (
              <>
                {" "}
                <span className="font-medium">Invalid Input</span> {error}
              </>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pl-12 sm:pl-0">
        <button
          type="submit"
          className="mb-5 sm:mb-0 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {!isEdit ? "Create Timesheet" : "Update Timesheeet"}
        </button>
        <a href="/employees" className="mr-2 sm:ml-4">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Employees
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
    </>
  );
}
