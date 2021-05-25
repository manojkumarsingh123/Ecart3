const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const errorController = require('./controllers/error');

//const MONGODB_URI =
//'mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qkwyi.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}';


const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qkwyi.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;




const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req,res,next) => {
next();
});

//sequelize
//.sync()
//.then(result => {
    // console.log(result);
  //app.listen(3000);
  //})
  //.catch(err => {
   // console.log(err);
  //});


mongoose
.connect(MONGODB_URI)
.then(result =>{
app.listen(process.env.PORT || 3000);

}).catch(err =>{
  console.log(err);
});