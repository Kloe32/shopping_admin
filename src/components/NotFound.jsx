import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../assets/img/notFound.svg'
const NotFound = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col-reverse items-center justify-center h-screen font-roboto gap-6 md:gap-20">
        <div className="p-[30px] ">
          <p className="text-3xl font-roboto font-bold mb-5">Opps....</p>
          <p className="text-2xl mb-2">Page not found</p>
          <p className="text-sm text-gray-600 mb-10">
            The page doesn't exist or was removed! <br />
            We suggest you back to home
          </p>
          <Link
            to={'/'}
            className="bg-blue-500 hover:bg-blue-700 px-[25px] py-[13px] rounded-md text-white active:bg-primary/60"
          >
            Back to Home
          </Link>
        </div>
        <div>
          <img src={notFound} alt="" className="md:w-full w-[300px]" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
