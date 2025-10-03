import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'


const AddWriter = () => {

  const navigate = useNavigate()
  const { store } = useContext(storeContext)

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    category: ""
  })
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const [loader, setLoader] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/news/writer/add`, state, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      setLoader(false)
      toast.success(data.message)
      navigate('/dashboard/writers')
    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-slate-100 py-8 px-4'>
      <div className='mx-auto max-w-2xl'>
        <div className='bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/15 p-8'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h2 className='text-2xl font-semibold text-slate-100'>Add Writer</h2>
              <p className='text-slate-300 mt-1'>Create a new writer account</p>
            </div>
            <Link className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2' to='/dashboard/writers'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' />
              </svg>
              Writers
            </Link>
          </div>

          <form onSubmit={submit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-y-2'>
                <label className='text-sm font-medium text-slate-200' htmlFor="name">Full Name</label>
                <input
                  onChange={inputHandler}
                  value={state.name}
                  required
                  type="text"
                  placeholder='Enter full name'
                  name='name'
                  className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-slate-100 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200'
                  id='name'
                />
              </div>

              <div className='flex flex-col gap-y-2'>
                <label className='text-sm font-medium text-slate-200' htmlFor="category">Category</label>
                <select
                  onChange={inputHandler}
                  value={state.category}
                  required
                  name='category'
                  id='category'
                  className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200'
                >
                  <option value="">--- Select Category ---</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Health">Health</option>
                  <option value="International">International</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>

            <div className='flex flex-col gap-y-2'>
              <label className='text-sm font-medium text-slate-200' htmlFor="email">Email Address</label>
              <input
                onChange={inputHandler}
                value={state.email}
                required
                type="email"
                placeholder='writer@example.com'
                name='email'
                className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-slate-100 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200'
                id='email'
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label className='text-sm font-medium text-slate-200' htmlFor="password">Password</label>
              <div className='relative'>
                <input
                  onChange={inputHandler}
                  value={state.password}
                  required
                  type="password"
                  placeholder='Create secure password'
                  name='password'
                  className='w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-slate-100 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200'
                  id='password'
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors'
                  aria-label='Password requirements'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='flex gap-4 pt-4'>
              <button
                disabled={loader}
                type='submit'
                className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
              >
                {loader ? (
                  <>
                    <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                    </svg>
                    Adding Writer...
                  </>
                ) : (
                  <>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                    </svg>
                    Add Writer
                  </>
                )}
              </button>

              <Link
                to='/dashboard/writers'
                className='px-6 py-3 bg-gray-700 hover:bg-gray-600 text-slate-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                </svg>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddWriter