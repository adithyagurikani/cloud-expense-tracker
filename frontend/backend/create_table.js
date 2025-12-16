import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

// Intended for running on HOST machine to setup local DB
const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test"
    }
});

const run = async () => {
    try {
        const command = new CreateTableCommand({
            TableName: "Expenses",
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" }
            ],
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" }
            ],
            BillingMode: "PAY_PER_REQUEST"
        });

        const response = await client.send(command);
        console.log("Table 'Expenses' created successfully.");
    } catch (err) {
        if (err.name === 'ResourceInUseException') {
            console.log("Table 'Expenses' already exists.");
        } else {
            console.error("Error creating table:", err);
        }
    }
};

run();
