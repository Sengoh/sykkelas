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
    connection.query("select * from sykler where sykkeltype=? and status = 1 and tilgjengelig = 1 ORDER BY RAND() limit ?", [type,antall], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getUtstyr(type,antall,success) {
    connection.query("select * from utstyr where utstyrtype=? ORDER BY RAND() limit ?", [type,antall], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  insertLeie(start,slutt,kunde,ansatt,hente,levere,personer,success){
    connection.query("insert into leietaker (start,slutt,kunder_brukerid,ansatte_ansattid,hentested,leveringssted,personer) values (?,?,?,?,?,?,?)",[start,slutt,kunde,ansatt,hente,levere,personer],(error, results) => {
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
    connection.query("insert into leietaker_has_sykler (leietaker_leieid,sykler_sykkelid) values (?,?);update sykler set tilgjengelig=0 where id=?",[leier,sykkel,sykkel],(error,results) => {
    if (error) return console.error(error);

    success(results);
    })
  }
  insertUtstyr(leier,utstyr,success) {
    connection.query("insert into leietaker_has_utstyr (leietaker_leieid,utstyr_utstyrid) values (?,?)",[leier,utstyr],(error,results) => {
    if (error) return console.error(error);

    success(results);
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



  addLeietaker(start, slutt, current, hentested, leveringssted, personer) {
    connection.query("INSERT INTO leietaker (start, slutt, kunder_brukerid, ansatte_ansattid, hentested, leveringssted, personer ) VALUES (?,?,?,1,?,?,?)", [start, slutt, current, hentested, leveringssted, personer], (error, results) => {
      if(error) return console.error(error);
    });
  }



  finnSted(success) {
    connection.query("select * from sted;select * from lager;",(error,results) => {
      if(error) return console.error(error);

      success(results);
    });
  }

  getInfo(success) {
    connection.query("select count(case when sykkeltype = 'terreng' then 1 end) as terreng, count(case when sykkeltype = 'el' then 1 end) as tandem,count(case when sykkeltype = 'el' then 1 end) as el from sykler where tilgjengelig=1 and status=1;select * from utstyr;",(error,results) => {
      if(error) return console.error(error);

      success(results);
    });
  }
}
export let ansatteService = new AnsatteService();

class KundeService {
  getKunde(id, success) {
    connection.query('select * from kunder where brukerid=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  kvittering(id, success) {
    connection.query("select leieid,fornavn,etternavn,start,slutt,lager,sted from leietaker left join kunder on kunder_brukerid = brukerid left join lager on hentested = lagerid left join sted on leveringssted = stedid where leieid=?", [id],(error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  kvittering2(id, success) {
    connection.query("select sykler_sykkelid from leietaker_has_sykler where leietaker_leieid=?", [id],(error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  kvitteringSykler(id, success) {
    connection.query("SELECT kunder_brukerid, s.sykkeltype,count(s.sykkeltype) as t FROM  leietaker_has_sykler ls JOIN  sykler s ON ls.sykler_sykkelid = s.id JOIN  leietaker l ON ls.leietaker_leieid = l.leieid WHERE leieid=? GROUP BY s.sykkeltype", [id],(error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  kvitteringUtstyr(id, success) {
    connection.query("SELECT kunder_brukerid, u.utstyrtype,count(u.utstyrtype) as t FROM  leietaker_has_utstyr ls JOIN  utstyr u ON ls.utstyr_utstyrid = u.utstyrid JOIN  leietaker l ON ls.leietaker_leieid = l.leieid WHERE leieid=? GROUP BY u.utstyrtype", [id],(error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
// left join leietaker_has_sykler on leieid = leietaker_leieid left join leietaker_has_utstyr on leieid = leietaker_leieid left join sykler on sykler_sykkelid = sykler.id left join utstyr on utstyr_utstyrid = utstyrid

export let bestillingService = new BestillingService();


export let kundeService = new KundeService();


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
