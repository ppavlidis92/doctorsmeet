const jwt = require("jsonwebtoken");
var User = require("../models/users");
const mongoose = require("mongoose");

function returnParamsObj(object,firstParam,secondParam=null){
  
    object.boolean =(firstParam== 'true') ?true : false;
    object.text =secondParam;
 
    return object
}

function returnfarmakaObj(object,firstParam,secondParam,thirdParam){
  
  object.boolean =(firstParam == 'true') ?true : false;
  object.Aitia =secondParam;
  object.Eidos =thirdParam;
  return object
}


function CreateFamilyTable(body){
    let HelperArray = []
let { fatherAge,fatherHealth,fatherAgeDeath,fatherReasonDeath,
    motherAge,motherHealth,motherAgeDeath,motherReasonDeath,
    brotherAge,brotherHealth,brotherAgeDeath,brotherReasonDeath,
    sisterAge,sisterHealth,sisterAgeDeath,sisterReasonDeath,
    wifeAge,wifeHealth,wifeAgeDeath,wifeReasonDeath} = body

let fatherObj={}
let motherObj ={}
let  brotherObj ={}
let sisterObj ={}
let wifeObj ={}

fatherObj.member= 'father'
fatherObj.member_age= fatherAge
fatherObj.health_state = fatherHealth
fatherObj.member_age_death = fatherAgeDeath
fatherObj.member_death_reason =fatherReasonDeath
HelperArray.push(fatherObj)

motherObj.member= 'mother'
motherObj.member_age= motherAge
motherObj.health_state = motherHealth
motherObj.member_age_death = motherAgeDeath
motherObj.member_death_reason =motherReasonDeath
HelperArray.push(motherObj)

brotherObj.member= 'brother'
brotherObj.member_age= brotherAge
brotherObj.health_state = brotherHealth
brotherObj.member_age_death = brotherAgeDeath
brotherObj.member_death_reason =brotherReasonDeath
HelperArray.push(brotherObj)

sisterObj.member= 'sister'
sisterObj.member_age= sisterAge
sisterObj.health_state =  sisterHealth
sisterObj.member_age_death = sisterAgeDeath
sisterObj.member_death_reason =sisterReasonDeath
HelperArray.push(sisterObj)

wifeObj.member= 'wife'
wifeObj.member_age= wifeAge
wifeObj.health_state =  wifeHealth
wifeObj.member_age_death = wifeAgeDeath
wifeObj.member_death_reason =wifeReasonDeath
HelperArray.push(wifeObj)

return HelperArray;

}


function CreateCheckup(body) {
  let           helpobj={}
  let checkupStatus=[]
let {checkup,checkupTextWHO_1,  checkupTextWHERE_1, 
       checkupTextWHEN_1, checkupTextWHO_2,
       checkupTextWHERE_2, checkupTextWHEN_2, 
       checkupTextWHO_3,  checkupTextWHERE_3,
       checkupTextWHEN_3,} = body


       if(checkup =="true"){
            helpobj.boolean =true
            let first = {}
            let second = {}
            let third = {}

            first.Who=(checkupTextWHO_1) || '-'
            first.Where = checkupTextWHERE_1
            first.When = checkupTextWHEN_1
            checkupStatus.push(first)

            second.Who=(checkupTextWHO_2) ||'-'
            second.Where = checkupTextWHERE_2
            second.When = checkupTextWHEN_2
            checkupStatus.push(second)

            third.Who=checkupTextWHO_3
            third.Where = checkupTextWHERE_3
            third.When = checkupTextWHEN_3
            checkupStatus.push(third)

            helpobj.Status= checkupStatus
       }else{
        helpobj.boolean =false
       }
       return helpobj
}


function CreateEgxeirish(body) {
    let           helpobj={}
    let egxeirishText=[]


  let {egxeirish,
    egxeirishTextWHO_1,    egxeirishTextWHERE_1,
    egxeirishTextWHEN_1,    egxeirishTextWHO_2,
    egxeirishTextWHERE_2,    egxeirishTextWHEN_2,
    egxeirishTextWHO_3,    egxeirishTextWHERE_3,
    egxeirishTextWHEN_3} = body
  
  
         if(egxeirish =="true"){
             
              let first= {}
              let second ={}
              let third ={}
  
              first.Who=egxeirishTextWHO_1
              first.Where = egxeirishTextWHERE_1
              first.When = egxeirishTextWHEN_1
              egxeirishText.push(first)
  
              second.Who=egxeirishTextWHO_2
              second.Where = egxeirishTextWHERE_2
              second.When = egxeirishTextWHEN_2
              egxeirishText.push(second)
  
              third.Who=egxeirishTextWHO_3
              third.Where = egxeirishTextWHERE_3
              third.When = egxeirishTextWHEN_3
              egxeirishText.push(third)
  

              helpobj.boolean =true
              helpobj.text= egxeirishText
         }else{


          helpobj.boolean =false
         }
        
         return helpobj
  }

  function CreateNosilies(body) {
    let helpArray=[]
  let {allesNosilies_1,
    allesNosilies_2} = body
    
    helpArray.push(allesNosilies_1)
    helpArray.push(allesNosilies_2)
    return helpArray;
         
  }

  
function CreateSakxarodiDiabiti(body) {
    let           helpobj={}
    let SakxarodiDiabitiText=[]


  let {SakxarodiDiabiti,
    SakxarodiDiabitiWHO_1,
    SakxarodiDiabitiWHEN_1,
    SakxarodiDiabitiRESULT_1,
    SakxarodiDiabitiWHO_2,
    SakxarodiDiabitiWHEN_2,
    SakxarodiDiabitiRESULT_2,
    SakxarodiDiabitiWHO_3,
    SakxarodiDiabitiWHEN_3,
    SakxarodiDiabitiRESULT_3} = body
  
  
         if(SakxarodiDiabiti =="true"){
             
            let first= {}
            let second ={}
            let third ={}

              first.Who=SakxarodiDiabitiWHO_1
              first.Result = SakxarodiDiabitiRESULT_1
              first.When = SakxarodiDiabitiWHEN_1
              SakxarodiDiabitiText.push(first)
  
              second.Who=SakxarodiDiabitiWHO_2
              second.Result = SakxarodiDiabitiRESULT_2
              second.When = SakxarodiDiabitiWHEN_2
              SakxarodiDiabitiText.push(second)
  
              third.Who=SakxarodiDiabitiWHO_3
              third.Result = SakxarodiDiabitiRESULT_3
              third.When = SakxarodiDiabitiWHEN_3
              SakxarodiDiabitiText.push(third)
  

              helpobj.boolean =true
              helpobj.text= SakxarodiDiabitiText
         }else{


          helpobj.boolean =false
         }
         return helpobj
  }


  function GetAgeGroup(age) {
   let group = ''

   if (age>=18 && age <=25) {
    group='18-25'
   } else if(age>25 && age <=40) {
    group='25-40'
   }else if(age>40 && age <=65){
    group='40-65'
   }else if(age>65){
    group='65+'
   }
         return group;
  }

  
module.exports = {
    returnParamsObj,
    CreateFamilyTable,
    CreateCheckup,
    CreateEgxeirish,
    CreateNosilies,
    CreateSakxarodiDiabiti,
    GetAgeGroup,
    returnfarmakaObj

  };