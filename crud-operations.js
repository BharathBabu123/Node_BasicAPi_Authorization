  const pg = require('pg');//npm install pg
const url='postgres://postgres:Admin@123@localhost:5432/postgres';
const client =   new pg.Client(url);
/=====================/

client.connect(function(err){
if(err){
return console.error('Please Give Me Valied Url');
}
});
//====== INSERT-OPERATION======//
function InseartData (req,res){
      var user ={
        id:req.body.id,
        name:req.body.name,
        roolnumber:req.body.roolnumber
      }
let InseartQuarry=`INSERT INTO "DEMO".student(id,name,roolnumber) VALUES (${user.id},'${user.name}',${user.roolnumber})`;
                            //1....**IN Promise Formate**/
client.query(InseartQuarry)
.then(result =>res.send(user))
.catch(err =>console.error('Please Enter A Valid Query'+err))
                              //2...+++IN Call Back Format+++/
// client.query(InseartQuarry,function(err,result){
// if(err){
//         return console.error('Please Enter A Valid Query'+err);
// }
// else{

//         res.send(user);
// }
// });
     // +++++++++++++++++++++++++
}
//====== DELETE-OPERATION======//
function deleate (req,res){
      id=req.body.id;
      let deleateQuary = `DELETE from "DEMO".student where id = ${id}`;
                    //**IN Promise Formate**/
        client.query(deleateQuary)
        .then(result =>res.send(result.rows))
        .catch(err =>console.error(err))
                    //+++IN Call Back Formate+++//
      // client.query(deleateQuary,function(err,result){
      //         if(err){

      //                 return console.error("Error in Deleate Quary"+err)
      //         }
      //         else{

      //                 res.send("SucseeFully Deleated"+result.rows)
      //         }
      // });
 //   +++++++++++++++++++++++++       
}
//========= UPDATE-OPERATION=====//
function Update (req,res){
      var user ={
              id:req.body.id,
              name:req.body.name,
              roolnumber:req.body.roolnumber
            }
let UpdateQuary=`UPDATE "DEMO".student set name='${user.name}',roolnumber=${user.roolnumber} where id=${user.id}`;
                                  //**IN Promise Formate**/
client.query(UpdateQuary)
.then(result =>res.send(user))
.catch(err =>console.error("Plese Give Me A Valied Update Quary"+err))
                          //+++IN Call Back Formate+++//
// client.query(UpdateQuary,function(err,result){

// if(err){
//       return console.error("Plese Give Me A Valied Update Quary"+err)
// }
// else{
//         res.send("Sucsees Fully Updated"+result.rows)
// }
// });
         // +++++++++++++++++++++++++ 
}
/=====RETRIVE-OPERATION===/
function Retrive(req,res){
                              //**IN Promise Formate**/
let RetriveQuary = `SELECT * from "DEMO".student`;
client
  .query(RetriveQuary)
  .then(result => res.send(result.rows))
  .catch(err => console.error('Please Enter A Valied Queary'+err))
                            //+++IN Call Back Formate+++//
// client.query(RetriveQuary,function(err,result){
// if(err){
// return console.error("Please Give A Valide RetriveQuary");
// }
// else{
//         return res.send(result.rows);
// }
// });
   //  +++++++++++++++++++++++++
}
/======SINGLE-ID======/
function singleid(req,res){
      id=req.body.id;
let SigleIdQurey = `SELECT * from "DEMO".student where id=${id}`
client.query( SigleIdQurey)
.then(result =>res.send(result.rows))
.catch(err=>console.error("PLease Provide a Valie SingleId URL"+err))
}




// ---------------------------------------------------------AUTHORIZATION--------------------------------------------------------------------
//=====================2.....ADD-EMPLOYE Rest-Api-Autharization===============//

function ADDEMPLOYE (req,res){
      var user ={
              id:req.body.id,
              name:req.body.name,
              age:req.body.age
            }
            let EMPQuarry=`INSERT INTO "public".employee(id,name,age) VALUES (${user.id},'${user.name}',${user.age})`;
            //1....**IN Promise Formate**/
client.query(EMPQuarry)
.then(result =>res.send(user))
.catch(err =>console.error('Please Enter A Valid Query'+err))
                              //2...+++IN Call Back Format+++/

// client.query(InseartQuarry,function(err,result){
// if(err){
//         return console.error('Please Enter A Valid Query'+err);
// }
// else{

//         res.send(user);
// }
// });
                              // +++++++++++++++++++++++++
}

//===================== 2.2222222222   HR-Validation For Rest-API==================//
function Validation(email, password){
      var arr =[email, password]
var Valprom = new Promise((resolve,reject)=>{
let ValQuery=`SELECT * from public.user where email=$1 and password=$2` 
client.query(ValQuery,arr,function(err,result){
if(err){
      reject("INVALIDE QUAREY "+err)
}
else{
  if(result.rows.length>0){
          resolve(true)
  }
else{
resolve(false)
}
}
});
});
return Valprom;
}


/===============1...HR-REGISTRATION-Autharization-RESTAPI==============================/
function InsertAuthaerization (req,res){
      var user ={
              email:req.body.email,
              password:req.body.password
      }
let InseartQuarry=`INSERT INTO public.user(username,password) VALUES ('${user.email}','${user.password}')`;
              
client.query(InseartQuarry)
.then(result =>res.send(user))
.catch(err =>console.error('Please Enter A Valid Query'+err))
                              //2...+++IN Call Back Format+++/
// client.query(InseartQuarry,function(err,result){
// if(err){
//         return console.error('Please Enter A Valid Query'+err);
// }
// else{

//         res.send(user);
// }
// });

}
// ------------------------------------------------------------------------------------------------------------------------------------
module.exports={add:InseartData,dlt:deleate,UPD:Update,ret:Retrive,SinID:singleid,IST:InsertAuthaerization,EMP:ADDEMPLOYE,val:Validation};
