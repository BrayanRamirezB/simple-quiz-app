import React from 'react'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'
import TiltedCard from './TiltedCard'
import { toast } from '@pheralb/toast'

const CustomQuizManager = ({
  questions,
  editingQuestion,
  onAddOrUpdateQuestion,
  onCancelEdit,
  onDeleteQuestion,
  onEditQuestion,
  onStartCustomQuiz,
  onGoBack,
  onExportQuiz
}) => {
  const handleStartQuiz = () => {
    if (questions.length === 0) {
      toast.error({
        text: 'Error',
        description:
          'Debe haber al menos una pregunta personalizada para iniciar el quiz.',
        animationOnClose: 'swipe'
      })
      return
    }
    onStartCustomQuiz()
  }

  return (
    <div className='w-full max-w-4xl flex flex-col items-center justify-center p-4'>
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

      <div className='flex flex-row items-center justify-between w-full'>
        <TiltedCard
          containerHeight='100px'
          containerWidth='198px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='mt-8 bg-red-500/40 rounded-lg font-bold hover:bg-red-500/40 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={onGoBack}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-semibold text-xl text-neutral-100'>Regresar</p>
            </div>
          }
        />

        <TiltedCard
          containerHeight='100px'
          containerWidth='198px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='mt-8 bg-violet-500/40 rounded-lg font-bold hover:bg-violet-500/40 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={onExportQuiz}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-semibold text-xl text-neutral-100'>Exportar</p>
            </div>
          }
        />

        <TiltedCard
          containerHeight='100px'
          containerWidth='198px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='mt-8 bg-zinc-700/40 rounded-lg font-bold hover:bg-zinc-700/40 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={() => document.getElementById('importQuizInput').click()}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-semibold text-xl text-neutral-100'>Importar</p>
            </div>
          }
        />

        <TiltedCard
          containerHeight='100px'
          containerWidth='198px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='mt-8 bg-emerald-500/40 rounded-lg font-bold hover:bg-emerald-500/40 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={handleStartQuiz}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-semibold text-xl text-neutral-100'>
                Iniciar quiz
              </p>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CustomQuizManager
