const express = require('express');
const authMiddleware = require('../middleware/auth');
const Collection = require('../models/Collection');
const Sprite = require('../models/Sprite');

const router = express.Router();

// Get user's collection
router.get('/', authMiddleware, async (req, res) => {
  try {
    const collection = await Collection.find({ userId: req.userId }).populate('spriteId');
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle sprite ownership
router.post('/toggle/:spriteId', authMiddleware, async (req, res) => {
  try {
    let collection = await Collection.findOne({ 
      userId: req.userId, 
      spriteId: req.params.spriteId 
    });
    
    if (!collection) {
      collection = new Collection({ 
        userId: req.userId, 
        spriteId: req.params.spriteId, 
        owned: true 
      });
    } else {
      collection.owned = !collection.owned;
    }
    
    await collection.save();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's owned sprites count
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const total = await Sprite.countDocuments();
    const owned = await Collection.countDocuments({ userId: req.userId, owned: true });
    
    res.json({ total, owned, percentage: Math.round((owned / total) * 100) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
