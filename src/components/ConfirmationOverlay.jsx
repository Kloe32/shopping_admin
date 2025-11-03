import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'

const ConfirmationOverlay = ({
  title,
  textHtml,
  onCancel,
  onConfirm,
  icon,
  btnText,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center transform animate-scaleIn">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-2 text-sm text-gray-500">{textHtml}</div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 bg-white text-gray-700 font-semibold border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-100 transition-colors w-24"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2 bg-red-600 text-white font-semibold cursor-pointer rounded-lg shadow-md hover:bg-red-700 transition-colors w-24"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationOverlay
