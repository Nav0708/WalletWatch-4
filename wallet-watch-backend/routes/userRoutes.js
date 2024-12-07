"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userRoutes = userRoutes;
const express_1 = require("express");
const crypto = __importStar(require("crypto"));
function userRoutes(User) {
    const router = (0, express_1.Router)();
    /**
     * GET /user/:userId
     * Retrieves a single user by its unique userId.
     */
    router.get('/user/profie', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var id = req.body.userId;
        try {
            yield User.retrieveUserByUserId(res, id);
        }
        catch (error) {
            console.error('Error retrieving user by Id:', error);
            res.status(500).send({ message: 'Failed to retrieve user by Id.' });
        }
    }));
    /**
    * POST /users
    * Add a new user to the collection.
    * Generates a unique userId for each new entry.
    */
    router.post('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = crypto.randomBytes(16).toString("hex");
        const jsonObj = Object.assign(Object.assign({}, req.body), { userId: id });
        console.log(jsonObj);
        try {
            yield User.model.create([jsonObj]);
            res.send('{"id":"' + id + '"}');
        }
        catch (e) {
            console.error(e);
            console.log('object creation failed');
        }
    }));
    // DELETE /user
    router.delete('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.body.userId;
        console.log('Deleting User with ID:', id);
        try {
            const result = yield User.model.deleteOne({ userId: id });
            if (result.deletedCount === 0) {
                res.status(404).send({ message: 'User not found.' });
            }
            else {
                res.send({ message: 'User deleted successfully.' });
            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send({ message: 'Failed to delete user.' });
        }
    }));
    // PUT /user
    router.put('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.body.userId;
        const updatedData = req.body;
        try {
            const result = yield User.model.updateOne({ userId: id }, { $set: updatedData });
            if (result.matchedCount === 0) {
                res.status(404).send({ message: 'User not found.' });
            }
            else {
                res.send({ message: 'User updated successfully.' });
            }
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send({ message: 'Failed to update user.' });
        }
    }));
    return router;
}
;
