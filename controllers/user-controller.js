const User = require('../models/User')

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(data => res.json(data))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this ID' })
                    return
                }

                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    createUser(req, res) {
        User.create(req.body)
            .then(data => res.json(data))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this ID' })
                    return
                }

                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this ID' })
                    return
                }

                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this ID' })
                return
            }

            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this ID' })
                return
            }

            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
}

module.exports = userController