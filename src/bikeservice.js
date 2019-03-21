import { connection } from './mysql_connection';

class BicycleService {
  getBikes(success) {
    connection.query('select * from sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  /*bikeDetails(success) {
    connection.query('select * from sykler INNER JOIN sykkelstatus on sykler.status=sykkelstatus.Statusid', (error, results))
  }*/
  getBikedetails(success, id, sykkel) {
    connection.query('select * from sykler where id=?', [id, sykkel], (error, results) => {
      if (error) return console.error(error);

      success(results);
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
