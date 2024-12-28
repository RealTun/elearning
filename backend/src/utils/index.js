'use strict'

const _ = require('lodash')
const { Types } = require('mongoose')

const convertToObjectIdMongodb = id => new Types.ObjectId(id)

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick( object, fields )
}

// ['a', 'b'] => {a: 1, b: 1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}

const removeUndefinedNullObject = (obj) => {
    const result = {};
  
    Object.keys(obj).forEach((k) => {
      const current = obj[k];
  
      if ([null, undefined].includes(current)) return;
      if (Array.isArray(current)) return;
  
      if (typeof current === "object") {
        result[k] = removeUndefinedNullObject(current);
        return;
      }
  
      result[k] = current;
    });
  
    return result;
  };

module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedNullObject,
    convertToObjectIdMongodb
}