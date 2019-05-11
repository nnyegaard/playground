import { DynamoDB } from "aws-sdk";
import { addMinutes, getUnixTime } from "date-fns";
import { v4 as uuid4 } from "uuid";
import { DynamoDBStreamEvent } from "aws-lambda";

export async function insert() {
  try {
    const tableName = process.env.DYNAMODB_TABLE || "";

    const dynamoDB = {
      tableName: process.env.DYNAMODB_TABLE,
      region: process.env.DYNAMODB_REGION
    };
    const client = new DynamoDB.DocumentClient(dynamoDB);
    const currentTimePlusTwo = addMinutes(new Date(), 2);

    const params = {
      TableName: tableName,
      Item: {
        id: uuid4(),
        expireAt: getUnixTime(currentTimePlusTwo)
      }
    };

    await client.put(params).promise();

    return {
      statusCode: 200,
      body: "Inserted!"
    };
  } catch (error) {
    console.log("Error when inserting: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}

export async function steamTrigger(event: DynamoDBStreamEvent, context: any) {
  console.log("Event: ", event);
  event.Records.forEach(record => {
    console.log("EventName: ", record.eventName);
    console.log("EventSource: ", record.eventSource);
    console.log("EventDynamoDb: ", record.dynamodb);
  });
}

interface Records {
  eventID: string;
  eventName: string;
  eventVersion: string;
  eventSource: string;
  awsRegion: string;
  dynamodb: string[];
  eventSourceARN: string;
}

interface RootJson {
  Records: Records[];
}
