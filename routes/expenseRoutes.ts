import { Router, Request, Response } from 'express';
import {export { ExpenseModel, IExpenseModel };} from './model/Expense';
import * as crypto from 'crypto';

const router = Router();

// Handle adding an expense
router.post('/expenses', async (req: Request, res: Response) => {
    const id = crypto.randomBytes(16).toString("hex");
    console.log(req.body);
    //res.status(201).json({ id, ...req.body }); // Respond with created expense
    res.send("success");
    var jsonObj = req.body;
    jsonObj.listId = id;
    try {
      await this.Lists.model.create([jsonObj]);
      res.send('{"id":"' + id + '"}');
    }
    catch (e) {
      console.error(e);
      console.log('object creation failed');
    }

});

// Handle fetching expenses
router.get('/expenses', async (req: Request, res: Response) => {
    // Logic to fetch expenses (dummy response for now)
    res.status(200).json({ message: 'Fetched expenses' });
});

export default router;
