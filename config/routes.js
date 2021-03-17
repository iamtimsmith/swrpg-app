const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users`);

router.get(`/`, (req, res) => res.send(`Test Message`));

router.get(`/signup`, users.signupPage);
router.post(`/signup`, users.signup);
router.get(`/login`, users.loginPage);

module.exports = router;
