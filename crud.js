const AWS = require('aws-sdk')
const tableName = 'sinhvien'
const tableName1 = 'lop'

AWS.config.update({
    accessKeyId : '',
    secretAccessKey : '',
    region : 'us-east-1'
})


const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

//https://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux

// const param = {
//     TableName : tableName,
//     KeySchema : [
//         {AttributeName : 'maso',KeyType: 'HASH'}
//     ],
//     AttributeDefinitions : [
//         {AttributeName : 'maso', AttributeType : 'S'}
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 1, 
//         WriteCapacityUnits: 1
//     }
// }


// const param1 = {
//     TableName : tableName1,
//     KeySchema : [
//         {AttributeName : 'malop',KeyType: 'HASH'}
//     ],
//     AttributeDefinitions : [
//         {AttributeName : 'malop', AttributeType : 'S'},
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 1, 
//         WriteCapacityUnits: 1
//     }
// }


// dynamodb.createTable(param1, (e,d) => {
//     if(d){
//         console.log(d)
//     }else{
//         console.log(e)
//     }
// })


module.exports = {
    AWS,
    tableName,
    tableName1,
    docClient,
    dynamodb
}