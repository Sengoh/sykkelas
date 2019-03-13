import { connection } from './mysql_connection';

class AnsatteService {
  getAnsatte(success) {
    connection.query('select * from ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getAnsatt(epost, passord, success) {
    connection.query('select * from ansatte where epost=? and passord=?', [epost, passord], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getKunde(brukerid, success) {
    connection.query('select * from kunder where brukerid=?', [brukerid], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
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
export let kundeService = new KundeService();

// class BestillingService {
//   get
// }
