import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [team, setTeam] = useState(false);

  return (
    <div className='flex flex-col items-center bg-[#0D0E20] h-screen text-white overflow-y-auto '>
      {/* header */}
      <div className="flex items-center w-full p-5 bg-gray-800/40 border-b border-gray-700">
        <img
          src="glitch_font.png"
          alt="Glitch Logo"
          className="w-[150px] my-5 mx-5"
        />
        <h1 className="text-4xl ml-[350px] text-white font-bold mb-5">
          Glitch Event Registration
        </h1>
      </div>


      <div className='flex mt-[40px] py-[25px] '>

        {/* registration */}
        <div className='flex-2 ml-[50px] '>
          <h2 className='text-3xl font-semibold text-white mb-5'>
            Registration
          </h2>
          <form className='flex flex-col mt-[25px] '>
            <div className='flex gap-5 mb-4'>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Full Name</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Phone No</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
            </div>

            <div className='flex gap-5 mb-4'>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Department</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Semester</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
            </div>

            <div className='flex gap-5 mb-4'>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Batch</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Team Name (if registering as a team)</span>
                <input type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[300px]' />
              </div>
            </div>

            {/* registration type */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-[17px]">Registration Type</span>

              <div className='flex gap-5 mt-[10px] '>
                <label className="flex items-center gap-2 text-white text-[14px]">
                  <input type="radio" onChange={() => setTeam(false)} name="registrationType" value="individual" />
                  Individual
                </label>

                <label className="flex items-center gap-2 text-white text-[14px]">
                  <input type="radio" onChange={() => setTeam(true)} name="registrationType" value="team" />
                  Team
                </label>
              </div>

              {team && (
                <div className="flex gap-4 mt-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                    Create a team
                  </button>
                  <button className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition">
                    Join a team
                  </button>
                </div>
              )}
            </div>


            <button type='submit' className='bg-blue-500 w-[130px] mt-[10px] text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer transition-colors duration-300'>
              Register Now
            </button>
          </form>
        </div>

        {/* sponsor details */}
        <div className='flex-1 flex flex-col mt-[20px] '>
          <span className='text-[24px] font-semibold '>Sponsors</span>
          <img src='sponsor.png' alt='Sponsor Logo' className='w-[200px] h-[200px] rounded-lg my-5' />

          {/* event details */}
          <div className='flex flex-col gap-2 mt-[20px] bg-[#2d2b3c] rounded-lg p-5 mr-[30px]'>
            <span className='text-[24px] font-semibold'>Event Details</span>
            <p className='text-[18px]'>
              Join us for an exciting event filled with fun and learning. Participate in various activities and showcase your skills. Don't miss out on the chance to win amazing prizes!
            </p>
            <p className='text-[18px] mt-2'>
              Date: 26th August 2025<br />
              Venue: CS classroom<br />
              Time: 4:30 PM
            </p>
          </div>
        </div>

      </div>
    </div>
  )

}

export default App
