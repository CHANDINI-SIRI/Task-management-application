// 🔄 UPDATE TASK STATUS OR TITLE IN SERVER.JS
app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { status, title } = req.body;
  const updateFields = {};
  
  if (status !== undefined) updateFields.status = status;
  if (title !== undefined) updateFields.title = title;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updateFields },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to alter execution index state.' });
  }
});