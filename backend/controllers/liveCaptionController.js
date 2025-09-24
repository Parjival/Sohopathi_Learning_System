const { callSkill } = require('../services/smythosService');

exports.startLiveCaption = async (req, res, next) => {
  try {
    const { audio_base64, language = 'en' } = req.body;
    if(!audio_base64) return res.status(400).json({message:'audio_base64 required'});
    
    const payload = { 
      audio_stream: audio_base64, // Map to expected field name
      language 
    };
    
    const result = await callSkill('live_caption', payload);
    res.json(result);
  } catch(err){ next(err); }
}
