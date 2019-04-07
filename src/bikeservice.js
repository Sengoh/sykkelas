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

/*  getStatusMessage(success) {
    connection.query('SELECT status FROM sykler where id=? INNER JOIN sykkelstatus on sykler.status=sykkelstatus.Statusid', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  } */


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
  collapsible(){
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible_animate
  var coll = document.getElementsByClassName("collapsible");
  console.log(coll);
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
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
