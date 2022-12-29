
exports.get = (req, res, next) => {

    const { q } = req.query

    try {
        // navigation after logout
        if (q === 'logout') {
            return res.status(200).json('you have been successfully logged out to the home page')
        }

        res.status(200).json('welcome to the home page of the university')
    } catch (err) {
        next(err)
    }

}