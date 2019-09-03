const { Commission } = require('../model');

module.exports = (router) => {
    router.post('/calculate', async (req, res) => {
        const commission = (await Commission.find())[0].commission;

        const result = req.body.value * commission;

        res.json({
            result: result
        });
    });
};