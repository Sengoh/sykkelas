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




  getKunde(brukerid, success) {
    connection.query('select * from kunder where brukerid=?', [brukerid], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getSykkel(type,antall,success) {
    connection.query("select * from sykler where type=? and status = 'i orden' and tilgjengelig = 1 ORDER BY RAND() limit ?", [type,antall], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  insertLeie(start,slutt,kunde,ansatt,hente,levere,success){
    connection.query("insert into leietaker (start,slutt,kunder_brukerid,ansatte_ansattid,hentested,leveringssted) values (?,?,?,?,?,?)",[start,slutt,kunde,ansatt,hente,levere],(error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  getPrevious(success) {
    connection.query("SELECT @@IDENTITY AS 'IDENTITY'",(error,results) => {
    if (error) return console.error(error);

    success(results[0]);
    })
  }
  insertSykkel(leier,sykkel,success) {
    connection.query("insert into leietaker_has_sykler (leietaker_leieid,sykler_sykkelid) values (?,?)",[leier,sykkel],(error,results) => {
    if (error) return console.error(error);

    success(results[0]);
    })
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
    connection.query("INSERT INTO leietaker (start, slutt, kunder_brukerid, ansatte_ansattid, hentested, leveringssted, personer ) VALUES (?,?,?,1,?,?, 1)", [start, slutt, current, hentested, leveringssted], (error, results) => {
      if(error) return console.error(error);
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
export let bestillingService = new BestillingService();

export let kundeService = new KundeService();
