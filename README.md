git commit -am "make it better"# ConcertApp
# concertApp

for heroku
- enc variables at settings -->Config Vars
const JWT_KEY = 'JWT_KEY_AUTH';
email to att variables

const mongoURI = process.env.MONGODB_URI ||'mongodb+srv://admin:admin@chatbot-test-shared.48emm.mongodb.net/Concert?retryWrites=true&w=majority'



// TODO check property on jwt{maxAge:'3h'} -login.js
//TODO change password
//send verifyemail to change password
//TODO ΕΠΕΞΕΡΓΑΣΙΑ ΧΡΗΣΤΗ ΕΠΕΞΕΡΓΑΣΙΑ ΑΣΘΕΝΗ
//visit
//attachment
//ADMIN EMP


//finished patient list need doctor list


//add lock icon so user can not edit unless he press there first


DATABASE
 1. πρεπει να υπάρχει μια βάση user για το login
 2. πρεπει καθε ιατρειο να έχει την δικη του βάση με πελάτες 
 3. μετα το login θα χρησιμοποιει την βάση για πελάτες μέσω του ΑΜΚΑ που θα ειναι το διαχωριστικο τον βασεων


 αλλαγή 
 - Χρηστες user find({doctor.amka : doctoramka})
 - Χρηστες ασθενεις status exists , deleted και δεν θα διαγραφονται πραγματικα απο την βαση
 - οταν γινει το status να γινει και το find   σε χρηστες, ασθενεις find( status : $ne:{Deleted})
 








 //TODO 
 chronjob at the end of the month see birthdays and update age
bot to speak for help

///PAULOOOOO

να ρωτησουμε στην φορμα του γιατρου   
Περίμετρος θώρακα,Εκπνοή μηπως ειναι υποτιμες