// const express = require('express');
// const router = express.Router();
// const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// // POST a new comment
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(newComment);
//   } catch (err) {
//     // res.status(400).json(err);
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// });


// // DELETE a comment by id
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this ID' })
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
