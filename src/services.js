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

  getLogin(id,success) {
    connection.query('select * from ansatte where ansattid=?',[id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
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
  getSykkel1(type,success) {
    connection.query("select * from sykler where sykkeltype=? and status = 1 and tilgjengelig = 1 ORDER BY RAND()", [type], (error, results) => {
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
  getUtstyr1(type,success) {
    connection.query("select * from utstyr where utstyrtype=? ORDER BY RAND()", [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  insertLeie(start,slutt,kunde,ansatt,hente,levere,personer,success){
    connection.query("insert into leietaker (start,slutt,kunder_brukerid,ansatte_ansattid,hentested,leveringssted,personer,registrert) values (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)",[start,slutt,kunde,ansatt,hente,levere,personer],(error, results) => {
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
  getKundeId(fn, en, epost, tlf, success) {
    connection.query("SELECT brukerid FROM kunder WHERE fornavn=? AND etternavn=? AND epost=? AND telefon=?", [fn, en, epost, tlf], (error, results) => {
      if(error) return console.error(error);
      success(results[0]);
    });
  }
  getLeieId(bid, success) {
    connection.query("SELECT leieid FROM leietaker WHERE kunder_brukerid=?", [bid], (error, results) => {
      if(error) return console.error(error);
      success(results[0]);
    });
  }



  addLeietaker(start, slutt, current, hentested, leveringssted, personer) {
    connection.query("INSERT INTO leietaker (start, slutt, kunder_brukerid, ansatte_ansattid, hentested, leveringssted, personer ) VALUES (?,?,?,1,?,?,?)", [start, slutt, current, hentested, leveringssted, personer], (error, results) => {
      if(error) return console.error(error);
    });
  }

  addLeietakerNyK(start, slutt, bid, hentested, leveringssted, personer) {
    connection.query("INSERT INTO leietaker (start, slutt, kunder_brukerid, ansatte_ansattid, hentested, leveringssted, personer ) VALUES (?,?,?,1,?,?,?)", [start, slutt, bid, hentested, leveringssted, personer], (error, results) => {
      if(error) return console.error(error);
    });
  }



  finnSted(success) {
    connection.query("select * from sted;select * from lager;",(error,results) => {
      if(error) return console.error(error);

      success(results);
    });
  }


  getBest(leieid, success) {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) AS antall, IF( GROUP_CONCAT(`sykler_sykkelid`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykler_sykkelid`) ) AS sykkelid, IF( GROUP_CONCAT(`sykkeltype`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykkeltype`) ) AS sykkeltype, IF( GROUP_CONCAT(`utstyr_utstyrid`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyr_utstyrid`) ) AS utstyrid, IF( GROUP_CONCAT(`utstyrtype`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyrtype`) ) AS utstyrtype, lager, sted, start, slutt, personer FROM leietaker l JOIN kunder k ON l.kunder_brukerid = k.brukerid LEFT JOIN leietaker_has_sykler ls ON l.leieid = ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu ON l.leieid = lu.leietaker_leieid LEFT JOIN sykler s ON ls.sykler_sykkelid = s.id LEFT JOIN utstyr u ON lu.utstyr_utstyrid = u.utstyrid JOIN lager ON l.hentested = lager.lagerid JOIN sted ON l.leveringssted = sted.stedid WHERE leieid=? GROUP BY leieid', [leieid],
      (error, results) => {
        if (error) return console.error(error);

        success(results)
      }
    )
  }
  getAllBest(success) {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) AS antall, IF( GROUP_CONCAT(`sykler_sykkelid`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykler_sykkelid`) ) AS sykkelid, IF( GROUP_CONCAT(`sykkeltype`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykkeltype`) ) AS sykkeltype, IF( GROUP_CONCAT(`utstyr_utstyrid`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyr_utstyrid`) ) AS utstyrid, IF( GROUP_CONCAT(`utstyrtype`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyrtype`) ) AS utstyrtype, lager, sted, start, slutt FROM leietaker l JOIN kunder k ON l.kunder_brukerid = k.brukerid LEFT JOIN leietaker_has_sykler ls ON l.leieid = ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu ON l.leieid = lu.leietaker_leieid LEFT JOIN sykler s ON ls.sykler_sykkelid = s.id LEFT JOIN utstyr u ON lu.utstyr_utstyrid = u.utstyrid JOIN lager ON l.hentested = lager.lagerid JOIN sted ON l.leveringssted = sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        success(results)
      }
    )
  }
  updateBest(start,slutt,hente,levere, personer, leieid, success) {
  connection.query('UPDATE leietaker SET start = ?, slutt = ?, hentested = ?, leveringssted = ?, personer = ? WHERE leieid = ?',[start,slutt,hente,levere, personer, leieid],
      (error, results) => {
        if (error) return console.error(error);

        success()
      }
    )
  }
  deleteBest(leieid, success) {
  connection.query('DELETE FROM leietaker WHERE leieid = ?', [leieid], (error, results) => {
    connection.query('DELETE FROM leietaker_has_sykler WHERE leietaker_leieid = ?', [leieid], (error, results) => {
      connection.query('DELETE FROM leietaker_has_utstyr WHERE leietaker_leieid = ?', [leieid], (error, results) => {
            if (error) return console.error(error);

            success()
          }
        )
       }
      )
      }
    )
  }



  getBestilling(dato, success) {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) AS antall, IF( GROUP_CONCAT(`sykler_sykkelid`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykler_sykkelid`) ) AS sykkelid, IF( GROUP_CONCAT(`sykkeltype`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykkeltype`) ) AS sykkeltype, IF( GROUP_CONCAT(`utstyr_utstyrid`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyr_utstyrid`) ) AS utstyrid, IF( GROUP_CONCAT(`utstyrtype`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyrtype`) ) AS utstyrtype, lager, sted, start, slutt FROM leietaker l JOIN kunder k ON l.kunder_brukerid = k.brukerid LEFT JOIN leietaker_has_sykler ls ON l.leieid = ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu ON l.leieid = lu.leietaker_leieid LEFT JOIN sykler s ON ls.sykler_sykkelid = s.id LEFT JOIN utstyr u ON lu.utstyr_utstyrid = u.utstyrid JOIN lager ON l.hentested = lager.lagerid JOIN sted ON l.leveringssted = sted.stedid WHERE cast(start as Date) = ? GROUP BY leieid',
      [dato],(error, results) => {
        if (error) return console.error(error);

        success(results);
      });
  }


  getSykler(bestilling,success) {
      connection.query(
        'select * from leietaker_has_sykler left join leietaker on leietaker_has_sykler.leietaker_leieid = leietaker.leieid left join sykler on leietaker_has_sykler.sykler_sykkelid = sykler.id WHERE leietaker_leieid = ?',
        [bestilling],(error,results) => {
          if (error) return console.error(error);

          success(results);
        }
      )
    }
    getUtstyr(bestilling,success) {
      connection.query(
        'select * from leietaker_has_utstyr left join leietaker on leietaker_has_utstyr.leietaker_leieid = leietaker.leieid left join utstyr on leietaker_has_utstyr.utstyr_utstyrid = utstyr.utstyrid WHERE leietaker_leieid = ?',
        [bestilling],(error,results) => {
          if (error) return console.error(error);

          success(results);
        }
      )
    }

  getTyper(success) {
    connection.query('select sykkeltype from sykler group by sykkeltype', (error, results) => {
      if (error) return console.error(error);

      success(results);
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
  kvittering(id, success) {
    connection.query("select leieid,fornavn,etternavn,start,slutt,lager,sted,personer from leietaker left join kunder on kunder_brukerid = brukerid left join lager on hentested = lagerid left join sted on leveringssted = stedid where leieid=?", [id],(error, results) => {
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
