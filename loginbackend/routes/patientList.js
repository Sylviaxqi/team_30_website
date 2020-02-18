const { Connection, Request } = require("tedious");
var express = require("express");
var app = express();
var router = express.Router();
var sql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

module.exports = router;

const config = {
  authentication: {
    options: {
      userName: "sylvia", // update me
      password: "Team30medicaldrawing" // update me
    },
    type: "default"
  },
  server: "team-30-medical-drawings.database.windows.net", // update me
  options: {
    database: "medical-drawings", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } 
});

router.get('/', async function(req, res, next) {
  console.log('------ backend get ------');
let result = await queryDatabase( "select * from userInformation FOR JSON PATH",
   (err, row, field) => {
    if (err) console.log(err);
    else {
      console.log(row);
    }
  })
  console.log("result: ", result);
  res.send({message: result});

  // res.send({message: 'get method users'});
});


router.post('/', async function(req, res, next) {    
  let result = await queryDatabase( "select * from userInformation",//"INSERT questionnaire (HospitalNo, size, vocalChordMobile, comments) VALUES ('" + HospitalNo + "', '" + tumourSize + "', '" + VocalChordMobile + "', '" + Comments + "')", 
  (err, row, field) => {
    console.log('connected');
  })
});

  function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    console.log("Reading from the Table...");

    const request = new Request(query, (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err)
        } else {
          console.log('Inserted successfully');
        }
      }
    );
    
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s", column.value);
        resolve(column.value);
      });
    });
    connection.execSql(request);
  });
}