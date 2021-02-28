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

async function postNewTicket(ticketId, Project, Tag, TicketDescription, TicketName, Timestamp, projectId, slug) {
    try{
        let ticket = {
            ticketId: {N: ticketId.toString()},
            Project: {S: Project},
            Tag: {S: Tag},
            TicketDescription: {S: TicketDescription},
            TicketName: {S: TicketName},
            Timestamp: {S: Timestamp},
            projectId: {N: projectId.toString()},
            slug: {S: slug}
          }
        let result = await dbClient.send(new PutItemCommand({TableName: TABLE_NAME, Item: ticket}));
        
        return project.projectId;
    } catch(error) {
        console.error(error);
    }
    
}

async function updateTicket(ticketId, Project, Tag, TicketDescription, TicketName, Timestamp, projectId, slug) {
    try{
        let ticket = {
            ticketId: {N: ticketId.toString()},
            Project: {S: Project},
            Tag: {S: Tag},
            TicketDescription: {S: TicketDescription},
            TicketName: {S: TicketName},
            Timestamp: {S: Timestamp},
            projectId: {N: projectId.toString()},
            slug: {S: slug}
          }
        let result = await dbClient.send(new UpdateItemCommand({TableName: TABLE_NAME, Key: { ticketId: { N: ticketId } }, Item: ticket}));
        
        return project.projectId;
    } catch(error) {
        console.error(error);
    }
    
}

module.exports = {getTicket, getAllTicket, postNewTicket, updateTicket}