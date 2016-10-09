'use strict';

import User from './user.model';
import Channel from '../../components/models/channel.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
var nodemailer = require('nodemailer');
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

export function getUserInfo(req,res){
  var userId=req.params.id;
  console.log("Id::"+userId);
  return User.findOne({ _id: userId }, '-salt -password').populate('organisation channels teams').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

export function getChannelInfo(req,res){
  var userId=req.params.id;
  var channelId=req.params.channelId;
  console.log("Id::"+userId);
  return Channel.findOne({ _id: channelId }).exec()
    .then(channel => { // don't ever give out the password or salt
      if(!channel) {
        return res.status(401).end();
      }
      res.json(channel);
    })
    .catch(err => next(err));
}

export function saveMessage(req,res){
  var channelId=req.params.channelId;
  console.log("Save message:"+JSON.stringify(req.body));
  return Channel.findOne({ _id: channelId }).exec()
    .then(channel => { // don't ever give out the password or salt
      if(!channel) {
        return res.status(401).end();
      }
      var message={
        user: req.body.data.user,
        message: req.body.data.message,
        messageType: req.body.data.type
      };
      channel.history.push(message);
      channel.save();
      res.send("Data saved");
    });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({'requestStatus':'pending'}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  console.log(req.body);

  if(newUser.role!='organisation'){
    newUser.role = 'user';
  }
  else{
    newUser.requestStatus='pending';
  }
  console.log(newUser);

  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  console.log("Show function is called");
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

export function approveStatus(req,res){
  var userId = req.params.id;
  return User.findById(userId).exec()
    .then(user => {
      if(user) {
        user.requestStatus = 'approve';
        sendMail(user);
        return user.save()
          .then(() => {//Anonymous arrow function es6s
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });


}
//TODO: implement xoauth2
function sendMail(user){
  nodemailer.createTransport({
          host:'smtp.gmail.com',
          auth: {
            user: 'mavericksfour@gmail.com',
            pass: 'niit@123'
          }
        }).sendMail({
          from: 'mavericksfour@gmail.com',
          to: 'aarushigupta194@gmail.com',
          subject: 'Request approved',
          text: 'Congratulations, Your request have been approved. Thank you for using collaba'
        }, function(error, info) {
          if (error) {
            console.log('-------------'+error+'------------');
          } else {
            console.log('Message sent');
          }
        });
}


/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
