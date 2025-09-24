const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.create = async (req, res, next) => {
  try {
    const { vocabulary_focus, age_level, communication_goals } = req.body;
    const payload = { vocabulary_focus, age_level, communication_goals };
    const result = await callSkill('/create_comm_board', payload);
    const resource = await Resource.create({ owner: req.user._id, type: 'comm_board', title: result.title||'Comm Board', meta: result.meta||{}, smythosId: result.id });
    res.json({ resource, result });
  } catch(err){ next(err); }
}
