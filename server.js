const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('pages'));


app.post('/webhook', (req, res) => {
  const payload = req.body;
  console.log('Received POST webhook payload:', payload);
  // כאן תוכל לבצע פעולות נוספות עם הפולידה

  res.sendStatus(200); // שליחת תגובת 200 OK
});

// מסלול GET
app.get('/webhook', (req, res) => {
  // כאן תוכל לבצע פעולות נוספות כאשר מתבצעת בקשת GET ל-webhook

  res.send('Hello, this is a GET webhook!'); // שליחת תגובה חזרה
});







app.post('/webhook-endpoint', (req, res) => {
  const payload = req.body;
  console.log('Received webhook payload:', payload);
  // כאן תוכל לבצע פעולות נוספות עם הפולידה, כמו לשמור אותה במסד הנתונים

  res.sendStatus(200); // שליחת תגובת 200 OK
});

const myContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', myContactSchema);

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message
  });

  newContact
    .save()
    .then(() => {
      res.send(`Thank you ${name}`);
    })
    .catch((error) => {
      console.error('Error saving contact:', error);
      res.status(500).send('Internal Server Error');
    });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/contactList', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  