import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { RiCloseLargeFill } from 'react-icons/ri'
import {
  fetchUnits,
  fetchRates,
  addNewUnit,
  deleteUnit,
  updateUnit,
} from '../services/unit.services'
import { toast } from 'react-toastify'
import ConfirmationOverlay from '../components/ConfirmationOverlay'

const Unit = () => {
  const [units, setUnits] = useState([])
  const [rates, setRates] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUnit, setCurrentUnit] = useState(null)
  const [unitName, setUnitName] = useState('')
  const [error, setError] = useState('')
  const [unitToDelete, setUnitToDelete] = useState(null)

  const handleFetch = async () => {
    try {
      const response = await fetchUnits()
      if (response.success) {
        setUnits(response.data)
      }
    } catch (error) {
      console.log('fetching unit error: ', error)
    }
  }

  const handleRateFetch = async () => {
    try {
      const response = await fetchRates()
      if (response.result === 'success') {
        setRates(response.conversion_rates)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddUnit = async () => {
    try {
      const response = await addNewUnit(unitName.toUpperCase())
      if (response.success) {
        toast.success(response.message)
        setUnits((prev) => [...prev, response.data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUnit = async (id) => {
    try {
      const response = await deleteUnit(id)
      if (response.success) {
        toast.info(response.message)
        setUnits(units.filter((u) => u._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUnit = async (id, payload) => {
    try {
      const response = await updateUnit(id, payload)
      if (response.success) {
        toast.info(response.message)
        setUnits(
          units.map((u) =>
            u._id === currentUnit._id
              ? { ...u, name: unitName.trim().toUpperCase() }
              : u
          )
        )
      }
    } catch (error) {}
  }

  useEffect(() => {
    handleFetch()
    handleRateFetch()
  }, [])

  useEffect(() => {
    // Pre-fill form when editing a unit
    if (currentUnit) {
      setUnitName(currentUnit.name)
    } else {
      setUnitName('')
    }
  }, [currentUnit])

  const handleOpenModal = (unit = null) => {
    setCurrentUnit(unit)
    setIsModalOpen(true)
    setError('')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentUnit(null)
    setUnitName('')
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!unitName.trim()) {
      setError('Unit name cannot be empty.')
      return
    }

    const isDuplicate = units.some(
      (unit) =>
        unit.name.toLowerCase() === unitName.trim().toLowerCase() &&
        unit._id !== currentUnit?._id
    )
    if (isDuplicate) {
      setError('This unit already exists.')
      return
    }
    if (!rates[unitName]) {
      setError(`There is no such currency named - ${unitName}`)
      return
    }

    if (currentUnit) {
      // Update existing unit
      const payload = { name: unitName }
      handleUpdateUnit(currentUnit._id, payload)
    } else {
      //Add new unit
      handleAddUnit()
    }
    handleCloseModal()
  }

  const handleDeleteClick = (unit) => {
    setUnitToDelete(unit)
  }

  const confirmDelete = () => {
    if (unitToDelete) {
      handleDeleteUnit(unitToDelete._id)
      setUnitToDelete(null)
    }
  }

  const cancelDelete = () => {
    setUnitToDelete(null)
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Units
            </h1>
            <p className="text-gray-500 mt-1">
              Manage the product currency units for your inventory. (Based
              Currency = SGD)
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-80 cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <FaPlus className="h-5 w-5" />
            Add New Unit
          </button>
        </header>

        {/* Units List */}
        <main className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {units.length > 0 ? (
              units.map((unit) => (
                <div
                  key={unit._id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-lg text-gray-700">
                    {unit.name}
                  </span>
                  <span className="text-gray-500">
                    Rate:{' '}
                    {rates[unit.name] ? rates[unit.name] : 'No rate to display'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(unit)}
                      className="p-2 text-gray-500 hover:text-indigo-600 rounded-full cursor-pointer hover:bg-indigo-100 transition-all duration-200"
                      aria-label={`Edit ${unit.name}`}
                    >
                      <MdModeEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(unit)}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full cursor-pointer hover:bg-red-100 transition-all duration-200"
                      aria-label={`Delete ${unit.name}`}
                    >
                      <BsFillTrash3Fill className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div key={0} className="p-8 text-center text-gray-500">
                <p className="font-medium">No units found.</p>
                <p className="text-sm mt-1">
                  Click "Add New Unit" to get started.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform animate-scaleIn">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentUnit ? 'Edit Unit' : 'Add New Unit'}
                  </h2>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <RiCloseLargeFill className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-gray-500 mb-6">
                  Enter a new currency unit. For example: "SGD" or "MYR".
                </p>

                <div>
                  <label
                    htmlFor="unitName"
                    className="text-sm font-semibold text-gray-700 mb-2 block"
                  >
                    Unit Name
                  </label>
                  <input
                    id="unitName"
                    type="text"
                    value={unitName}
                    onChange={(e) => {
                      setUnitName(e.target.value)
                      if (error) setError('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                    placeholder="e.g., SGD"
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-white text-gray-700 font-semibold border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary cursor-pointer text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                  {currentUnit ? 'Save Changes' : 'Create Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {unitToDelete && (
        <ConfirmationOverlay
          title="Delete Unit?"
          textHtml={
            <p>
              Are you sure you want to delete the unit{' '}
              <span className="font-bold">"{unitToDelete.name}"</span>? This
              action cannot be undone.
            </p>
          }
          dataToDelete={unitToDelete}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          icon={<BsFillTrash3Fill className="h-6 w-6 text-red-600" />}
          btnText="Delete"
        />
      )}
    </div>
  )
}

export default Unit
