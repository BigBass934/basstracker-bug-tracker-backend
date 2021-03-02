const aws = require("aws-sdk");

const {
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');

aws.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", aws.config.credentials.accessKeyId);
  }
})

const dbClient =  new DynamoDBClient({region:"us-east-2"});
const TABLE_NAME = "Ticket"


async function getTicket(ticketId) {
    try{
        let result = await dbClient.send(new GetItemCommand({ TableName: TABLE_NAME, Key: { projectId: { N: ticketId } } }))
        let response = aws.DynamoDB.Converter.unmarshall(result.Item);
        console.log(response);
        return response;
    } catch(error) {
        console.error(error);
    }
    
}

async function getAllTicket() {
    try{
        let result = await dbClient.send(new ScanCommand({TableName: TABLE_NAME}));
        let response = [];
        result.Items.forEach(function(element, index, array){
            response.push(aws.DynamoDB.Converter.unmarshall(element));
        })
        console.log(response);
        return response;
    } catch(error) {
        console.error(error);
    }
    
}

async function postNewTicket(ticketId, projectName, ticketTag, ticketDescription, ticketName, time_Stamp, projectId, ticketSlug) {
    try{
        let ticket = {
            ticketId: {N: ticketId.toString()},
            projectName: {S: projectName},
            ticketTag: {S: ticketTag},
            ticketDescription: {S: ticketDescription},
            ticketName: {S: ticketName},
            time_Stamp: {S: time_Stamp},
            projectId: {N: projectId.toString()},
            ticketSlug: {S: ticketSlug}
          }
        let result = await dbClient.send(new PutItemCommand({TableName: TABLE_NAME, Item: ticket}));
        
        return project.projectId;
    } catch(error) {
        console.error(error);
    }
    
}

async function updateTicket(ticketId, projectName, ticketTag, ticketDescription, ticketName, time_Stamp, projectId, ticketSlug) {
    try{
        let ticket = {
            ':projectName': {S: projectName},
            ':ticketTag': {S: ticketTag},
            ':ticketDescription': {S: ticketDescription},
            ':ticketName': {S: ticketName},
            ':time_Stamp': {S: time_Stamp},
            ':projectId': {N: projectId.toString()},
            ':ticketSlug': {S: ticketSlug}
          }
          //console.log(ticketId);
          //console.log(Tag);
        let updateExpression =  'SET projectName = :projectName, ticketTag = :ticketTag, ticketDescription = :ticketDescription, ticketName = :ticketName, time_Stamp = :time_Stamp, projectId = :projectId, ticketSlug = :ticketSlug';
        let result = await dbClient.send(new UpdateItemCommand({TableName: TABLE_NAME, Key: { ticketId: { N: ticketId.toString() } }, ExpressionAttributeValues: ticket, UpdateExpression: updateExpression}));
        
        return result;
    } catch(error) {
        console.error(error);
    }
    
}

module.exports = {getTicket, getAllTicket, postNewTicket, updateTicket}