const { Router } = require('express')

const { Quiz } = require('../../models')
const QuestionRouter = require('./questions')
const { Question } = require('../../models')

const router = new Router()

router.use('/:quizId/questions', QuestionRouter)

router.get('/', (req, res) => {
  try {
    let x = Quiz.get()
    let y = []
    for (let quiz of x){
      y.push({ ...quiz, question: Question.get().filter(q => parseInt(q.quizId, 10) === parseInt(quiz.id, 10))})
    }
    res.status(200).json(y)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    let x = Quiz.getById(req.params.quizId)
    x = { ...x, question: Question.get().filter(q => parseInt(q.quizId,10) === parseInt(x.id, 10))}
    res.status(200).json(x)
  } catch (err) {
    res.status(500).json(err.toString())
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
