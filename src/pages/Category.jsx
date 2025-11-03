import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { RiCloseLargeFill } from 'react-icons/ri'
import {
  fetchCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from '../services/category.service'
import { toast } from 'react-toastify'
import ConfirmationOverlay from '../components/ConfirmationOverlay'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [error, setError] = useState('')
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  const handleFetch = async () => {
    try {
      const response = await fetchCategories()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      console.log('fetching categories error: ', error)
    }
  }

  const handleAddCategory = async () => {
    try {
      const response = await addNewCategory(categoryName)
      if (response.success) {
        toast.success(response.message)
        setCategories((prev) => [...prev, response.data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const response = await deleteCategory(id)
      if (response.success) {
        toast.warning(response.message)
        setCategories(categories.filter((u) => u._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateCategory = async (id, payload) => {
    try {
      const response = await updateCategory(id, payload)
      if (response.success) {
        toast.success(response.message)
        setCategories(
          categories.map((c) =>
            c._id === currentCategory._id
              ? { ...c, name: categoryName.trim() }
              : c
          )
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])

  useEffect(() => {
    // Pre-fill form when editing a category
    if (currentCategory) {
      setCategoryName(currentCategory.name)
    } else {
      setCategoryName('')
    }
  }, [currentCategory])

  const handleOpenModal = (category = null) => {
    setCurrentCategory(category)
    setIsModalOpen(true)
    setError('')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentCategory(null)
    setCategoryName('')
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!categoryName.trim()) {
      setError('Category name cannot be empty.')
      return
    }

    const isDuplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase() &&
        category._id !== currentCategory?._id
    )
    if (isDuplicate) {
      setError('This category already exists.')
      return
    }

    if (currentCategory) {
      // Update existing category
      const payload = { name: categoryName }
      handleUpdateCategory(currentCategory._id, payload)
    } else {
      //Add new category
      handleAddCategory()
    }
    handleCloseModal()
  }

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      handleDeleteCategory(categoryToDelete._id)
      setCategoryToDelete(null)
    }
  }

  const cancelDelete = () => {
    setCategoryToDelete(null)
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Categories
            </h1>
            <p className="text-gray-500 mt-1">
              Manage the product category for your inventory.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-80 cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <FaPlus className="h-5 w-5" />
            Add New Category
          </button>
        </header>

        {/* categories List */}
        <main className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
              <div className="flex gap-10 justify-center items-center text-lg font-medium text-gray-700">
                <span>No</span>
                <span>Name</span>
              </div>
              <div className="flex text-lg font-medium text-gray-700 items-center gap-2">
                Actions
              </div>
            </div>
            {categories.length > 0 ? (
              categories.map((category, i) => (
                <div
                  key={category._id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex gap-10 justify-center items-center text-lg font-medium text-gray-700">
                    <span className="mr-4">{i + 1}</span>
                    <span className="capitalize">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-2 text-gray-500 hover:text-indigo-600 rounded-full cursor-pointer hover:bg-indigo-100 transition-all duration-200"
                      aria-label={`Edit ${category.name}`}
                    >
                      <MdModeEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full cursor-pointer hover:bg-red-100 transition-all duration-200"
                      aria-label={`Delete ${category.name}`}
                    >
                      <BsFillTrash3Fill className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div key={0} className="p-8 text-center text-gray-500">
                <p className="font-medium">No category found.</p>
                <p className="text-sm mt-1">
                  Click "Add New Category" to get started.
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
                    {currentCategory ? 'Edit Category' : 'Add New Category'}
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
                  Enter a new category. For example: "Phone" or "Tablet".
                </p>

                <div>
                  <label
                    htmlFor="categoryName"
                    className="text-sm font-semibold text-gray-700 mb-2 block"
                  >
                    Category Name
                  </label>
                  <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value)
                      if (error) setError('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                    placeholder="e.g., Phone"
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
                  {currentCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <ConfirmationOverlay
          title="Delete Category?"
          textHtml={
            <p>
              Are you sure you want to delete the category{' '}
              <span className="font-bold">"{categoryToDelete.name}"</span>? This
              action cannot be undone.
            </p>
          }
          dataToDelete={categoryToDelete}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          icon={<BsFillTrash3Fill className="h-6 w-6 text-red-600" />}
          btnText="Delete"
        />
      )}
    </div>
  )
}

export default Category
