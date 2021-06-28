exports.view = function (req, res) {
    user.findOne(req.params.user._id, function (err, User) {
        if (err)
            res.send(err);
        res.json({
            message: 'transaction details loading..',
            data: product
        });
    });
}; 
