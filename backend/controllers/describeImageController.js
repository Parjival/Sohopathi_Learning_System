const { callSkill } = require('../services/smythosService');
const Resource = require('../models/Resource');

exports.describe = async (req, res, next) => {
  try {
    const { image_base64, context, detail_level } = req.body;
    if(!image_base64) return res.status(400).json({message:'image required'});
    const payload = { image_base64, context, detail_level };
    const result = await callSkill('/describe_image', payload);
    const resource = await Resource.create({ owner: req.user._id, type: 'image_description', title: result.title||'Image Description', meta: result.meta||{}, smythosId: result.id });
    res.json({ result, resource });
  } catch(err){ next(err); }
}
