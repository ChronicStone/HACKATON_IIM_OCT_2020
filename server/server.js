require("dotenv").config();
const express = require('express')
const db = require("./app/models")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")

var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

db.sequelize.sync({ force: false });

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet())
app.use("/static", express.static( "public" ) );

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hackaton app backend" });
});

require("./app/routes")(app)



const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});