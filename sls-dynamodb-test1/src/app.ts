import { DynamoDB } from "aws-sdk";
const dynamodb = {
  tableName: "dynamodb-test-1",
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
};

async function main() {
  const client = new DynamoDB.DocumentClient(dynamodb);

  const params = {
    TableName: dynamodb.tableName,
    Item: { email: "test2" }
  };
  try {
    const data = await client.put(params).promise();
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  console.log("Hello from main");
}

async function scan() {
  try {
    const client = new DynamoDB.DocumentClient(dynamodb);

    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: dynamodb.tableName,
      KeyConditionExpression: "#email = :email",
      ExpressionAttributeNames: { "#email": "email" },
      ExpressionAttributeValues: { ":email": "test2" }
    };
    const data = await client.query(params).promise();

    console.log(data);

    console.log("Hello from scan");
  } catch (error) {}
}

scan();
