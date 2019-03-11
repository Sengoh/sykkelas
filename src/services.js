import { connection } from './mysql_connection';

class AnsatteService {
  getAnsatte(success) {
    connection.query('select * from ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getAnsatt(epost,success) {
    connection.query('select * from ansatte where epost=?',[epost], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
export let ansatteService = new AnsatteService();
