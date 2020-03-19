// Env
import fs from 'fs';

// Libs
import { Router } from 'express';
import { IFile } from 'types/files';
// Storage
import * as Storage from '../storage/files';
import { UploadedFile } from 'express-fileupload';

export const createApi = (router: Router) => {
  router.get('/api/v1/files/:id/info', function(req, res) {
    Storage.get(req.params.id).then(file => {
      if (!file) {
        return res.sendStatus(404);
      }
      
      // res.attachment(file.name);
      // res.contentType(file.type);

      res.send({ name: file.name, type: file.type, size: file.size });
    });
  });

  router.get('/files/:id', function(req, res) {
    Storage.get(req.params.id).then(file => {
      if (!file) {
        return res.sendStatus(404);
      }
      
      // res.attachment(file.name);
      if (file.type) {
        res.contentType(file.type);
      }

      res.send(file.data);
    });
  });
  
  router.get('/files', function(req, res) {
    res.send('hello');
  });
  
  router.get('/test', function(req, res) {
    Storage.upload({ name: 'wow', text: 'Привет', ready: false }).then(data => {
      return data ? res.send(data._id) : res.sendStatus(400);
    });
  });
  
  router.get('/api/v1/files/unhandled', function(req, res) {
    Storage.findItem({ ready: false }).then(item => res.send(item));
  });
  
  router.get('/api/v1/files', function(req, res) {
    Storage.findItems({}).then(items => res.send(items));
  });
  
  router.post('/api/v1/files/:id', function(req, res) {
    const src = req.files && req.files.file as UploadedFile;

    if (!src) {
      return res.sendStatus(400);
    }

    Storage.update(req.params.id, { type: src.mimetype, data: src.data, ready: true }).then(data => {
      return data ? res.send(data._id) : res.sendStatus(400);
    });
  });
  
  // router.post('/api/v1/files', function(req, res) {
  //   const src = req.files && req.files.file as UploadedFile;

  //   if (!src) {
  //     return res.sendStatus(400);
  //   }

  //   const file = { name: src.name, text: req.params.text, type: src.mimetype, data: src.data, size: src.size };

  //   Storage.upload(file).then(data => {
  //     return data ? res.send(data._id) : res.sendStatus(400);
  //   });
  // });

  router.post('/api/v1/files', function(req, res) {
    const src = req.files && req.files.file as UploadedFile;

    if (!src) {
      return res.sendStatus(400);
    }

    const file = { text: req.params.text, ready: false };

    Storage.upload(file).then(data => {
      return data ? res.send(data._id) : res.sendStatus(400);
    });
  });
  
  router.delete('/api/v1/files/:id', function(req, res) {
    Storage.remove(req.params.id).then(() => res.send(null));
  });
}