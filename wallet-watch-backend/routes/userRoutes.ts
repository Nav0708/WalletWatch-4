import { Router, Request, Response } from 'express';
import * as crypto from 'crypto';
import { UserModel } from '../model/User';

export function  userRoutes(User: UserModel) : Router {
  const router = Router();
  
  /**
   * GET /user/:userId
   * Retrieves a single user by its unique userId.
   */
  router.get('/user/profie', async (req, res) => {
    var id = req.body.userId;
    try {
      await User.retrieveUserByUserId(res,id); 
    } catch (error) {
      console.error('Error retrieving user by Id:', error);
      res.status(500).send({ message: 'Failed to retrieve user by Id.' });
    }
   });
   /**
   * POST /users
   * Add a new user to the collection.
   * Generates a unique userId for each new entry.
   */
  router.post('/user', async (req: Request, res: Response) => {
      const id = crypto.randomBytes(16).toString("hex");
      const jsonObj = { ...req.body, userId: id };
      console.log(jsonObj);
      try {
        await User.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
      }

  });

  // DELETE /user
  router.delete('/user', async (req, res) => {
    const id = req.body.userId;
    console.log('Deleting User with ID:', id);
    try {
      const result = await User.model.deleteOne({ userId: id });
      if (result.deletedCount === 0) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.send({ message: 'User deleted successfully.' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ message: 'Failed to delete user.' });
    }
  });

  // PUT /user
  router.put('/user', async (req, res) => {
    const id = req.body.userId;
    const updatedData = req.body;
    try {
      const result = await User.model.updateOne({ userId: id }, { $set: updatedData });
      if (result.matchedCount === 0) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.send({ message: 'User updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ message: 'Failed to update user.' });
    }
  });
  return router;
};


