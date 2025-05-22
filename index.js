require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose schema with imageUrl added
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  hobbies: [String],
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Group = mongoose.model('Group', groupSchema);

// Create group
app.post('/api/groups', async (req, res) => {
  try {
    const group = new Group(req.body);
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all groups
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get group by ID
app.get('/api/groups/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update group by ID
app.put('/api/groups/:id', async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete group
app.delete('/api/groups/:id', async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// POST /api/groups/join
router.post('/groups/join', async (req, res) => {
  const { userEmail, groupId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const existing = await UserGroup.findOne({ userEmail, groupId });
    if (existing) {
      return res.status(400).json({ message: 'Group already added' });
    }

    const userGroup = new UserGroup({ userEmail, groupId });
    await userGroup.save();
    res.status(201).json(userGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
