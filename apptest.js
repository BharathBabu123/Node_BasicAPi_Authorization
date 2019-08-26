const express= require('express');//npm install express
var app = express();
var cors=require('cors');                  // npm install cors for interaction of 2 urls
app.use(cors());
const bodyParser= require('body-parser');//npm install body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());                           
const CrudeOperation= require('./crud-operations');
app.use(function(req,res,next){
      if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
              return res.status(401).json({ message: 'Missing Authorization Header' });
      }
      // verify auth credentials i.e Basic space ur UN , Pass
      const base64Credentials =   req.headers.authorization.split(' ')[1];
    //   it convert Authorization username and password in to normal form for inserting database
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const  [username,password] = credentials.split(':');
      CrudeOperation.val(username, password)
      .then((data)=>{
          if(data){
          next();
          }
          else{
                  res.send("INVALIDE AUTHORIZATION")
          }
      })
      .catch((demo)=>{
              res.send(demo)
      })
});

// app.get("/RetriveingData",CrudeOperation.ret);
// app.post("/InseartData",CrudeOperation.add);
// app.post('/DeleteData',CrudeOperation.dlt);
// app.put("/UpDateData",CrudeOperation.UPD);
// app.put("/SingleId",CrudeOperation.SinID);
// app.post("/AddHRDATA",CrudeOperation.IST);
// --------------Authorization---------------url=-----------------
app.post("/ADDEMPLOYEES",CrudeOperation.EMP);

app.listen(8081, function () {
      console.log("Example app listening at http://localhost:8081   &url");
});   



// in basic Authentication first give autoroization as basic and give username and password the go to body set as raw and json application 
// enter in json format in the body and set post or get what u want the enter

//json format means {"id":1,"name":"ashwad":college:"RGV"} 