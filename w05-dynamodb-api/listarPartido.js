'use strict';
var AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table = "Partidos";

module.exports.readPartido = async (event) => {
  var nombre = event.queryStringParameters.nombre;

  var result = await partidos(nombre);

  //	console.log(res2);
  return {
    statusCode: 200,
    body: JSON.stringify({
    	result
    }, null, 2),
  };
}

async function partidos(nombre) {
    var params,params1;

    params = {
        TableName: table,
        FilterExpression: "#nombre = :nombrev",
        ExpressionAttributeNames: {
            "#nombre" : "nombre",
        },
        ExpressionAttributeValues: {
             ":nombrev" : nombre
        }
    };
    params1 = {
        TableName: table,
    };

	try {
	  const data = dynamoDB.scan(params).promise();
	  return data;
      //return { statusCode: 200, body: JSON.stringify(data) };
	} catch (error) {
	  return {
	    statusCode: 400,
	    error: `Could not fetch: ${error.stack}`
	  };
    }
};