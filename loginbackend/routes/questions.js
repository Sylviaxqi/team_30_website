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

router.post('/', async function(req, res, next) {
//   console.log('------ backend post ------');

  res.send({message : 'backend' })
  var tumourSize = req.body.tumourSize;
  var VocalChordMobile = req.body.VocalChordMobile;
  var Comments = req.body.Comments;
  var HospitalNo =  req.body.HospitalNo;
  console.log(HospitalNo);
    
  let result = await queryDatabase( "INSERT questionnaire (HospitalNo, size, vocalChordMobile, comments) VALUES ('" + HospitalNo + "', '" + tumourSize + "', '" + VocalChordMobile + "', '" + Comments + "')", 
  (err, row, field) => {
    console.log('connected');    

    // if (err) {
    //   console.log(err);
    //   res.send ({'success': false, 'message': 'could not connect to database' });
    // }

    // if (row.length > 0) {
    //   console.log('found');
    //   res.send ({'success': true, 'user': row[0].username});
    // }
    // else {
    //   console.log('not found');
    //   res.send ({'success': false, 'message': 'user not found'});
    // }
  })
});

function queryDatabase(query) {
  let myFirstPromise = new Promise((resolve, reject) => {
    console.log("Reading rows from the Table...");

    const request = new Request(query, (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err)
        } else {
          console.log('Inserted successfully');
        }
      }
    );

    // request.on("row", columns => {
    //   columns.forEach(column => {
    //     console.log("%s\t%s", column.metadata.colName, column.value);
    //     resolve(column.value)
    //   });
    // });

    connection.execSql(request);
  });
}