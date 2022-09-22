const { User, Thought } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
               .then(data => res.json(data))
               .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
               .then(data => {
                    if (!data) {
                        res.status(404).json({ message: 'No thought found with this ID' })
                        return
                    }

                    res.json(data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
    },

    createThought(req, res) {
        Thought.create(req.body)
               .then(({ _id }) => {
                    return User.findOneAndUpdate(
                        { username: req.body.username },
                        { $push: { thoughts: _id } },
                        { new: true }
                    )
               })
               .then(data => res.json(data))
               .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
               })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
               .then(data => {
                    if (!data) {
                        res.status(404).json({ message: 'No thought found with this ID' })
                        return
                    }

                    res.json(data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
               .then(data => {
                    if (!data) {
                        res.status(404).json({ message: 'No thought found with this ID' })
                        return
                    }

                    res.json(data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with this ID' })
                return
            }

            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with this ID' })
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

module.exports = thoughtController