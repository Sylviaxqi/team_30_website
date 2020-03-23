const { Connection, Request } = require("tedious");
var express = require("express");
var app = express();
var router = express.Router();
var sql = require("mysql");
const bodyParser = require('body-parser');

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

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } 
});

// router.get('/', async function(req, res, next) {
//   console.log('------ backend get ------');
//     var buttonDetail1 = req.query.buttonDetail1;
//     var buttonDetail2 = req.query.buttonDetail2;
// let result = await queryDatabase(res, 'Select * from UiccVersionEight where ClassificationOne = \''+buttonDetail1+'\' and ClassificationTwo = \''+buttonDetail2+'\' for json path',
// (err, row, field) => {
//     if (err) console.log(err);
//     else {
//       console.log(row);
//       console.log(result);
//     }
//   })
//     // console.log(result);
//     res.send({message: result});
// });

router.get("/", async function(req, res) {
  console.log("------ backend get ------");
  var buttonDetail1 = req.query.buttonDetail1;
  var buttonDetail2 = req.query.buttonDetail2;
  queryDatabase(
    "Select * from UiccVersionEight where ClassificationOne = '" +
      buttonDetail1 +
      "' and ClassificationTwo = '" +
      buttonDetail2 +
      "' for json path",
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.send({message: err.message});
      } else {
        console.error("success");
        res.json({message: data});
      }
    }
  );
});

function queryDatabase(query, onFinish) {
  new Promise((resolve, reject) => {
    let value = "";
    console.log("Reading from the Table...");

    const request = new Request(query, (error)=>{
        if (error) {
            onFinish(error);
        }
        // pass the results array on through the callback
        onFinish(null, value);
    });
    request.on("row", columns => {
      // console.log(columns.length)
      columns.forEach(column => {
        value += column.value;
        // console.log(value)
        console.log("=================================");
        console.log("%s", column.value);
        // resolve(column.value);
      });
    });

    connection.execSql(request);
  });
}

// const { Connection, Request } = require("tedious");

// var http = require('http'),
//     mysql = require('mysql'),
//     express     = require('express'),
//     bodyParser = require("body-parser"),    
//     // config = require('./config'),
//     app = express(),
//     apiRouter = express.Router();

// app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// app.use(function(req, res, next)
// {
//     /* Allow access from any requesting client */
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     /* Allow access for any of the following Http request types */
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
//     /* Set the Http request header */
//     res.setHeader('Access-Control-Allow-Headers', 
//                  'X-Requested-With,content-type, Authorization');
//     next();
// });

// const configuration = {
//   authentication: {
//     options: {
//       userName: "sylvia", // update me
//       password: "Team30medicaldrawing" // update me
//     },
//     type: "default"
//   },
//   server: "team-30-medical-drawings.database.windows.net", // update me
//   options: {
//     database: "medical-drawings", //update me
//     encrypt: true
//   }
// };

// const con = new Connection(configuration);


// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to the database!");  

//     apiRouter.get('/', function(req, res)
//     {
//         let sql = "SELECT id, name, description FROM technologies ORDER BY name ASC";  

//         con.query(sql, (err, results) => {
//             if (err) {
//             console.dir(err);
//             }
//             res.json(results);
//         });
//     });
//   });

// const { Connection, Request } = require("tedious");
// var express = require("express");
// var app = express();
// var router = express.Router();
// var sql = require("mysql");
// const bodyParser = require('body-parser');
// var http=require('http');
// var url=require('url');
// var qs=require('querystring');
// app.use(bodyParser.json());

// module.exports = router;

// const config = {
//   authentication: {
//     options: {
//       userName: "sylvia", // update me
//       password: "Team30medicaldrawing" // update me
//     },
//     type: "default"
//   },
//   server: "team-30-medical-drawings.database.windows.net", // update me
//   options: {
//     database: "medical-drawings", //update me
//     encrypt: true
//   }
// };

// const connection = new Connection(config);

// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } 
// });

// router.get('/', async function(req, res, next) {
//   console.log('------ backend get ------');
//     var buttonDetail1 = req.query.buttonDetail1;
//     var buttonDetail2 = req.query.buttonDetail2;
// let result = await queryDatabase('Select * from UiccVersionEight where ClassificationOne = \''+buttonDetail1+'\' and ClassificationTwo = \''+buttonDetail2+'\' for json path',
// (err, row, field) => {
//     if (err) console.log(err);
//     else {
//       console.log(row);
//       console.log(result);
//       console.log(field);
//     }
//   })
//     // console.log(result);
//     res.send({message: result});
// });

// function queryDatabase(query) {
//     return new Promise((resolve, reject) => {
//       console.log("Reading from the Table...");
  
//       const request = new Request(query, (err, rowCount) => {
//           if (err) {
//             console.error(err.message);
//             reject(err)
//           } else {
//             console.log('Query successfully');
//           }
//         }
//       );
//       request.on("row", columns => {
//         // console.log(columns.length) 
//         columns.forEach(column => {
//           console.log("%s", column.value);
//           resolve(column.value);
//         });
//       });
//       connection.execSql(request);
//     });
//   }