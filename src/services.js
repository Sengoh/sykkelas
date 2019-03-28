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

  getBest(leieid, success) {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) as antall, if(GROUP_CONCAT(`sykler_sykkelid`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykler_sykkelid`) ) as sykkelid, if(GROUP_CONCAT(`sykkeltype`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykkeltype`) ) as sykkeltype, if(GROUP_CONCAT(`utstyr_utstyrid`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyr_utstyrid`) ) as utstyrid, if(GROUP_CONCAT(`utstyrtype`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyrtype`) ) as utstyrtype, sted FROM leietaker l JOIN kunder k on l.kunder_brukerid=k.brukerid LEFT JOIN leietaker_has_sykler ls on l.leieid=ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu on l.leieid=lu.leietaker_leieid LEFT JOIN sykler s on ls.sykler_sykkelid=s.id LEFT JOIN utstyr u on lu.utstyr_utstyrid=u.utstyrid JOIN sted on l.hentested=sted.stedid WHERE leieid=? GROUP BY leieid', [leieid],
      (error, results) => {
        if (error) return console.error(error);

        success(results)
      }
    )
  }
  getBest1() {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) as antall, if(GROUP_CONCAT(`sykler_sykkelid`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykler_sykkelid`) ) as sykkelid, if(GROUP_CONCAT(`sykkeltype`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykkeltype`) ) as sykkeltype, if(GROUP_CONCAT(`utstyr_utstyrid`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyr_utstyrid`) ) as utstyrid, if(GROUP_CONCAT(`utstyrtype`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyrtype`) ) as utstyrtype, sted FROM leietaker l JOIN kunder k on l.kunder_brukerid=k.brukerid LEFT JOIN leietaker_has_sykler ls on l.leieid=ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu on l.leieid=lu.leietaker_leieid LEFT JOIN sykler s on ls.sykler_sykkelid=s.id LEFT JOIN utstyr u on lu.utstyr_utstyrid=u.utstyrid JOIN sted on l.hentested=sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        success(results)
      }
    )
  }
  updateBest() {
  connection.query("insert into leietaker (start,slutt,kunder_brukerid,ansatte_ansattid,hentested,leveringssted) values (?,?,?,?,?,?)",[start,slutt,kunde,ansatt,hente,levere],
      (error, results) => {
        if (error) return console.error(error);

        success(results)
      }
    )
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



class BicycleService {
  getBikes(success) {
    connection.query('select * from sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBike(id, success) {
    connection.query('select * from sykler where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateBike(sykler, success) {
    connection.query(
      'update sykler set status=? where id=?',
      [sykler.status, sykler.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addBike(merke, modell, type, status) {
    connection.query(
      'insert into sykler set merke=?, modell=?, type=?, status=?',
      [merke, modell, type, status],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}

export let bikeService = new BicycleService();
export let ansatteService = new AnsatteService();
export let kundeService = new KundeService();
export let bestillingService = new BestillingService();
