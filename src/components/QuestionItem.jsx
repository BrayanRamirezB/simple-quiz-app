import React from 'react'
import TiltedCard from './TiltedCard'

const QuestionItem = ({ question, onDelete, onEdit }) => {
  return (
    <li className='p-4 rounded flex justify-between items-center w-2xl bg-black/30 backdrop-blur-md saturate-150'>
      <div className='flex flex-col gap-1 pointer-events-none'>
        <p className='font-bold text-neutral-100'>{question.question}</p>
        <p className='text-sm font-semibold text-neutral-300'>
          Opciones: {question.answers.join(', ')} | Correcta:{' '}
          <strong>{question.correct}</strong>
        </p>
      </div>
      <div className='flex gap-2'>
        <TiltedCard
          containerHeight='40px'
          containerWidth='80px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='bg-yellow-500/60 rounded-lg font-bold hover:bg-yellow-500/60 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={() => onEdit(question)}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-medium text-md text-neutral-100 whitespace-nowrap'>
                Editar
              </p>
            </div>
          }
        />

        <TiltedCard
          containerHeight='40px'
          containerWidth='80px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='bg-red-500/60 rounded-lg font-bold hover:bg-red-500/60 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={() => onDelete(question.id)}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-medium text-md text-neutral-100 whitespace-nowrap'>
                Eliminar
              </p>
            </div>
          }
        />
      </div>
    </li>
  )
}

export default QuestionItem
