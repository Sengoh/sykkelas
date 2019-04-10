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
  getBikedetails(id, success) {
    connection.query('SELECT * FROM sykler INNER JOIN sykkelstatus on sykler.status=sykkelstatus.Statusid where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getBikeStatus(success) {
    connection.query('SELECT * FROM sykkelstatus', (error, results) => {
      if (error) return console.error(error);
      success(results);

    });
  }

  getBikeState(id, success) {
    connection.query('SELECT * FROM sykler where id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results[0]);
    });
  }

/*  getStatusMessage(success) {
    connection.query('SELECT status FROM sykler where id=? INNER JOIN sykkelstatus on sykler.status=sykkelstatus.Statusid', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  } */


  updateBike(sykler, obj, id, success) {
    connection.query(
      'update sykler set status=?, fritekst=? where id=?',
      [sykler, obj, id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
//Gjør det på denne måten fordi eg ikkje fekk IF-statements eller CASE til å fungera i SQL. :(
  updateBikeTilgj() {
    connection.query('update sykler set tilgjengelig = 1 where status = 1', (error, results) => {
      if (error) return console.error(error);
      });
    connection.query('update sykler set tilgjengelig=0 where NOT status=1', (error, results) => {
      if (error) return console.error(error);
    });
  }

  getBikes(success) {
    connection.query('select * from sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
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
  //Inspirert av (https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible_animate)
  collapsible(){
  var coll = document.getElementsByClassName("collapsible");
  console.log(coll);


  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = coll[i].nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
  }
}
export let bikeService = new BicycleService();
