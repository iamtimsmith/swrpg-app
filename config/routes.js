const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users`);

router.get(`/`, (req, res) => res.render(`home`));

router.get(`/signup`, users.signupPage);
router.post(`/signup`, users.signup);
router.get(`/login`, users.loginPage);
router.post(`/login`, users.login);

module.exports = router;
