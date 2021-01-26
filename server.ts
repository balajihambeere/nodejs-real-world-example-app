import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import bodyParser from 'body-parser';

import routes from './routes';

// import responseEnhancer from 'express-response-formatter';

import passport from 'passport';

import { signUpStrategy, loginStrategy, verifyToken } from './modules/auth/auth-strategy';

let app = express();

app.use(passport.initialize());

app.use(cors());

const PORT = 3200;

mongoose.Promise = global.Promise;

const options = { useNewUrlParser: true };

//change connection string
mongoose.connect('mongodb://127.0.0.1:27017/todoDB', options,
    function (error) {
        if (error) { console.log(error); }
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

passport.use('signup', signUpStrategy);

passport.use('signin', loginStrategy);

passport.use(verifyToken);

// Application-level middleware
// app.use(responseEnhancer());

app.use(passport.initialize());

// remove the X-Powered-By HTTP header
app.disable('x-powered-by');

// Application-level middleware
app.use('/api', routes);

app.get('/', (request, response) =>
    response.send(`Server is running on port ${PORT}`)
);

app.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);

export default app;