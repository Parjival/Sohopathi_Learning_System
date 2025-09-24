const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.createStorybook = async (req, res, next) => {
  try {
    const { content, title, options = {} } = req.body;
    if(!content) return res.status(400).json({ message: 'content required' });
    
    // Prepare payload for SmythOS agent
    const payload = { 
      content, 
      title: title || 'Educational Storybook',
      options 
    };
    
    const result = await callSkill('create_storybook', payload);
    
    const resource = await Resource.create({ 
      owner: req.user._id, 
      type: 'storybook', 
      title: result.title || title || 'Storybook', 
      meta: result.meta || {}, 
      smythosId: result.id, 
      storageUrl: result.url 
    });
    
    res.json({ resource, result });
  } catch(err){ next(err); }
}
