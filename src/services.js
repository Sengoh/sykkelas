import { connection } from './mysql_connection';

class StudentService {
  getStudents(success) {
    connection.query('select * from Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    connection.query('select * from Students where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(id, name, email, success) {
    connection.query('update Students set name=?, email=? where id=?', [name, email, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let studentService = new StudentService();
