// Env
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

// Libs
import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

// Api
import { createApi as createFilesApi } from './api/files';

// SSL
// const privateKey = fs.readFileSync(path.resolve(__dirname + '/../sslcert/server.key'));
// const certificate = fs.readFileSync(path.resolve(__dirname + '/../sslcert/server.cert'));

// const credentials = {key: privateKey, cert: certificate};

// Express
const app = express();
const router = Router();

// Mongoose
const connect = () => {
  // mongoose.connect('mongodb://134.0.112.177/pfstore', { useNewUrlParser: true, useUnifiedTopology: true }).catch(connect);
  mongoose.connect('mongodb://77.222.60.240/voicer', { useNewUrlParser: true, useUnifiedTopology: true }).catch(connect);
}

connect();

// app.use(express.static(__dirname + '/../build'));
app.use(bodyParser.json());
// app.use(session({ secret: 'whoops', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// router.get([
//   '/auth',
//   '/register',
//   '/account',
//   '/account/*',
//   '/profile',
//   '/profile/*',
//   '/vacancy',
//   '/vacancy/*',
//   '/employer',
//   '/students',
//   '/resume',
//   '/resume/*',
//   '/awards',
//   '/social',
//   '/social/*',
// ], function(req, res) {
//   res.sendFile(path.resolve(__dirname + '/../build/index.html'));
// });

// router.get('/user', function(req, res) {
//   res.sendFile(path.resolve(__dirname + '/../build/user.html'));
// });

// router.get('/policy', function(req, res) {
//   res.sendFile(path.resolve(__dirname + '/../build/policy.html'));
// });

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

createFilesApi(router);

app.use('/', router);



// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(process.env.SSLPORT || 443);

const server = http.createServer(app);
server.listen(8080);