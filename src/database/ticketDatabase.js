const aws = require("aws-sdk");
// aws.config.update({secretAccessKey: process.env.aws_secret_access_key,
//     accessKeyId: process.env.aws_access_key_id,
//     region: "us-east-2"})
const {
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');

// aws.config.getCredentials(function(err) {
//     if (err) console.log(err.message);
//     // credentials not loaded
//     else {
//       console.log("Access key:", aws.config.credentials.accessKeyId);
//   }
// })

const dbClient =  new DynamoDBClient({credentials: {secretAccessKey: process.env.aws_secret_access_key,
    accessKeyId: process.env.aws_access_key_id,}, region:"us-east-2"});
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
        console.log("about to send now!")
        let result = await dbClient.send(new ScanCommand({TableName: TABLE_NAME}));
        let response = [];
        result.Items.forEach(function(element, index, array){
            response.push(aws.DynamoDB.Converter.unmarshall(element));
        })
        console.log(response);
        return response;
    } catch(error) {
        console.log("Here is the error:")
        console.error(error);
    }
    
}

async function postNewTicket(ticketId, projectName, ticketTag, ticketDescription, ticketName, time_Stamp, projectId, ticketSlug, _cellVariants) {
    try{
        let ticket = {
            ticketId: {N: ticketId.toString()},
            projectName: {S: projectName},
            ticketTag: {S: ticketTag},
            ticketDescription: {S: ticketDescription},
            ticketName: {S: ticketName},
            time_Stamp: {S: time_Stamp},
            projectId: {N: projectId.toString()},
            ticketSlug: {S: ticketSlug},
            _cellVariants: {M: {ticketTag: {S: _cellVariants}}}
          }
        let result = await dbClient.send(new PutItemCommand({TableName: TABLE_NAME, Item: ticket}));
        
        return project.projectId;
    } catch(error) {
        console.error(error);
    }
    
}

async function updateTicket(ticketId, projectName, ticketTag, ticketDescription, ticketName, time_Stamp, projectId, ticketSlug, _cellVariants) {
    try{
        let ticket = {
            ':projectName': {S: projectName},
            ':ticketTag': {S: ticketTag},
            ':ticketDescription': {S: ticketDescription},
            ':ticketName': {S: ticketName},
            ':time_Stamp': {S: time_Stamp},
            ':projectId': {N: projectId.toString()},
            ':ticketSlug': {S: ticketSlug},
            ':_cellVariants': {M: {ticketTag: {S: _cellVariants}}}
          }
          //console.log(ticketId);
          //console.log(Tag);
        let attributeNames = {'#fn':'_cellVariants'};
        let updateExpression =  'SET projectName = :projectName, ticketTag = :ticketTag, ticketDescription = :ticketDescription, ticketName = :ticketName, time_Stamp = :time_Stamp, projectId = :projectId, ticketSlug = :ticketSlug, #fn = :_cellVariants';
        let result = await dbClient.send(new UpdateItemCommand({TableName: TABLE_NAME, Key: { ticketId: { N: ticketId.toString() } }, ExpressionAttributeNames: attributeNames, ExpressionAttributeValues: ticket, UpdateExpression: updateExpression}));
        
        return result;
    } catch(error) {
        console.error(error);
    }
    
}

module.exports = {getTicket, getAllTicket, postNewTicket, updateTicket}