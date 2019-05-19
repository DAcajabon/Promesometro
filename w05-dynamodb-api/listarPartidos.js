'use strict';
var AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table = "Partidos";

module.exports.readPartidos = async (event) => {
  var params1;
  params1 = {
    TableName: table,
  }
  try {
	  const data = await dynamoDB.scan(params1).promise();
	  return {
      statusCode: 200,
      body: JSON.stringify({
        data
      }, null, 2),
    };
      //return { statusCode: 200, body: JSON.stringify(data) };
	} catch (error) {
	  return {
	    statusCode: 400,
	    error: `Could not fetch: ${error.stack}`
	  };
    }
};