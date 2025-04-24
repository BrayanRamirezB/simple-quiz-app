import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ questions, onDeleteQuestion, onEditQuestion }) => {
  return (
    <ul className='mt-4 space-y-2'>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          onDelete={onDeleteQuestion}
          onEdit={onEditQuestion}
        />
      ))}
    </ul>
  )
}

export default QuestionList
