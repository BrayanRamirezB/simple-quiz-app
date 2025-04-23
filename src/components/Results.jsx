function Results({ points, onClick }) {
  return (
    <div className='text-center text-white'>
      <h1 className='text-5xl font-bold mb-6'>Resultados</h1>
      <p className='text-2xl'>Puntaje: {points}%</p>
      <button
        className='mt-8 bg-indigo-600/30 px-6 py-3 rounded-lg text-white font-bold hover:bg-indigo-700/30 saturate-150 backdrop-blur-md transition cursor-pointer'
        onClick={onClick}
      >
        Reiniciar Quiz
      </button>
    </div>
  )
}

export default Results
