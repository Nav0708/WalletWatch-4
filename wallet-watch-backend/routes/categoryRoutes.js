"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = categoryRoutes;
const express_1 = require("express");
function categoryRoutes(Category) {
    const router = (0, express_1.Router)();
    /**
     * GET /categories
     * Retrieve all categories in the collection.
     */
    router.get('/categories', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('Query All Categories');
        try {
            yield Category.retrieveAllCategories(res); // Use method to get all categories
        }
        catch (error) {
            console.error('Error retrieving categories:', error);
            res.status(500).send({ message: 'Failed to retrieve categories.' });
        }
    }));
    /**
     * GET /categories/:categoryId
     * Retrieve a single category by its unique categoryId.
     */
    router.get('/categories/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        console.log('Query Category based on categoryId: ' + id);
        try {
            yield Category.retrieveCategoryById(res, id); // Use method to get category by ID
        }
        catch (error) {
            console.error('Error retrieving category by ID:', error);
            res.status(500).send({ message: 'Failed to retrieve category.' });
        }
    }));
    /**
     * POST /categories
     * Add a new category to the collection.
     * Generates a unique categoryId for each new entry.
     */
    router.post('/categories', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // Generate a unique categoryId
        const newCategory = Object.assign({}, req.body); // Add the generated categoryId to the request body
        console.log('New category data:', newCategory);
        try {
            // Since `CategoryModel` doesn't have a direct create method, you can either call the model's create
            // or use your own method to save the category. We'll directly use the model to create the category.
            const category = new Category.model(newCategory); // Create new category document
            yield category.save(); // Save the new category to the DB
            res.status(201).send({ categoryId: category.categoryId }); // Respond with the categoryId
        }
        catch (error) {
            console.error('Error creating category:', error);
            res.status(500).send({ message: 'Failed to create category.' });
        }
    }));
    /**
     * DELETE /categories/:categoryId
     * Delete a category by its categoryId.
     */
    router.delete('/categories/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        console.log('Deleting Category with ID:', id);
        try {
            const result = yield Category.model.deleteOne({ categoryId: id });
            if (result.deletedCount === 0) {
                res.status(404).send({ message: 'Category not found.' });
            }
            else {
                res.status(200).send({ message: 'Category deleted successfully.' });
            }
        }
        catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).send({ message: 'Failed to delete category.' });
        }
    }));
    /**
     * PUT /categories/:categoryId
     * Update a category by its categoryId.
     */
    router.put('/categories/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const updatedData = req.body;
        console.log('Updating Category with ID:', id);
        try {
            const result = yield Category.model.updateOne({ categoryId: id }, { $set: updatedData });
            if (result.matchedCount === 0) {
                res.status(404).send({ message: 'Category not found.' });
            }
            else {
                res.status(200).send({ message: 'Category updated successfully.' });
            }
        }
        catch (error) {
            console.error('Error updating category:', error);
            res.status(500).send({ message: 'Failed to update category.' });
        }
    }));
    return router;
}
