export default function EmployeeForm({ isEdit, employee, errors }: any) {
  return (
    <>
      <h3 className="text-center text-3xl font-bold dark:text-blue-600">
        {!isEdit
          ? "Add New Employee"
          : "The Employee " + employee?.full_name + " Details"}
      </h3>
      <hr className="w-48 h-1 mx-auto my-10 bg-blue-200 border-0 rounded-sm md:my-10 dark:bg-blue-500" />
      <div className="mb-10 grid md:grid-cols-2 md:gap-8">
        <input
          type="number"
          name="employee_id"
          id="employee_id"
          value={employee?.id}
          hidden
        />
        <div>
          <label
            htmlFor="full_name"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="full name"
            defaultValue={employee?.full_name}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@gmail.com"
            defaultValue={employee?.email}
            required
          />
        </div>
      </div>

      <div className="mb-10 grid md:grid-cols-2 md:gap-8">
        <div>
          <label
            htmlFor="phone_number"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            pattern="+[0-9]{3} [0-9]{6}"
            name="phone_number"
            id="phone_number"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="+961 76616161"
            defaultValue={employee?.phone_number}
            required
          />
        </div>
        <div>
          <label
            htmlFor="date_of_birthday"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Date of Birthday
          </label>
          <input
            type="date"
            name="date_of_birthday"
            id="date_of_birthday"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            defaultValue={employee?.date_of_birthday}
            required
          />
        </div>
      </div>

      <div className="mb-10 grid md:grid-cols-2 md:gap-8">
        <div>
          <label
            htmlFor="job_title"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Job Title
          </label>
          <input
            type="text"
            name="job_title"
            id="job_title"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="job title"
            defaultValue={employee?.job_title}
            required
          />
        </div>
        <div>
          <label
            htmlFor="department_name"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Department
          </label>
          <select
            name="department_name"
            id="department_name"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={employee?.department_name}
            required
          >
            <option value="">Select One</option>
            <option value="Development">Development</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>

      <div className="mb-12 grid md:grid-cols-2 md:gap-8">
        <div>
          <label
            htmlFor="start_date"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            defaultValue={employee?.start_date}
            required
          />
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            defaultValue={employee?.end_date}
          />
        </div>
        <div className="mb-6 grid md:grid-cols-2 md:gap-8">
          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-black"
            >
              Salary
            </label>
            <input
              type="number"
              name="salary"
              placeholder="1000"
              className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
              defaultValue={employee?.salary}
            />
          </div>

          <div></div>
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
          {!isEdit
            ? "Create Employee"
            : "Update " + employee.full_name + " Info"}
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
