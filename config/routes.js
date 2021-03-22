const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users`);
const auth = require(`../controllers/auth`);

router.get(`/`, (req, res) => res.render(`home`));

router.get(`/signup`, users.signupPage);
router.post(`/signup`, users.signup);
router.get(`/login`, users.login);
router.post(`/login`, auth.login);

module.exports = router;
