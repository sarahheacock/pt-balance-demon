
const express = require("express");

const userRoutes = express.Router();
const Page = require("../models/page").Page;
const config = require('../configure/config');

const Slack = require('node-slack');
const slack = new Slack(config.url);


userRoutes.param("pageID", function(req, res, next, id){
  Page.findById(id, function(err, doc){
    if(err) return next(err);
    if(!doc){
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.page = doc;
    return next();
  });
});

userRoutes.param("section", function(req,res,next,id){
  req.section = req.page[id];
  if(!req.section){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

userRoutes.param("sectionID", function(req, res, next, id){
  req.oneSection = req.section.id(id);
  if(!req.oneSection){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

//================MAIL==================================
userRoutes.post("/sayHello", function(req, res){
  slack.send({
    text: req.body.message,
    channel: '#portfolio',
    username: req.body.name,
    attachments: [
      {
        title: 'Phone Number',
        text: req.body.phone
      },
      {
        title: 'Email Address',
        text: req.body.email
      }
    ]
  });
  res.json({success: true});
});


//===================GET SECTIONS================================
//get page
userRoutes.get("/:pageID", function(req, res){
  res.json(req.page);
});

//get section
userRoutes.get("/:pageID/:section", function(req, res){
  res.json(req.section);
});




module.exports = userRoutes;
