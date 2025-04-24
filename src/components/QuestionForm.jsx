import { useState, useEffect } from 'react'
import { toast } from '@pheralb/toast'
import TiltedCard from './TiltedCard'
import FloatingInput from './FloatingInput'

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
      toast.error({
        text: 'Error',
        description: 'Debe haber entre 2 y 4 respuestas.',
        animationOnClose: 'swipe'
      })
      return
    }

    if (!validAnswers.includes(correct)) {
      toast.error({
        text: 'Error',
        description: 'La respuesta correcta debe estar entre las opciones.',
        animationOnClose: 'swipe'
      })
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
    <form
      onSubmit={handleSubmit}
      className='mb-4 space-y-2 bg-black/30 p-8 rounded-xl shadow-lg saturate-150 backdrop-blur-md flex flex-col items-center justify-center gap-2 w-3xl'
    >
      <FloatingInput
        id='question'
        label='Pregunta'
        value={question}
        required={true}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {answers.map((a, i) => (
        <FloatingInput
          key={i}
          label={`Respuesta ${i + 1}`}
          value={a}
          onChange={(e) => handleAnswerChange(i, e.target.value)}
        />
      ))}
      <FloatingInput
        label='Respuesta correcta'
        value={correct}
        onChange={(e) => setCorrect(e.target.value)}
      />

      <TiltedCard
        containerHeight='40px'
        containerWidth='170px'
        rotateAmplitude={12}
        scaleOnHover={1.2}
        displayOverlayContent={true}
        className='bg-blue-500/40 rounded-lg font-bold hover:bg-blue-500/40 saturate-150 backdrop-blur-md cursor-pointer'
        showTooltip={false}
        type='submit'
        overlayContent={
          <div className='flex flex-col items-center justify-center h-full w-full'>
            <p className='font-medium text-md text-neutral-100 whitespace-nowrap'>
              {editingQuestion ? 'Guardar cambios' : 'Agregar pregunta'}
            </p>
          </div>
        }
      />

      {editingQuestion && (
        <TiltedCard
          containerHeight='40px'
          containerWidth='170px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='bg-red-500/40 rounded-lg font-bold hover:bg-red-500/40 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={onCancelEdit}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-medium text-md text-neutral-100 whitespace-nowrap'>
                Cancelar
              </p>
            </div>
          }
        />
      )}
    </form>
  )
}
