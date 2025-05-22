require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const groupRoutes = require('./routes/groups');

app.use(cors());
app.use(express.json());
app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('Connection error', err));



const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  hobbies: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);



const express = require('express');
const router = express.Router();
const Group = require('../models/Group');


router.post('/', async (req, res) => {
  try {
    const group = new Group(req.body);
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a group
router.put('/:id', async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  router.delete('/:id', async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






module.exports = router;


