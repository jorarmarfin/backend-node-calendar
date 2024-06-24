
const userCreate = (req, res) => {
    const { name, email, password } = req.body;
    res.json({
        status: 'success',
        message: 'User created',
        data: {
            name,
            email,
            password
        }
    });
}

const signIn = (req, res) => {
    const { email, password } = req.body;
    res.json({
        message: 'Sign In'
    });
}
const refreshToken = (req, res) => {
    res.json({
        message: 'Refresh Token'
    });
}

module.exports = {
    userCreate,
    signIn,
    refreshToken
}