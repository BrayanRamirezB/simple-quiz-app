import React from 'react'
import StartButton from './StartButton'
import PlayIcon from '../icons/Play'
import PlusIcon from '../icons/Plus'
import ImportIcon from '../icons/ImportIcon'

const QuizControls = ({ onUseDefault, onCustomStart }) => {
  return (
    <div className='flex flex-row items-center justify-center gap-34'>
      <StartButton
        onClick={onUseDefault}
        label='Iniciar quiz'
        color='blue'
        icon={<PlayIcon className='size-20' />}
      />
      <StartButton
        onClick={() => document.getElementById('importQuizInput').click()}
        label='Importar quiz'
        color='orange'
        icon={<ImportIcon className='size-20' />}
      />
      <StartButton
        onClick={onCustomStart}
        label='Crear quiz'
        color='green'
        icon={<PlusIcon className='size-20' />}
      />
    </div>
  )
}

export default QuizControls
