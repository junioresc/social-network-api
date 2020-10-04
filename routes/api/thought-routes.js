const router = require(`express`).Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    removeReaction,
    removeThought
} = require(`../../controllers/thought-controller`);

router
    .route(`/`)
    .get(getAllThought);

router
    .route(`/:id`)
    .get(getThoughtById)
    .put(updateThought);

router
    .route(`/:userId`)
    .post(addThought);

router
    .route(`/:thoughtId/reactions`)
    .post(addReaction);

router
    .route(`/:thoughtId/reactions/:reactionId`)
    .delete(removeReaction);

router
    .route(`/:userId/:thoughtId`)
    .delete(removeThought);

module.exports = router;