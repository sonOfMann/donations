var express = require('express'),
app = express(),
path = require('path'),
mysql = require('mysql2'),
port = 8120;

app.use(express.static('ast'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get( '/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.post( '/register', (req, res) => {
    var data = {
        first: req.body.first,
        last: req.body.last,
        addr: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        pemail: req.body.pe,
        oemail: req.body.ce
    },
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'dn',
        password: 'password',
        database: 'donations'
    });
    connection.query('INSERT INTO MyGuests( first, last, addr, city, state, zip, phone, pemail, oemail) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ data.first, data.last, data.addr, data.city, data.state, data.zip, data.phone, data.pemail, data.oemail], ( err, res) => {
        if (err) throw err;
    })
      
})

app.get( '/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/contact.html'));
})

app.listen( port, () => {
    console.log("In progress")
})
