const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get().filter((question) => parseInt(question.quizId, 10) === parseInt(req.params.quizId, 10)))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  let question
  try {
    question = Question.getById(req.params.questionId)
  } catch (err) {
    res.status(500).json(err)
  }
  if (parseInt(question.quizId, 10) !== parseInt(req.params.quizId, 10)) {
    res.status(500).json(`Didn't find this question in quiz ${req.params.quizId}`)
  } else {
    res.status(200).json(question)
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body })
    question.quizId = req.params.quizId
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:questionId', (req, res) => {
  const question = Question.get().find((q) => parseInt(q.id, 10) === parseInt(req.params.questionId, 10))
  if (question === undefined) {
    res.status(500).json(`Didn't find this question ${req.params.questionId}`)
  } else if (parseInt(question.quizId, 10) !== parseInt(req.params.quizId, 10)) {
    res.status(500).json(`Didn't find this question in quiz ${req.params.quizId}`)
  } else {
    res.status(200).json(Question.update(req.params.questionId, req.body))
  }
})

router.delete('/:questionId', (req, res) => {
  const question = Question.get().find((q) => parseInt(q.id, 10) === parseInt(req.params.questionId, 10))
  if (question === undefined) {
    res.status(500).json(`Didn't find this question ${req.params.questionId}`)
  } else if (parseInt(question.quizId, 10) !== parseInt(req.params.quizId, 10)) {
    res.status(500).json(`Didn't find this question in quiz ${req.params.quizId}`)
  } else {
    res.status(200).json(Question.delete(req.params.questionId))
  }
})

module.exports = router
