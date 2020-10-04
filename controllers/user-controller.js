const { User } = require(`../models`);

const userController = {
    getAllUser(req, res) {
        User.find({})
            .select(`-__v`)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: `friends thoughts`,
                select: `-__v`
            })
            .select(`-__v`)
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: `No user was found with that id!` });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err))
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: `No user was found with this id! `});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: `No user was found with this id!` });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;