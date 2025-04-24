import GlassIcons from './GlassIcons.jsx'

function StartButton({ label = '', color = 'blue', onClick, icon = '' }) {
  return (
    <div className='flex items-center justify-center'>
      <GlassIcons
        items={[
          {
            icon: icon,
            label: label,
            color: color,
            customClass:
              'cursor-pointer rounded-[1.25em] font-bold text-4xl text-white'
          }
        ]}
        onStart={onClick}
      />
    </div>
  )
}

export default StartButton
