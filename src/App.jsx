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
    if (questions.length === 0) {
      setQuestions([]) // Asegurarse de que las preguntas estén inicializadas
    }
    setCustomMode(true)
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

  const handleGoBack = () => {
    setCustomMode(false)
  }

  const handleExportQuiz = () => {
    if (questions.length === 0) {
      toast.error({
        text: 'Error',
        description: 'Debe haber al menos una pregunta para exportar.',
        animationOnClose: 'swipe'
      })
      return
    }

    const quizData = JSON.stringify(questions, null, 2)
    const blob = new Blob([quizData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'quiz.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImportQuiz = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedQuestions = JSON.parse(e.target.result)
        if (!Array.isArray(importedQuestions)) {
          throw new Error('Invalid format')
        }
        setQuestions(importedQuestions)
        toast.success({
          text: 'Success',
          description: 'Quiz imported successfully!',
          animationOnClose: 'swipe'
        })
      } catch (error) {
        toast.error({
          text: 'Error',
          description: 'Failed to import quiz. Please check the file format.',
          animationOnClose: 'swipe'
        })
        console.error('Failed to import quiz:', error)
      }
    }
    reader.readAsText(file)
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
                onGoBack={handleGoBack} // Pasar la función handleGoBack como prop
                onExportQuiz={handleExportQuiz}
                handleImportQuiz={handleImportQuiz}
              />
            )}
          </>
        )}
        <input
          id='importQuizInput'
          type='file'
          accept='application/json'
          onChange={handleImportQuiz}
          className='hidden'
        />
      </div>
    </div>
  )
}

export default App
