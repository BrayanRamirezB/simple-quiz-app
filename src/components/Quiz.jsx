import DecryptedText from './DecryptedText'
import FuzzyText from './FuzzyText'
import TiltedCard from './TiltedCard'
import Counter from './Counter'
import { useState, useEffect } from 'react'
import Results from './Results'

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [time, setTime] = useState(60)
  const [showResults, setShowResults] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const bgColors = [
    'bg-blue-600/30',
    'bg-violet-600/30',
    'bg-pink-600/30',
    'bg-yellow-600/30'
  ]

  // Mezclar respuestas al cargar nueva pregunta
  useEffect(() => {
    const originalAnswers = questions[currentQuestion].answers
    const shuffled = [...originalAnswers].sort(() => Math.random() - 0.5)
    setShuffledAnswers(shuffled)
  }, [currentQuestion, questions])

  // Contador de tiempo
  useEffect(() => {
    if (isAnswering) return

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
            setSelectedAnswer(null)
            return 60
          } else {
            setShowResults(true)
            return 0
          }
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentQuestion, isAnswering, questions.length])

  const handleAnswerClick = (option) => {
    if (isAnswering) return

    setIsAnswering(true)
    setSelectedAnswer(option)

    const isCorrect = option === questions[currentQuestion].correct
    if (isCorrect) {
      setPoints((prev) => prev + (1 / questions.length) * 100)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setTime(60)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
        setTime(0)
      }
      setIsAnswering(false)
    }, 5000)
  }

  return (
    <div className='flex flex-col items-center justify-center h-full gap-14'>
      {showResults ? (
        <Results
          points={points}
          onClick={() => {
            setCurrentQuestion(0)
            setPoints(0)
            setTime(60)
            setShowResults(false)
            setSelectedAnswer(null)
          }}
        />
      ) : (
        <>
          <DecryptedText
            key={currentQuestion}
            text={questions[currentQuestion].question}
            animateOn='view'
            revealDirection='start'
            speed={60}
            maxIterations={10}
            sequential
            useOriginalCharsOnly
            parentClassName='text-neutral-100 text-6xl font-bold'
          />

          <div className='grid grid-cols-3 grid-rows-1 gap-x-20'>
            <div className='flex items-center justify-center bg-indigo-600/30 rounded-3xl saturate-150 backdrop-blur-md shadow-lg'>
              <Counter
                value={time}
                places={[10, 1]}
                fontSize={100}
                padding={5}
                gap={10}
                textColor='white'
                fontWeight={900}
              />
            </div>

            <FuzzyText baseIntensity={0.2} fontSize='clamp(2rem, 18vw, 18rem)'>
              ?
            </FuzzyText>

            <div className='flex flex-col items-center justify-center gap-y-2 bg-neutral-600/30 rounded-3xl saturate-150 backdrop-blur-md shadow-lg'>
              <h2 className='font-bold text-2xl text-neutral-100'>
                Puntuación
              </h2>
              <Counter
                value={points}
                places={[100, 10, 1]}
                fontSize={70}
                padding={5}
                gap={10}
                textColor='white'
                fontWeight={900}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-6'>
            {shuffledAnswers.map((option, index) => {
              const isCorrect = option === questions[currentQuestion].correct
              const isSelected = option === selectedAnswer

              let cardStyle = bgColors[index % bgColors.length]

              if (isAnswering) {
                if (isCorrect) {
                  cardStyle = 'bg-green-500/30'
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-red-500/30'
                }
              }

              return (
                <TiltedCard
                  key={`${option}-${index}`}
                  containerHeight='150px'
                  containerWidth='500px'
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  displayOverlayContent={true}
                  className={`${cardStyle} rounded-xl saturate-150 backdrop-blur-md shadow-lg ${
                    isAnswering && !isSelected
                      ? 'grayscale'
                      : 'cursor-pointer grayscale-0'
                  }`}
                  showTooltip={false}
                  onClick={() => handleAnswerClick(option)}
                  overlayContent={
                    <div className='flex flex-col items-center justify-center h-full w-full'>
                      <p className='font-bold text-xl text-neutral-100'>
                        {option}
                      </p>
                    </div>
                  }
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz
