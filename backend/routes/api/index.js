const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const entryRouter = require('./entry.js');
const cookbookRouter = require('./cookbook.js');

router.use('/session', sessionRouter);
router.use('/entries', entryRouter);
router.use('/users', usersRouter);
router.use('/cookbook', cookbookRouter);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
