import TiltedCard from './TiltedCard'
import DecryptedText from './DecryptedText'

function Results({ points, onClick }) {
  return (
    <div className='relative p-20 box-border'>
      <div className='absolute inset-0 bg-black/40 rounded-4xl blur-lg'></div>
      <div className='relative text-center text-neutral-100 flex flex-col items-center justify-center'>
        <DecryptedText
          text='Resultados'
          animateOn='view'
          revealDirection='start'
          speed={60}
          maxIterations={10}
          sequential
          useOriginalCharsOnly
          parentClassName='text-neutral-100 text-7xl font-bold mb-6'
        />

        <DecryptedText
          text={`Puntaje: ${points}%`}
          animateOn='view'
          revealDirection='start'
          speed={60}
          maxIterations={10}
          sequential
          useOriginalCharsOnly
          parentClassName='text-neutral-100 text-4xl font-semibold mb-6'
        />

        <TiltedCard
          containerHeight='120px'
          containerWidth='320px'
          rotateAmplitude={12}
          scaleOnHover={1.2}
          displayOverlayContent={true}
          className='mt-8 bg-indigo-600/30 rounded-lg text-white font-bold hover:bg-indigo-700/30 saturate-150 backdrop-blur-md cursor-pointer'
          showTooltip={false}
          onClick={onClick}
          overlayContent={
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <p className='font-semibold text-2xl text-neutral-100'>
                Reiniciar Quiz
              </p>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default Results
