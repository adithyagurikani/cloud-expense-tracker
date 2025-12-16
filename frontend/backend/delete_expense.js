import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

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
        const { id } = event.pathParameters;

        const command = new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { id },
        });

        await docClient.send(command);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Expense deleted" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: "Could not delete expense" }),
        };
    }
};
