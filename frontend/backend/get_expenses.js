import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const config = {};
if (process.env.DYNAMODB_ENDPOINT) {
    config.endpoint = process.env.DYNAMODB_ENDPOINT;
    config.credentials = { accessKeyId: "test", secretAccessKey: "test" };
    config.region = "us-east-1";
}
const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "Expenses";

export const handler = async () => {
    console.log("HANDLER START");
    console.log("Config:", JSON.stringify(config));
    try {
        const command = new ScanCommand({
            TableName: TABLE_NAME,
        });
        console.log("Sending command...");
        const response = await docClient.send(command);
        console.log("Success!");
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(response.Items),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: "Could not fetch expenses" }),
        };
    }
};
