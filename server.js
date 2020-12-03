const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: ["http://localhost:4200"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/server/uploads"));

const db = require(`./server/models`);
db.sequelize.sync();
//db.sequelize.sync({ force: true });



app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./server/routes/user.url")(app);
require("./server/routes/masters.url")(app);
require("./server/routes/category.url")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


