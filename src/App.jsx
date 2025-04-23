import Squares from './components/Squares'
import StartButton from './components/StartButton'
import Quiz from './components/Quiz'
import { useState } from 'react'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleStart = () => {
    setIsPlaying(true)
  }

  const questions = [
    {
      question: 'What is the capital of France?',
      correct: 'Paris',
      answers: ['London', 'Berlin', 'Madrid', 'Paris']
    },
    {
      question: 'What is the capital of Germany?',
      correct: 'Berlin',
      answers: ['London', 'Moscu', 'Rome', 'Berlin']
    },
    {
      question: 'What is the capital of Italy?',
      correct: 'Rome',
      answers: ['Milan', 'Rome']
    },
    {
      question: 'What is the capital of Spain?',
      correct: 'Madrid',
      answers: ['Barcelona', 'Valencia', 'Sevilla', 'Madrid']
    },
    {
      question: 'What is the capital of México?',
      correct: 'México City',
      answers: ['Guadalajara', 'Monterrey', 'México City']
    }
  ]

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

      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
        {isPlaying ? (
          <Quiz questions={questions} />
        ) : (
          <StartButton onStart={handleStart} />
        )}
      </div>
    </div>
  )
}

export default App
