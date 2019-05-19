'use strict';
var AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table = "Partidos";

module.exports.addPartido = async(event) => {
    var nombre = event.queryStringParameters.nombre;
    var presidente = event.queryStringParameters.presidente;
    var vicepresidente = event.queryStringParameters.vicepresidente;
    var imagen = event.queryStringParameters.imagen;

    var result = await partido(nombre);

    if(result.Items.length > 0){
      return {
        statusCode: 200,
        body: JSON.stringify({
          result
        }, null, 2),
      };
    }else {
      var params = {
        Item : {
            "PartidoID" : uuid.v1(),	
            "nombre" : nombre,
            "presidente" : presidente,
            "vicepresidente": vicepresidente,
            "imagen": imagen
        },
        TableName : table
    };
    const r = dynamoDB.put(params).promise();
    return r;
    }
}

async function partido(nombre) {
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
}

