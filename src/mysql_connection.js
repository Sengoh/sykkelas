import mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
export let connection;
function connect() {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_idri1005_10',
    password: 'UX0LGnyi',
    database: 'g_idri1005_10'
<<<<<<< HEAD
});
=======
  });
>>>>>>> 880ce890a540e02453c32371ea5bba9b787cc8e1

  // Connect to MySQL-server
  connection.connect(error => {
    if (error) console.error(error); // If error, show error in console and return from this function
  });

  // Add connection error handler
  connection.on('error', error => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect if connection to server is lost
      connect();
    } else {
      console.error(error);
    }
  });
}
connect();
