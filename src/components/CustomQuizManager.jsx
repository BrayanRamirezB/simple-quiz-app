import React from 'react'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'
import TiltedCard from './TiltedCard'

const CustomQuizManager = ({
  questions,
  editingQuestion,
  onAddOrUpdateQuestion,
  onCancelEdit,
  onDeleteQuestion,
  onEditQuestion,
  onStartCustomQuiz
}) => {
  return (
    <div className='w-full max-w-md flex flex-col items-center justify-center p-4'>
      <QuestionForm
        onAddQuestion={onAddOrUpdateQuestion}
        editingQuestion={editingQuestion}
        onCancelEdit={onCancelEdit}
      />
      <QuestionList
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
        onEditQuestion={onEditQuestion}
      />
      <TiltedCard
        containerHeight='100px'
        containerWidth='240px'
        rotateAmplitude={12}
        scaleOnHover={1.2}
        displayOverlayContent={true}
        className='mt-8 bg-emerald-500/40 rounded-lg text-white font-bold hover:bg-emerald-500/40 saturate-150 backdrop-blur-md cursor-pointer'
        showTooltip={false}
        onClick={onStartCustomQuiz}
        overlayContent={
          <div className='flex flex-col items-center justify-center h-full w-full'>
            <p className='font-semibold text-xl text-neutral-100'>
              Iniciar quiz
            </p>
          </div>
        }
      />
    </div>
  )
}

export default CustomQuizManager
