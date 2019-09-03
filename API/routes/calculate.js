module.exports = (router) => {
    router.post('/calculate', (req, res) => {
        const commission = req.body.value * 0.2;

        res.json({
            commission: commission
        });
    });
};