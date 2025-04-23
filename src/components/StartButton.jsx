import GlassIcons from './GlassIcons.jsx'
import PlayIcon from '../icons/Play.jsx'

function StartButton({ onStart }) {
  return (
    <div className='flex items-center justify-center'>
      <GlassIcons
        items={[
          {
            icon: <PlayIcon className='size-20' />,
            label: 'Iniciar',
            color: 'blue',
            customClass:
              'cursor-pointer rounded-[1.25em] font-bold text-4xl text-white'
          }
        ]}
        onStart={onStart}
      />
    </div>
  )
}

export default StartButton
