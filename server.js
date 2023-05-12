const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
const db = require('mongoose');

app.use(express.static('pages'));

app.post('/webhook', (req, res) => {
  const payload = req.body;
  console.log('Received webhook payload:', payload);
  // כאן תוכל לבצע פעולות נוספות עם הפולידה, כמו לשמור אותה במסד הנתונים

  res.sendStatus(200); // שליחת תגובת 200 OK
});

app.listen(3000, () => {
  console.log(`Server is listening on port ${3000}`);
});


db.connect('mongodb://127.0.0.1:27017/contactList')
  .then(() => {
    console.log('db is on');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

const myContactDB = db.Schema({
  name: String,
  email: String,
  message: String
});

const contact = db.model('contacts', myContactDB);

app.post('/contact', (req, res) => {
  let temp = {
    name: req.body.Name,
    email: req.body.Email,
    message: req.body.Message
  };
  const addContactToDb = async (tp) => {
    await contact.insertMany(tp);
    res.send(`Thank you${temp.name}`)
  };
  addContactToDb(temp);
});




