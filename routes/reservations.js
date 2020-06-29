const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ReservationsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  // put your routes here
  router.get('/reservations', index);
  router.get('/reservations/new', auth, _new);
  router.get('/reservations', auth, create);
  router.get('/reservations/update', auth, update);
  router.get('/reservations/delete', auth, _delete);
  router.get('/reservations/edit', auth, edit);
  router.get('/reservations/:id', show);
};