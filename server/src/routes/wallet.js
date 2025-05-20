    import express from 'express';
    import { User, Transaction, WalletOperation } from '../db/structure.js';

    const router = express.Router();

    router.get('/:userId', async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                wallet: user.wallet,
                escrow: user.escrow
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.post('/operation', async (req, res) => {
        try {
            const { userId, operationType, metadata } = req.body;
            
            const operation = new WalletOperation({
                userId,
                operationType,
                metadata,
                status: 'pending'
            });
            
            await operation.save();
            res.status(201).json(operation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.get('/:userId/transactions', async (req, res) => {
        try {
            const transactions = await Transaction.find({ userId: req.params.userId })
                .sort({ createdAt: -1 })
                .limit(50);
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.post('/transaction', async (req, res) => {
        try {
            const { userId, type, amount, fromAddress, toAddress, metadata } = req.body;
            
            const transaction = new Transaction({
                userId,
                type,
                amount,
                fromAddress,
                toAddress,
                metadata,
                status: 'pending'
            });
            
            await transaction.save();
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    export default router; 