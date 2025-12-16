import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';

const config = {};
if (process.env.DYNAMODB_ENDPOINT) {
    config.endpoint = process.env.DYNAMODB_ENDPOINT;
    config.credentials = { accessKeyId: "test", secretAccessKey: "test" };
    config.region = "us-east-1";
}
const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "Expenses";

export const handler = async (event) => {
    try {
        const { description, amount, date, category } = JSON.parse(event.body);
        const id = randomUUID();

        const newItem = {
            id,
            description,
            amount,
            date,
            category,
            createdAt: new Date().toISOString(),
        };

        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: newItem,
        });

        await docClient.send(command);

        return {
            statusCode: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newItem),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: "Could not create expense" }),
        };
    }
};
