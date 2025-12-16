import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config = {};
if (process.env.DYNAMODB_ENDPOINT) {
    config.endpoint = process.env.DYNAMODB_ENDPOINT;
}

const client = new DynamoDBClient(config);
export const docClient = DynamoDBDocumentClient.from(client);
export const TABLE_NAME = process.env.TABLE_NAME || "Expenses";
