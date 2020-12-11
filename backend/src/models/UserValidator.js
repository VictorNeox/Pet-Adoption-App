class UserValidator {

    async static validateUser(login, email) {
        this.validateLogin(login);
        this.validateEmail(email);
        return true;
    }

    async static validateLogin(login) {
        const checkLogin = await connection('users').select('*').where({ login }).first();
        if (checkLogin) {
            return res.status(400).send({ message: 'This login is already been used.' });
        }
        return true;
    }

    async validateEmail(email) {
        const checkEmail = await connection('users').select('*').where({ email }).first();
        if (checkEmail) {
            return res.status(400).send({ message: 'This e-mail is already been used.' });
        }
        return true;
    }
}

module.exports = UserValidator;