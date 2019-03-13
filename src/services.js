import { connection } from './mysql_connection';

class AnsatteService {
  getAnsatte(success) {
    connection.query('select * from ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getAnsatt(epost,passord,success) {
    connection.query('select * from ansatte where epost=? and passord=?',[epost,passord], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
<<<<<<< HEAD




  getKunde(brukerid, success) {
    connection.query('select * from kunder where brukerid=?', [brukerid], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
=======
>>>>>>> parent of 55daa35... v1
}
class KundeService {
  getKunde(id, success) {
    connection.query('select * from kunder where brukerid=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}
export let ansatteService = new AnsatteService();
<<<<<<< HEAD
=======
export let kundeService = new KundeService();

// class BestillingService {
//   get
// }
>>>>>>> 0c2a19c7a3bb2c6ed9892c6ed7bb65b23e676592
