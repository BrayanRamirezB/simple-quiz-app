import Squares from './components/Squares'
import StartButton from './components/StartButton'
import Quiz from './components/Quiz'
import { useState } from 'react'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleStart = () => {
    setIsPlaying(true)
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

      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
        {isPlaying ? <Quiz /> : <StartButton onStart={handleStart} />}
      </div>
    </div>
  )
}

export default App
