const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.createAudiobook = async (req, res, next) => {
  try {
    const { content, title, voice_preference } = req.body;
    if(!content) return res.status(400).json({ message: 'content required' });
    
    const payload = { 
      content, 
      title: title || 'Educational Audiobook',
      voice_preference: voice_preference || 'alloy'
    };
    
    const result = await callSkill('create_audiobook', payload);
    
    const resource = await Resource.create({ 
      owner: req.user._id, 
      type: 'audiobook', 
      title: result.title || title || 'Audiobook', 
      meta: result.meta || {}, 
      smythosId: result.id, 
      storageUrl: result.url 
    });
    
    res.json({ resource, result });
  } catch(err){ next(err); }
}
