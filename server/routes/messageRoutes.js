const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// Get all conversations for the current user
router.get('/conversations', protect, async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user.id
        })
            .populate('participants', 'name avatar') // adjust fields as needed
            .populate('lastMessage')
            .sort({ lastMessageAt: -1 });

        res.json(conversations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start a new conversation or get existing one
router.post('/conversations', protect, async (req, res) => {
    const { recipientId } = req.body;

    if (!recipientId) {
        return res.status(400).json({ message: 'Recipient ID is required' });
    }

    try {
        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [req.user.id, recipientId] }
        }).populate('participants', 'name avatar');

        if (conversation) {
            return res.json(conversation);
        }

        // Create new conversation
        conversation = await Conversation.create({
            participants: [req.user.id, recipientId]
        });

        conversation = await conversation.populate('participants', 'name avatar');
        res.json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get messages for a conversation
router.get('/messages/:conversationId', protect, async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
            .sort({ createdAt: 1 }); // Oldest first

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Send a message
router.post('/messages', protect, async (req, res) => {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
        return res.status(400).json({ message: 'Conversation ID and content are required' });
    }

    try {
        const newMessage = await Message.create({
            conversationId,
            sender: req.user.id,
            content
        });

        // Update conversation with last message
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: newMessage._id,
            lastMessageAt: Date.now()
        });

        res.json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
