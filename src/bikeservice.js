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
  //document.getElementById('dato').valueAsDate = new Date();

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

/* const stil =
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
.error {
  color: red;
  font-size: 80%;
}
*/
