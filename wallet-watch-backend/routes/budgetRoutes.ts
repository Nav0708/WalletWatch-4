import { Router, Request, Response } from 'express';
import { CategoryModel } from '../model/Category';  // Import CategoryModel class


export function categoryRoutes(Category: CategoryModel): Router {
  const router = Router();

  /**
   * GET /categories
   * Retrieve all categories in the collection.
   */
  router.get('/categories', async (req: Request, res: Response) => {
    console.log('Query All Categories');
    try {
      await Category.retrieveAllCategories(res);  // Use method to get all categories
    } catch (error) {
      console.error('Error retrieving categories:', error);
      res.status(500).send({ message: 'Failed to retrieve categories.' });
    }
  });

  /**
   * GET /categories/:categoryId
   * Retrieve a single category by its unique categoryId.
   */
  router.get('/categories/:categoryId', async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    console.log('Query Category based on categoryId: ' + id);
    try {
      await Category.retrieveCategoryById(res, id);  // Use method to get category by ID
    } catch (error) {
      console.error('Error retrieving category by ID:', error);
      res.status(500).send({ message: 'Failed to retrieve category.' });
    }
  });

  /**
   * POST /categories
   * Add a new category to the collection.
   * Generates a unique categoryId for each new entry.
   */
  router.post('/categories', async (req: Request, res: Response) => {
      // Generate a unique categoryId
    const newCategory = { ...req.body };  // Add the generated categoryId to the request body

    console.log('New category data:', newCategory);

    try {
      // Since `CategoryModel` doesn't have a direct create method, you can either call the model's create
      // or use your own method to save the category. We'll directly use the model to create the category.
      const category = new Category.model(newCategory);  // Create new category document
      await category.save();  // Save the new category to the DB
      res.status(201).send({categoryId: category.categoryId});  // Respond with the categoryId
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).send({ message: 'Failed to create category.' });
    }
  });

  /**
   * DELETE /categories/:categoryId
   * Delete a category by its categoryId.
   */
  router.delete('/categories/:categoryId', async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    console.log('Deleting Category with ID:', id);
    try {
      const result = await Category.model.deleteOne({ categoryId: id });
      if (result.deletedCount === 0) {
        res.status(404).send({ message: 'Category not found.' });
      } else {
        res.status(200).send({ message: 'Category deleted successfully.' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send({ message: 'Failed to delete category.' });
    }
  });

  /**
   * PUT /categories/:categoryId
   * Update a category by its categoryId.
   */
  router.put('/categories/:categoryId', async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    const updatedData = req.body;
    console.log('Updating Category with ID:', id);
    try {
      const result = await Category.model.updateOne({ categoryId: id }, { $set: updatedData });
      if (result.matchedCount === 0) {
        res.status(404).send({ message: 'Category not found.' });
      } else {
        res.status(200).send({ message: 'Category updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).send({ message: 'Failed to update category.' });
    }
  });

  return router;
}
