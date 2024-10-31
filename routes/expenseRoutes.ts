import { Router, Request, Response } from 'express';
import {ExpenseModel, IExpenseModel} from '../model/Expense';
import * as crypto from 'crypto';


export function  expenseRoutes(Expense: ExpenseModel) : Router {
  const router = Router();

  router.get('/expenses/:expenseId', async (req, res) => {
    var id = req.params.expenseId;
    console.log('Query Expenses based on user Id'+ id);
    try {
      await Expense.retrieveExpensesByUserId(res,id); 
    } catch (error) {
      console.error('Error retrieving expenses by Id:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses by Id.' });
    }
   });
  
  router.get('/expenses', async (req, res) => {
    console.log('Query All Expenses');
    try {
      await Expense.retrieveAllExpenses(res);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses.' });
    }
   });
  
  router.post('/expenses', async (req: Request, res: Response) => {
      const id = crypto.randomBytes(16).toString("hex");
      const jsonObj = { ...req.body, expenseId: id };
      console.log(jsonObj);
      console.log("ExpenseModel:", Expense);
      try {
        await Expense.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
      }

  });
  return router;
};


