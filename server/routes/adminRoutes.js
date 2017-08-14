const express = require("express");

const adminRoutes = express.Router();
const Page = require("../models/page").Page;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../configure/config');


adminRoutes.param("pageID", function(req, res, next, id){
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

adminRoutes.param("section", function(req,res,next,id){
  req.section = req.page[id];
  if(!req.section){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

adminRoutes.param("sectionID", function(req, res, next, id){
  req.oneSection = req.section.id(id);
  if(!req.oneSection){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});



//======================EDIT SECTIONS==============================

adminRoutes.get("/:pageID/:section", function(req, res){
  res.json(req.section);
});

//add section
adminRoutes.post("/:pageID/:section", function(req, res, next){
  req.section.push(req.body);
  req.page.save(function(err, page){
    if(err) return next(err);
    res.status(201);
    res.json(page);
  });
});

adminRoutes.get("/:pageID/:section/:sectionID", function(req, res){
  res.json(req.oneSection);
});

//edit section
adminRoutes.put("/:pageID/:section/:sectionID", function(req, res){
  Object.assign(req.oneSection, req.body);
  req.page.save(function(err, result){
    if(err) return next(err);
    res.json(result);
  });
});

//delete section
adminRoutes.delete("/:pageID/:section/:sectionID", function(req, res){
  req.oneSection.remove(function(err){
    req.page.save(function(err, page){
      if(err) return next(err);
      res.json(page);
    })
  })
});


module.exports = adminRoutes;
