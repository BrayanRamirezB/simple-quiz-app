import React from 'react'

const QuestionItem = ({ question, onDelete, onEdit }) => {
  return (
    <li className='p-2 border rounded flex justify-between items-center'>
      <div>
        <p className='font-semibold'>{question.question}</p>
        <p className='text-sm text-gray-600'>
          Opciones: {question.answers.join(', ')} | Correcta:{' '}
          <strong>{question.correct}</strong>
        </p>
      </div>
      <div className='flex gap-2'>
        <button
          className='bg-yellow-500 text-white px-2 py-1 rounded'
          onClick={() => onEdit(question)}
        >
          Editar
        </button>
        <button
          className='bg-red-500 text-white px-2 py-1 rounded'
          onClick={() => onDelete(question.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default QuestionItem
