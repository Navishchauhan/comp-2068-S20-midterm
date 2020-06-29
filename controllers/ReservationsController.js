// You need to complete this controller with the required 7 actions
const viewPath = 'reservations';
const Reservation = require('../models/reservation');
const User = require('..models/user');

//action-1: Index
exports.index = async (req, res) => {
    try{
        const reservations = await Reservation
        .find()
        .populate('user');

        res.render(`${viewPath}/index`, {
            pageTitle: 'Your Reservation',
            reservations: reservations
        });
    }
    catch (error){
        req.flash('Danger!', `There was an error displaying your reservation: ${error}`);
        res.redirect('/');
    }
};

//action-2: Show
exports.show = async (req, res) => {
    try{
        const reservation = await Reservation.findById(req.param.id)
        .populate('user');

        res.render(`${viewPath}/show`, {
            pageTitle: reservation.user,
            reservation: reservation
        });
    }
    catch (error){
        req.flash('Danger!', `There was an error displaying reservation information: ${error}`);
        res.redirect('/');
    }
};

//action-3: New
exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Reservation'
    });
};

//action-4: Create
exports.create = async (req, res) => {
    try{
       const { user:email } = req.session.passport;
       const user = await User.findOne({email: email});
       console.log('User', user);
       const reservation = await Reservation.create({user: user._id, ...req.body});

       req.flash('success', 'your reservation was successful');
       res.redirect(`/reservations/${reservation.id}`);
    }
    catch (error){
       req.flash('Danger', `could not create your reservation: ${error}`);
       res.session.formData = req.body;
       res.redirect('reservations/new');
    }
};

//action-5: Edit
exports.edit = async (req, res) => {
    try{
       const reservation = await Reservation.findById(req.param.id);
       res.render(`${viewPath}/edit`, {
           pageTitle: reservation.user,
           formDate: reservation
       });
    }
    catch (error){
       req.flash('Danger', `there was an error editing your reservation: ${error}`);
       res.redirect('/');
    }
};

//action-6: Update
exports.update = async (req, res) => {
    try{
       const { user: email } = req.session.passport;
       const user = await User.findOne({email: email});

       let reservation = await Reservation.findById(req.body.id);
       if (!reservation) throw new Error('reservation could not be found');

       const attributes = {user: user._id, ...req.body};
       await Reservation.validate(attributes);
       await Reservation.findByIdAndUpdate(attributes.id, attributes);

       req.flash('success', 'your reservation was updated successful');
       res.redirect(`/reservations/${req.body.id}`);
    }
    catch (error){
       req.flash('Danger', `could not updating your reservation: ${error}`);
       res.redirect(`reservations/${req.body.id}/edit`);
    }
};

//action-7: Delete
exports.delete = async (req, res) => {
    try{
       console.log(req.body);
       await Reservation.deleteOne({_id: req.body.id});

       req.flash('success', 'your reservation was deleted successful');
       res.redirect(`/reservations`);
    }
    catch (error){
       req.flash('Danger', `there was an error deleting your reservation: ${error}`);
       res.redirect(`/reservations`);
    }
};