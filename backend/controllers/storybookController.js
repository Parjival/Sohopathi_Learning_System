const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');
const { storybookPrompt } = require('../utils/prompts');

exports.createStorybook = async (req, res, next) => {
  try {
    const { content, title, options } = req.body;
    if(!content) return res.status(400).json({ message: 'content required' });
    const prompt = storybookPrompt(content, options || {});
    const payload = { prompt, title, options };
    const result = await callSkill('/create_storybook', payload).catch(err => { throw err; });
    const resource = await Resource.create({ owner: req.user._id, type: 'storybook', title: title || 'Storybook', meta: result.meta || {}, smythosId: result.id, storageUrl: result.url });
    res.json({ resource, result });
  } catch(err){ next(err); }
}
