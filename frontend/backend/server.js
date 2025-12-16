import express from 'express';
import cors from 'cors';
import { handler as getExpenses } from './get_expenses.js';
import { handler as createExpense } from './create_expense.js';
import { handler as deleteExpense } from './delete_expense.js';

const app = express();
app.use(cors());
app.use(express.json());

// Shim for Lambda event object
const createEvent = (body, pathParameters) => ({
    body: JSON.stringify(body),
    pathParameters
});

app.get('/expenses', async (req, res) => {
    console.log('GET /expenses');
    try {
        const result = await getExpenses();
        res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.post('/expenses', async (req, res) => {
    console.log('POST /expenses');
    try {
        const result = await createExpense(createEvent(req.body));
        res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.delete('/expenses/:id', async (req, res) => {
    console.log(`DELETE /expenses/${req.params.id}`);
    try {
        const result = await deleteExpense(createEvent(null, { id: req.params.id }));
        res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Local API Server running at http://localhost:${PORT}`);
    console.log(`Connected to DynamoDB at ${process.env.DYNAMODB_ENDPOINT || 'default'}`);
});
