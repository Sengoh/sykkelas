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
}
export let ansatteService = new AnsatteService();

class KundeService {
  getKunde(id, success) {
    connection.query('select * from kunder where brukerid=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}

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
