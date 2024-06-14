const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/authRoute');
const blogRoute = require('./route/blogroute');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);
app.use('/', blogRoute);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});