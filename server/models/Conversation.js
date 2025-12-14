const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure unique conversation between two participants
// This simple index assumes 2 participants. For group chats, logic handles it differently.
// For now, we manually check existence before creation in the controller.

module.exports = mongoose.model('Conversation', conversationSchema);
