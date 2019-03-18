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
}

class BestillingService{
  addKunder(fornavn, etternavn, epost, addresse, postnr, poststed, telefon, success) {
    connection.query("INSERT INTO kunder (fornavn, etternavn, epost, addresse, postnr, poststed, telefon) VALUES (?,?,?,?,?,?,?)", [fornavn, etternavn, epost, addresse, postnr, poststed, telefon], (error, results) => {
      if(error) return console.error(error);
    });
  }

  getKunde(success) {
    connection.query("select @@IDENTITY as 'IDENTITY'", (error, results) => {
      if(error) return console.error(error);
      success(results[0]);
    });
  }

  addLeietaker(start, slutt, current, hentested, leveringssted) {
    connection.query("INSERT INTO leietaker (start, slutt, kunder_brukerid, ansatte_ansattid, hentested, leveringssted ) VALUES (?,?,?,1,?,?)", [start, slutt, current, hentested, leveringssted], (error, results) => {
      if(error) return console.error(error);
    });
  }
}
export let ansatteService = new AnsatteService();
export let bestillingService = new BestillingService();
