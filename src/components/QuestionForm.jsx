import { useState, useEffect } from 'react'

export default function QuestionForm({
  onAddQuestion,
  editingQuestion,
  onCancelEdit
}) {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [correct, setCorrect] = useState('')

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion.question)
      setAnswers([...editingQuestion.answers, '', '', '', ''].slice(0, 4))
      setCorrect(editingQuestion.correct)
    }
  }, [editingQuestion])

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validAnswers = answers.filter((a) => a.trim() !== '')

    if (validAnswers.length < 2 || validAnswers.length > 4) {
      alert('Debe haber entre 2 y 4 respuestas.')
      return
    }

    if (!validAnswers.includes(correct)) {
      alert('La respuesta correcta debe estar entre las opciones.')
      return
    }

    const newQuestion = {
      id: editingQuestion?.id || crypto.randomUUID(),
      question,
      correct,
      answers: validAnswers
    }

    onAddQuestion(newQuestion)

    // Reset form
    setQuestion('')
    setAnswers(['', '', '', ''])
    setCorrect('')
    if (onCancelEdit) onCancelEdit()
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4 space-y-2'>
      <input
        className='border p-2 w-full'
        placeholder='Pregunta'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {answers.map((a, i) => (
        <input
          key={i}
          className='border p-2 w-full'
          placeholder={`Respuesta ${i + 1}`}
          value={a}
          onChange={(e) => handleAnswerChange(i, e.target.value)}
        />
      ))}
      <input
        className='border p-2 w-full'
        placeholder='Respuesta correcta'
        value={correct}
        onChange={(e) => setCorrect(e.target.value)}
      />
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded'
        type='submit'
      >
        {editingQuestion ? 'Guardar cambios' : 'Agregar pregunta'}
      </button>
      {editingQuestion && (
        <button
          type='button'
          className='ml-2 bg-gray-400 text-white px-4 py-2 rounded'
          onClick={onCancelEdit}
        >
          Cancelar
        </button>
      )}
    </form>
  )
}
