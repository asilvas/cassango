'use strict';
var async = require('async');

module.exports = function multiActions(actions){
  return function (req, res, next){
    var boundActions =[];
    for(var a = 0; a < actions.length; a++){
      boundActions.push(actions[a].bind(this, req, res));
    }
    async.series(boundActions, next);
  };
};