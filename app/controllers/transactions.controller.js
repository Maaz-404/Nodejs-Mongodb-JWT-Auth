exports.view = function (req, res) {
    user.findOne(req.body.channelID, function (err, User) {
        if (err)
            res.send(err);
        res.json({
            message: 'transaction details loading..',
            data: user_id
        });
    });
}; 
