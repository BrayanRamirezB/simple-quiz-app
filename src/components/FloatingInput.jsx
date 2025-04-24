import { useState } from 'react'

function FloatingInput({
  label,
  id,
  type = 'text',
  required = false,
  validate,
  value,
  onChange,
  errorMessage = 'Este campo es obligatorio'
}) {
  const [touched, setTouched] = useState(false)

  const isValid = validate ? validate(value) : !required || value.trim() !== ''
  const showError = touched && !isValid

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        value={value}
        placeholder=''
        required={required}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        className={`peer w-full rounded-md border px-3 pt-5 pb-2 text-sm placeholder-transparent transition-all
          ${
            showError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }
          focus:outline-none focus:ring-1`}
      />
      <label
        className={`absolute left-3 text-sm text-gray-500 transition-all
    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
    peer-focus:top-0.5 peer-focus:text-sm ${
      showError
        ? 'text-red-500 peer-focus:text-red-500'
        : 'peer-focus:text-indigo-500'
    }`}
        style={{ pointerEvents: 'none' }} // Deshabilitamos la interacción del label
      >
        {label}
      </label>
      {showError && <p className='mt-1 text-xs text-red-600'>{errorMessage}</p>}
    </div>
  )
}

export default FloatingInput
