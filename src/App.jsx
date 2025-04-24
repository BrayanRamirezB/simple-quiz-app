import { useState } from 'react'
import Squares from './components/Squares'
import Quiz from './components/Quiz'
import QuizControls from './components/QuizControls'
import CustomQuizManager from './components/CustomQuizManager'
import { toast } from '@pheralb/toast'

const defaultQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    correct: 'Paris',
    answers: ['London', 'Berlin', 'Madrid', 'Paris']
  },
  {
    id: '2',
    question: 'What is the capital of Germany?',
    correct: 'Berlin',
    answers: ['London', 'Moscu', 'Rome', 'Berlin']
  },
  {
    id: '3',
    question: 'What is the capital of Italy?',
    correct: 'Rome',
    answers: ['Milan', 'Rome']
  }
]

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [questions, setQuestions] = useState([])
  const [customMode, setCustomMode] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)

  const handleUseDefault = () => {
    setQuestions(defaultQuestions)
    setIsPlaying(true)
  }

  const handleCustomStart = () => {
    setCustomMode(true)
    setQuestions([])
  }

  const handleAddOrUpdateQuestion = (newQuestion) => {
    setQuestions((prev) => {
      const exists = prev.find((q) => q.id === newQuestion.id)
      if (exists) {
        return prev.map((q) => (q.id === newQuestion.id ? newQuestion : q))
      }
      return [...prev, newQuestion]
    })
  }

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion(question)
  }

  const handleCancelEdit = () => {
    setEditingQuestion(null)
  }

  const handleStartCustomQuiz = () => {
    if (questions.length === 0) {
      toast.error({
        text: 'Error',
        description: 'Agrega al menos una pregunta.',
        animationOnClose: 'swipe'
      })
      return
    }
    setIsPlaying(true)
  }

  const handleFinishQuiz = () => {
    setIsPlaying(false)
  }

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <Squares
          direction='diagonal'
          speed={0.3}
          borderColor='#999'
          squareSize={40}
        />
      </div>

      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4'>
        {isPlaying ? (
          <Quiz questions={questions} onFinish={handleFinishQuiz} />
        ) : (
          <>
            {!customMode ? (
              <QuizControls
                onUseDefault={handleUseDefault}
                onCustomStart={handleCustomStart}
              />
            ) : (
              <CustomQuizManager
                questions={questions}
                editingQuestion={editingQuestion}
                onAddOrUpdateQuestion={handleAddOrUpdateQuestion}
                onCancelEdit={handleCancelEdit}
                onDeleteQuestion={handleDeleteQuestion}
                onEditQuestion={handleEditQuestion}
                onStartCustomQuiz={handleStartCustomQuiz}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
