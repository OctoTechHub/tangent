import express from 'express';
import { User } from '../db/structure.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { uuid, metadata } = req.body;
        
        const user = new User({
            uuid,
            metadata,
            isNewUser: true
        });
        
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/uuid/:uuid', async (req, res) => {
    try {
        const user = await User.findOne({ uuid: req.params.uuid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:userId', async (req, res) => {
    try {
        const { metadata } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: { metadata } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/session', async (req, res) => {
    try {
        const { sessionKey } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { 
                sessionKey,
                sessionKeyLastUpdated: new Date()
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Session key updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 