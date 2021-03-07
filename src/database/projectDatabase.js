const aws = require("aws-sdk");
aws.config.update({secretAccessKey: process.env.aws_secret_access_key,
    accessKeyId: process.env.aws_access_key_id,
    region: "us-east-2"})
const {
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
    PutItemCommand,
} = require('@aws-sdk/client-dynamodb');

// aws.config.getCredentials(function(err) {
//     if (err) console.log(err.stack);
//     // credentials not loaded
//     else {
//       console.log("Access key:", aws.config.credentials.accessKeyId);
//   }
// })

const dbClient =  new DynamoDBClient({region:"us-east-2"});
const TABLE_NAME = "Project"


async function getProject(projectId) {
    try{
        let result = await dbClient.send(new GetItemCommand({ TableName: TABLE_NAME, Key: { projectId: { N: projectId } } }))
        let response = aws.DynamoDB.Converter.unmarshall(result.Item);
        console.log(response);
        return response;
    } catch(error) {
        console.error(error);
    }
    
}

async function getAllProject() {
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

async function postNewProject(projectId, projectName, projectSlug, projectDesc) {
    try{
        let project = {
            description: {S: projectDesc},
            name: {S: projectName},
            projectId: {N: projectId.toString()},
            slug: {S: projectSlug}
          }
        let result = await dbClient.send(new PutItemCommand({TableName: TABLE_NAME, Item: project}));
        
        return project.projectId;
    } catch(error) {
        console.error(error);
    }
    
}

module.exports = {getProject, getAllProject, postNewProject}