const mysql = require('mysql2')

const credentials = {
    host: 'localhost',
    user: 'root',
    password: 'rootROOT1!',
    database: 'blog_db'
}
const connection = mysql.createConnection(credentials)



connection.connect(err => {
    if (err) {
        throw err
    }
    console.info('Connessione DB effettuata');

})


module.exports = connection