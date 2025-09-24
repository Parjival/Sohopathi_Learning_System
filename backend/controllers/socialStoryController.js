const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.createSocialStory = async (req, res, next) => {
  try {
    const { situation, student_name, specific_needs } = req.body;
    if(!situation) return res.status(400).json({message:'situation required'});
    const payload = { situation, student_name, specific_needs };
    const result = await callSkill('/create_social_story', payload);
    const resource = await Resource.create({ owner: req.user._id, type: 'social_story', title: result.title||'Social Story', meta: result.meta||{}, smythosId: result.id, storageUrl: result.url });
    res.json({ resource, result });
  } catch(err){ next(err); }
}
