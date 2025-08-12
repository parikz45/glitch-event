import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);

  const isMobile = window.matchMedia("(max-width: 768px)");

  return (
    <div className='flex flex-col items-center bg-[#0D0E20] h-screen text-white overflow-y-auto '>
      {/* header */}
      <div className="flex items-center w-full p-2 lg:p-5 bg-gray-800/40 border-b border-gray-700">
        <img
          src="glitch_font.png"
          alt="Glitch Logo"
          className="w-[70px] lg:w-[150px] my-5 mx-5"
        />
        <h1 className="text-[28px] lg:text-4xl ml-[30px] lg:ml-[350px] text-white font-bold mb-2 lg:mb-5">
          Event Registration
        </h1>
      </div>


      <div className={`flex mt-[40px] py-[25px] ${isMobile.matches ? 'flex-col' : 'flex-row'} `}>

        {isMobile.matches && (<div className='w-[350px] flex flex-col gap-2 mt-[20px] bg-[#2d2b3c] rounded-lg p-5 mx-[30px] '>
            <span className='text-[24px] font-semibold'>Event Details</span>
            <p className='text-[17px]'>
              Join us for an exciting event filled with fun and learning. Participate in various activities and showcase your skills. Don't miss out on the chance to win amazing prizes!
            </p>
            <p className='text-[18px] mt-2'>
              Date: 26th August 2025<br />
              Venue: CS classroom<br />
              Time: 4:30 PM
            </p>
          </div>)}

        {/* registration */}
        <div className='flex-1 mt-[25px] ml-[40px] lg:ml-[50px] '>
          <h2 className='text-3xl font-semibold text-white mb-5'>
            Registration
          </h2>
          <form className='flex flex-col w-full mt-[25px] '>
            {/* <div className='flex flex-col gap-5 mb-4'> */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Full Name</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Phone No</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
            {/* </div> */}

            {/* <div className='flex flex-col gap-5 mb-4'> */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Department</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Semester</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
            {/* </div> */}

            {/* <div className='flex flex-col gap-5 mb-4'> */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Batch</span>
                <input required type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Team Name (if registering as a team)</span>
                <input type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]' />
              </div>
            {/* </div> */}

            {/* registration type */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-[17px]">Registration Type</span>

              <div className='flex gap-5 mt-[10px] '>
                <label className="flex items-center gap-2 text-white text-[14px]">
                  <input type="radio" onChange={() => { setTeam(false), setIndividual(true), setJoinTeam(false) }} name="registrationType" value="individual" />
                  Individual
                </label>

                <label className="flex items-center gap-2 text-white text-[14px]">
                  <input required type="radio" onChange={() => (setTeam(true), setIndividual(false))} name="registrationType" value="team" />
                  Team
                </label>
              </div>

              {team && (
                <div className="flex gap-4 mt-2">
                  <button onClick={()=>setJoinTeam(false)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                    Create a team
                  </button>
                  <button onClick={()=>setJoinTeam(true)} className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition">
                    Join a team
                  </button>
                </div>
              )}

              {joinTeam && (
                <div className=''>
                  <span className='text-white text-[17px] mt-2'>Enter the team code:</span>
                  <input type='text' className='outline-none p-2 mb-4 bg-white text-black rounded-md mt-[20px] w-[340px] lg:w-[600px]' />
                </div>

              )}

              {individual && (
                <div className="mt-2 ">
                  <span className='text-white text-[17px] '>Do you wish to join a team later?</span>

                  <div className='flex gap-5 mt-[10px] '>
                    <label className="flex items-center gap-2 text-white text-[14px]">
                      <input type="radio" name="futureTeam" value="yes" />
                      Yes
                    </label>

                    <label className="flex items-center gap-2 text-white text-[14px]">
                      <input type="radio" name="futureTeam" value="no" />
                      No
                    </label>
                  </div>
                </div>
              )}
            </div>


            <button type='submit' className='bg-blue-500 w-[130px] mt-[10px] text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer transition-colors duration-300'>
              Register Now
            </button>
          </form>
        </div>


        <div className='flex-1 mx-[100px] flex flex-col mt-[20px] ml-[150px] '>
          {/* event details-desktop view */}
          {!isMobile.matches && (<div className='w-[400px] flex flex-col gap-2 mt-[20px] bg-[#2d2b3c] rounded-lg p-5 mr-[30px]'>
            <span className='text-[24px] font-semibold'>Event Details</span>
            <p className='text-[17px]'>
              Join us for an exciting event filled with fun and learning. Participate in various activities and showcase your skills. Don't miss out on the chance to win amazing prizes!
            </p>
            <p className='text-[18px] mt-2'>
              Date: 26th August 2025<br />
              Venue: CS classroom<br />
              Time: 4:30 PM
            </p>
          </div>)}

          {/* sponsor details */}
          <div className={`flex flex-col mt-[30px] ${isMobile?"":""} `}>
            <span className='text-[24px] font-semibold '>Sponsors</span>
            <img src='sponsor.png' alt='Sponsor Logo' className='w-[250px] lg:w-[200px] h-[200px] rounded-lg my-5' />
          </div>


        </div>

      </div>
    </div>
  )

}

export default App
