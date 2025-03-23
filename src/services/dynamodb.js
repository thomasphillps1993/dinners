import AWS from 'aws-sdk';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE || 'dinners';

// Fetch dinners from DynamoDB
export const fetchDinners = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error fetching dinners: ", error);
    return [];
  }
};

// Add a new dinner to DynamoDB
export const addDinner = async (dinner) => {
  const params = {
    TableName: tableName,
    Item: {
      pk: Date.now(), // Or a more complex unique id
      sk: dinner.name,
      description: dinner.description,
      time: dinner.time,
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (error) {
    console.error("Error adding dinner: ", error);
  }
};
