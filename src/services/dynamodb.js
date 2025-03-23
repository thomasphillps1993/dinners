import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dayjs from "dayjs";

// Configure AWS SDK v3 Client
const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.REACT_APP_DYNAMODB_TABLE || "dinners";

// Fetch dinners
export const fetchDinners = async () => {
  const command = new ScanCommand({ TableName: tableName });

  try {
    const data = await docClient.send(command);
    console.log("Fetched Dinners:", data);

    // Sort dinners by the 'time' (date)
    const sortedDinners = (data.Items || []).sort((a, b) => {
      return dayjs(a.time, "DD-MM-YY").isBefore(dayjs(b.time, "DD-MM-YY")) ? -1 : 1;
    });

    return sortedDinners;
  } catch (error) {
    console.error("Error fetching dinners:", error);
    return [];
  }
};

// Add a new dinner
export const addDinner = async (dinner) => {
  const formattedDate = dayjs(dinner.time, "HH:mm").format("DD-MM-YY"); // Convert to dd-mm-yy

  const command = new PutCommand({
    TableName: tableName,
    Item: {
      pk: Date.now().toString(), // Ensure pk is a string
      sk: dinner.name,
      description: dinner.description,
      time: formattedDate, // Store the formatted date
    },
  });

  try {
    await docClient.send(command);
  } catch (error) {
    console.error("Error adding dinner:", error);
  }
};

// Delete a dinner by pk
export const deleteDinner = async (pk, sk) => {
  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      pk: pk,  // Partition key
      sk: sk,  // Sort key
    },
  });

  try {
    await docClient.send(command);
  } catch (error) {
    console.error("Error deleting dinner:", error);
  }
};