import React from 'react'

const ConfirmOverlay = ({isOpen,title,message,onCancel,onConfirm}) => {
    if(!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-background rounded-lg p-6 max-w-md w-full mx-4 text-white'>
        <h3 className='text-xl font-semibold mb-2'>
          {title || 'Confirm Action'}
        </h3>
        <p className='mb-6 text-lg'>
          {message || 'Are you sure you want to proceed?'}
        </p>
        <div className='flex gap-3 justify-end text-lg'>
          <button 
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-black cursor-pointer'
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOverlay