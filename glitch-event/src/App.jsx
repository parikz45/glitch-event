import { useState } from 'react'


function App() {

  // Registration type and UI state
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = window.matchMedia("(max-width: 768px)");

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    department: '',
    semester: '',
    batch: '',
    teamName: '',
    registrationType: '',
    teamCode: '',
    futureTeam: 'N/A',
  });

  // Store generated codes
  const usedCodes = new Set();
  function generateUniqueCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
      code = '';
      for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
  }
  const [teamCode, setTeamCode] = useState(generateUniqueCode());
  const [showCode, setShowCode] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle registration type change
  const handleRegistrationType = (type) => {
    setFormData((prev) => ({ ...prev, registrationType: type }));
    if (type === 'Individual') {
      setTeam(false);
      setIndividual(true);
      setJoinTeam(false);
      setShowCode(false);
    } else if (type === 'team') {
      setTeam(true);
      setIndividual(false);
    }
  };

  // Handle future team radio
  const handleFutureTeam = (value) => {
    setFormData((prev) => ({ ...prev, futureTeam: value || 'N/A' }));
  };


  // Handle team code input (for joining a team)
  const handleTeamCodeInput = (e) => {
    setFormData((prev) => ({ ...prev, teamCode: e.target.value }));
  };

  // When user creates a team, set the generated code in formData
  const handleCreateTeam = () => {
    setJoinTeam(false);
    setFormData((prev) => ({ ...prev, futureTeam: 'N/A' }));
    setShowCode(true);
    setFormData((prev) => ({ ...prev, teamCode: teamCode }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    setIsLoading(true)
    fetch('https://script.google.com/macros/s/AKfycbzE81P0Cq2LpmLQDcEmKfsaglEH_gQYUKText_0XxeF5jf5IrJruEybY69jei2VD0sXrA/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      mode:"no-cors", // Use 'no-cors' mode to avoid CORS issues with Google Apps Script
    })
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setThankYou(true);
        }, 1000);
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
        // Reset form data after submission
        setFormData({
          fullName: '',
          phone: '',
          department: '',
          semester: '',
          batch: '',
          teamName: '',
          registrationType: '',
          teamCode: '',
          futureTeam: '',
      
      });
  };


  return (
    <>
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


        {!thankYou && (<div className={`flex mt-[40px] py-[25px] ${isMobile.matches ? 'flex-col' : 'flex-row'} `}>

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
            <form onSubmit={handleSubmit} className='flex flex-col w-full mt-[25px] '>
              {/* Full Name */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Full Name</span>
                <input
                  required
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Phone No */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Phone No</span>
                <input
                  required
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Department */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Department</span>
                <input
                  required
                  type='text'
                  name='department'
                  value={formData.department}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Semester */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Semester</span>
                <input
                  required
                  type='text'
                  name='semester'
                  value={formData.semester}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Batch */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Batch</span>
                <input
                  required
                  type='text'
                  name='batch'
                  value={formData.batch}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Team Name */}
              <div className='flex flex-col gap-2'>
                <span className='text-white text-[18px]'>Team Name (if registering as a team)</span>
                <input
                  type='text'
                  name='teamName'
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className='outline-none p-2 mb-4 bg-white text-black rounded-md w-[340px] lg:w-[600px]'
                />
              </div>
              {/* Registration Type */}
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-[17px]">Registration Type</span>
                <div className='flex gap-5 mt-[10px] '>
                  <label className="flex items-center gap-2 text-white text-[14px]">
                    <input
                      type="radio"
                      name="registrationType"
                      value="Individual"
                      checked={formData.registrationType === 'Individual'}
                      onChange={() => handleRegistrationType('Individual')}
                    />
                    Individual
                  </label>
                  <label className="flex items-center gap-2 text-white text-[14px]">
                    <input
                      required
                      type="radio"
                      name="registrationType"
                      value="team"
                      checked={formData.registrationType === 'team'}
                      onChange={() => handleRegistrationType('team')}
                    />
                    Team
                  </label>
                </div>
                {team && (
                  <div className="flex gap-4 mt-2">
                    <button type='button' onClick={handleCreateTeam} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                      Create a team
                    </button>
                    <button type='button' onClick={() => { setJoinTeam(true); setShowCode(false); setFormData((prev) => ({ ...prev, futureTeam: 'N/A' })); }} className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition">
                      Join a team
                    </button>
                  </div>
                )}
                {joinTeam && (
                  <div className=''>
                    <span className='text-white text-[17px] mt-2'>Enter the team code:</span>
                    <input
                      type='text'
                      name='teamCode'
                      value={formData.teamCode}
                      onChange={handleTeamCodeInput}
                      className='outline-none p-2 mb-4 bg-white text-black rounded-md mt-[20px] w-[340px] lg:w-[600px]'
                    />
                  </div>
                )}
                {showCode && (
                  <div className='mt-2'>
                    <span className='text-white text-[17px]'>Your team code is: {teamCode} </span>
                  </div>
                )}
                {individual && (
                  <div className="mt-2 ">
                    <span className='text-white text-[17px] '>Do you wish to join a team later?</span>
                    <div className='flex gap-5 mt-[10px] '>
                      <label className="flex items-center gap-2 text-white text-[14px]">
                        <input
                          type="radio"
                          name="futureTeam"
                          value="yes"
                          checked={formData.futureTeam === 'yes'}
                          onChange={() => handleFutureTeam('yes')}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-white text-[14px]">
                        <input
                          type="radio"
                          name="futureTeam"
                          value="no"
                          checked={formData.futureTeam === 'no'}
                          onChange={() => handleFutureTeam('no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button type='submit' className={`${isLoading ? "bg-blue-300" : "bg-blue-600"} w-[130px] mt-[10px] text-white p-2 rounded-md hover:bg-blue-700 cursor-pointer transition-colors duration-300`}>
                {isLoading ? "Loading..." : "Register Now"}
              </button>
            </form>
          </div>


          <div className='flex-1 mx-[100px] flex flex-col mt-[20px] ml-[150px] '>
            {/* event details-desktop view */}
            {!isMobile.matches && (<div className='w-[400px] flex flex-col gap-2 mt-[20px] bg-[#2d2b3c] rounded-lg p-5 mr-[30px]'>
              <span className='text-[24px] font-semibold'>Event Details</span>
              <p className='text-[17px]'>
                Join us for an exciting event filled with fun and learning. Participate in this gaming event and showcase your skills. Don't miss out on the chance to win amazing prizes!
              </p>
              <p className='text-[18px] mt-2'>
                Date: 26th August 2025<br />
                Venue: CS classroom<br />
                Time: 4:30 PM
              </p>
            </div>)}

            {/* sponsor details */}
            <div className={`flex flex-col mt-[30px] `}>
              <span className='text-[24px] font-semibold '>Sponsors</span>
              <img src='sponsor.png' alt='Sponsor Logo' className='w-[300px] lg:w-[200px] h-[200px] rounded-lg my-5' />
            </div>

          </div>
        </div>)}

        {thankYou && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white text-black p-5 rounded-lg text-center'>
              <h2 className='text-2xl font-bold mb-4'>Thank You for Registering!</h2>
              <p className='mb-4'>Your registration has been successfully completed.</p>
              <button onClick={() => setThankYou(false)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )

}

export default App
