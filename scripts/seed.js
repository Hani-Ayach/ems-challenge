import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: 'John Doe',
    email:'test@gmail.com',
    phone_number:'76666666',
    date_of_birthday:'',
    job_title:'Full Stack Developer',
    department_name:'Development',
    salary:500,
    start_date:'2025-02-11',
    end_date:''
  },
  {
    full_name: 'Jane Smith',
    email:'test@gmail.com',
    phone_number:'76666666',
    date_of_birthday:'',
    job_title:'Full Stack Developer',
    department_name:'Development',
    salary:500,
    start_date:'2025-02-11',
    end_date:''
  },
  {
    full_name: 'Alice Johnson',
    email:'test@gmail.com',
    phone_number:'76666666',
    date_of_birthday:'',
    job_title:'Full Stack Developer',
    department_name:'Development',
    salary:500,
    start_date:'2025-02-11',
    end_date:''
  },
];

const timesheets = [
  {
    employee_id: 1,
    work_summary:'some tasks',
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
  },
  {
    employee_id: 2,
    work_summary:'some tasks',
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
  },
  {
    employee_id: 3,
    work_summary:'some tasks',
    start_time: '2025-02-12 07:00:00',
    end_time: '2025-02-12 16:00:00',
  },
];


const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

