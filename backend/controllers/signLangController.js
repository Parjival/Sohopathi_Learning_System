const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.createSignVideo = async (req, res, next) => {
  try {
    const { content, title, dialect } = req.body;
    if(!content) return res.status(400).json({ message: 'content required' });
    const payload = { content, title, dialect };
    const result = await callSkill('/create_sign_language', payload);
    const resource = await Resource.create({ owner: req.user._id, type: 'sign_video', title: title||'SignVideo', meta: result.meta||{}, smythosId: result.id, storageUrl: result.url });
    res.json({ resource, result });
  } catch(err){ next(err); }
}
