import { Router, Request, Response } from 'express';
import {ExpenseModel, IExpenseModel} from '../model/Expense';
import * as crypto from 'crypto';


export function  expenseRoutes(Expense: ExpenseModel) : Router {
  const router = Router();

  /**
   * GET /expenses/:expenseId
   * Retrieve a single expense by its unique expenseId.
   */

  router.get('/expenses/:expenseId', async (req, res) => {
    var id = req.params.expenseId;
    console.log('Query Expenses based on user Id '+ id);
    try {
      await Expense.retrieveExpensesByExpenseId(res,id); 
    } catch (error) {
      console.error('Error retrieving expenses by Id:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses by Id.' });
    }
   });

  /**
   * GET /expenses
   * Retrieve all expenses in the collection.
   */
  
  router.get('/expenses', async (req, res) => {
    console.log('Query All Expenses:',res);
    try {
      await Expense.retrieveAllExpenses(res);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses.' });
    }
   });
  
   /**
   * POST /expenses
   * Add a new expense to the collection.
   * Generates a unique expenseId for each new entry.
   */
  router.post('/expenses/:userid', async (req: Request, res: Response) => {
      const id = crypto.randomBytes(16).toString("hex");
      const userId = req.params.userid
      const jsonObj = { ...req.body, id, userId  };
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
  // DELETE /expenses/:expenseId
  router.delete('/expenses/:expenseId', async (req, res) => {
    const id = req.params.expenseId;
    console.log('Deleting Expense with ID:', id);
    try {
      const result = await Expense.model.deleteOne({ expenseId: id });
      if (result.deletedCount === 0) {
        res.status(404).send({ message: 'Expense not found.' });
      } else {
        res.send({ message: 'Expense deleted successfully.' });
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).send({ message: 'Failed to delete expense.' });
    }
  });

  // PUT /expenses/:expenseId
  router.put('/expenses/:expenseId', async (req, res) => {
    const id = req.params.expenseId;
    const updatedData = req.body;
    console.log('Updating Expense with ID:', id);
    try {
      const result = await Expense.model.updateOne({ expenseId: id }, { $set: updatedData });
      if (result.matchedCount === 0) {
        res.status(404).send({ message: 'Expense not found.' });
      } else {
        res.send({ message: 'Expense updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).send({ message: 'Failed to update expense.' });
    }
  });
  return router;
};


