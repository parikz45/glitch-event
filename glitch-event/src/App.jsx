import { useState } from 'react'
import EventRegistrationHeader from './components/sections/EventRegistrationHeader.jsx'


import hachi from './assets/Hachi.svg'

function App() {

  // Registration type and UI state
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // validation errors
  const [errors, setErrors] = useState({ fullName: '', phone: '', department: '', semester: '', futureTeam: '', teamName: '', teamCode: '' });

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    department: '',
    semester: '',
    batch: '',
    teamName: '',
    registrationType: '', // 'Individual' | 'team'
    teamCode: '',
    futureTeam: 'N/A', // 'yes' | 'no' | 'N/A'
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
  const [teamCode] = useState(generateUniqueCode());
  const [showCode, setShowCode] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle registration type change
  const handleRegistrationType = (type) => {
    setFormData((prev) => ({ ...prev, registrationType: type }));
    if (type === 'Individual') {
      setTeam(false);
      setIndividual(true);
      setJoinTeam(false);
      setShowCode(false);
      setFormData((prev)=>({...prev, teamCode: '', teamName: '', futureTeam: 'N/A'}))
    } else if (type === 'team') {
      setTeam(true);
      setIndividual(false);
      setFormData((prev)=>({...prev, futureTeam: 'N/A'}))
    }
  };

  // Handle future team radio / checkbox
  const handleFutureTeam = (value) => {
    setFormData((prev) => ({ ...prev, futureTeam: value || 'N/A' }));
    // clear futureTeam error on change
    if (errors.futureTeam) setErrors((prev) => ({ ...prev, futureTeam: '' }));
  };

  // Handle team code input (for joining a team)
  const handleTeamCodeInput = (e) => {
    setFormData((prev) => ({ ...prev, teamCode: e.target.value }));
    // clear teamCode error on change
    if (errors.teamCode) setErrors((prev) => ({ ...prev, teamCode: '' }));
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

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    
    // Validate future team selection for individual registration
    if (formData.registrationType === 'Individual' && formData.futureTeam === 'N/A') {
      newErrors.futureTeam = 'Please select yes or no for joining a team later';
    }

    // Validate team name for team creation
    if (formData.registrationType === 'team' && !joinTeam && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    // Validate team code for joining a team
    if (formData.registrationType === 'team' && joinTeam && !formData.teamCode.trim()) {
      newErrors.teamCode = 'Team code is required to join a team';
    }

    if (Object.keys(newErrors).length) {
      setErrors((prev)=>({ ...prev, ...newErrors }));
      return;
    }

    setIsLoading(true)
    fetch('https://script.google.com/macros/s/AKfycbzE81P0Cq2LpmLQDcEmKfsaglEH_gQYUKText_0XxeF5jf5IrJruEybY69jei2VD0sXrA/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          setThankYou(true);
        }, 800);
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
      futureTeam: 'N/A',
    });
    setTeam(false);
    setIndividual(false);
    setJoinTeam(false);
    setShowCode(false);
    setErrors({ fullName: '', phone: '', department: '', semester: '', futureTeam: '', teamName: '', teamCode: '' });
  };

  // utility classes mirroring musashi / shadcn style tokens
  const baseInput = 'w-full bg-[#1e2133] border rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all';
  const inputClasses = (field) => ` ${baseInput} ${errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-white/20'}`;
  const labelClasses = 'block mb-2 text-sm font-medium text-gray-300 uppercase tracking-wider';
  const errorText = 'mt-2 text-xs text-red-400 font-medium tracking-wide';
  const sectionBg = 'bg-[#0D0E20]';

  return (
    <>
      <EventRegistrationHeader />
      
      <div className={`${sectionBg} min-h-screen text-white pb-24`}> {/* overall page wrapper */}
        {!thankYou && (
          <section className='py-16 md:py-24'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center mb-12'>
                <h2 className='text-2xl md:text-4xl font-bold  uppercase ' style={{ fontFamily: 'morton' }}>
                Registration Form
                </h2>
              </div>

              <div className='bg-[#1f2133]/60 border border-white/10 rounded-lg p-6 sm:p-8 md:p-12 shadow-md backdrop-blur-sm 'style={{ fontFamily: 'neopixel' }}>
                <div className='mb-8 text-center'>
                <img
                  src={hachi}
                  alt="Hachi Logo"
                  className="mx-auto mb-4"
                  width={55}
                  height={32}
                />
                </div>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8'>
                  {/* Full Name */}
                  <div>
                    <label htmlFor='fullName' className={labelClasses}>Full Name</label>
                    <input
                      required
                      type='text'
                      id='fullName'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={inputClasses('fullName')}
                      placeholder='Enter your full name'
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    />
                    {errors.fullName && <p id='error-fullName' className={errorText}>{errors.fullName}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor='phone' className={labelClasses}>Phone Number</label>
                    <input
                      required
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses('phone')}
                      placeholder='10 digit number'
                      pattern='\d{10}'
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                    />
                    {errors.phone && <p id='error-phone' className={errorText}>{errors.phone}</p>}
                  </div>
                  {/* Department (dropdown) */}
                  <div>
                    <label htmlFor='department' className={labelClasses}>Department</label>
                    <select
                      required
                      id='department'
                      name='department'
                      value={formData.department}
                      onChange={handleInputChange}
                      className={inputClasses('department') } 
                      aria-invalid={!!errors.department}
                      aria-describedby={errors.department ? 'error-department' : undefined}
                    >
                      <option value='' disabled>Choose department</option>
                      <option value='CS'>CS</option>
                      <option value='AE'>AE</option>
                      <option value='EEE'>EEE</option>
                      <option value='ECE'>ECE</option>
                      <option value='CE'>CE</option>
                      <option value='EL'>EL</option>
                      <option value='IE'>IE</option>
                      <option value='ME'>ME</option>
                    </select>
                    {errors.department && <p id='error-department' className={errorText}>{errors.department}</p>}
                  </div>
                  {/* Semester (dropdown) */}
                  <div>
                    <label htmlFor='semester' className={labelClasses}>Semester</label>
                    <select
                      required
                      id='semester'
                      name='semester'
                      value={formData.semester}
                      onChange={handleInputChange}
                      className={inputClasses('semester')}
                      aria-invalid={!!errors.semester}
                      aria-describedby={errors.semester ? 'error-semester' : undefined}
                    >
                      <option value='' disabled>Choose semester</option>
                      <option value='S1'>S1</option>
                      <option value='S2'>S2</option>
                      <option value='S3'>S3</option>
                      <option value='S4'>S4</option>
                      <option value='S5'>S5</option>
                      <option value='S6'>S6</option>
                      <option value='S7'>S7</option>
                      <option value='S8'>S8</option>
                    </select>
                    {errors.semester && <p id='error-semester' className={errorText}>{errors.semester}</p>}
                  </div>
                  {/* Batch */}
                  <div className='md:col-span-2'>
                    <label htmlFor='batch' className={labelClasses}>Batch</label>
                    <select
                      required
                      id='batch'
                      name='batch'
                      value={formData.batch}
                      onChange={handleInputChange}
                      className={inputClasses('batch')}
                    >
                      <option value='' disabled>Choose batch</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                    </select>
                  </div>
                  {/* Registration Type */}
                  <div className='md:col-span-2'>
                    <span className={labelClasses}>Registration Type</span>
                    <div className='mt-2 flex flex-wrap items-center gap-8'>
                      <label className='flex items-center cursor-pointer text-white'>
                        <input
                          type='radio'
                          name='registrationType'
                          value='Individual'
                          checked={formData.registrationType === 'Individual'}
                          onChange={() => handleRegistrationType('Individual')}
                          className='sr-only peer'
                          required
                        />
                        <span className='w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center transition-all peer-checked:border-pink-500'>
                          <span className='w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 peer-checked:scale-100 transition-transform duration-150'></span>
                        </span>
                        <span className='ml-3 text-sm tracking-wide'>Individual</span>
                      </label>
                      <label className='flex items-center cursor-pointer text-white'>
                        <input
                          type='radio'
                          name='registrationType'
                          value='team'
                          checked={formData.registrationType === 'team'}
                          onChange={() => handleRegistrationType('team')}
                          className='sr-only peer'
                          required
                        />
                        <span className='w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center transition-all peer-checked:border-pink-500'>
                          <span className='w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 peer-checked:scale-100 transition-transform duration-150'></span>
                        </span>
                        <span className='ml-3 text-sm tracking-wide'>Team</span>
                      </label>
                    </div>

                    {/* Team actions */}
                    {team && (
                      <div className='mt-6'>
                        <div className='mb-4 text-sm text-gray-400'>
                          <span className='text-pink-400'>Note:</span> Maximum team size is 4 members
                        </div>
                        <div className='flex flex-wrap gap-4'>
                          <button
                            type='button'
                            onClick={handleCreateTeam}
                            className='px-5 py-2.5 rounded-sm bg-pink-500 hover:bg-pink-400 text-white text-sm font-medium tracking-wide transition-colors'
                          >
                            Create a Team
                          </button>
                          <button
                            type='button'
                            onClick={() => { setJoinTeam(true); setShowCode(false); setFormData((prev) => ({ ...prev, futureTeam: 'N/A', teamCode: '' })); }}
                            className='px-5 py-2.5 rounded-sm bg-[#1e2133] hover:bg-[#2a2d47] border border-white/20 hover:border-pink-500/50 text-white text-sm font-medium tracking-wide transition-colors'
                          >
                            Join a Team
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Enter team code when joining */}
                    {joinTeam && (
                      <div className='mt-6'>
                        <label htmlFor='teamCode' className={labelClasses}>Enter Team Code</label>
                        <input
                          type='text'
                          id='teamCode'
                          name='teamCode'
                          value={formData.teamCode}
                          onChange={handleTeamCodeInput}
                          className={`${baseInput} ${errors.teamCode ? 'border-red-500 focus:ring-red-500' : 'border-white/20'}`}
                          placeholder='ABC123'
                          aria-invalid={!!errors.teamCode}
                          aria-describedby={errors.teamCode ? 'error-teamCode' : undefined}
                        />
                        {errors.teamCode && <p id='error-teamCode' className={errorText}>{errors.teamCode}</p>}
                      </div>
                    )}

                    {/* Generated code display */}
                    {showCode && (
                      <div className='mt-6 text-sm text-gray-200 font-mono'>
                        Your team code: <span className='text-pink-400 font-semibold'>{teamCode}</span>
                      </div>
                    )}

                    {/* Future team intention for individual */}
                    {individual && (
                      <div className='mt-6'>
                        <span className='block mb-2 text-xs font-medium text-gray-400 tracking-wider uppercase'>Join a Team Later?</span>
                        <div className='flex gap-8'>
                          <label className='flex items-center cursor-pointer text-white'>
                            <input
                              type='radio'
                              name='futureTeam'
                              value='yes'
                              checked={formData.futureTeam === 'yes'}
                              onChange={() => handleFutureTeam('yes')}
                              className='sr-only peer'
                            />
                            <span className='w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center transition-all peer-checked:border-pink-500'>
                              <span className='w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 peer-checked:scale-100 transition-transform duration-150'></span>
                            </span>
                            <span className='ml-3 text-sm'>Yes</span>
                          </label>
                          <label className='flex items-center cursor-pointer text-white'>
                            <input
                              type='radio'
                              name='futureTeam'
                              value='no'
                              checked={formData.futureTeam === 'no'}
                              onChange={() => handleFutureTeam('no')}
                              className='sr-only peer'
                            />
                            <span className='w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center transition-all peer-checked:border-pink-500'>
                              <span className='w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 peer-checked:scale-100 transition-transform duration-150'></span>
                            </span>
                            <span className='ml-3 text-sm'>No</span>
                          </label>
                        </div>
                        {errors.futureTeam && <p className={errorText}>{errors.futureTeam}</p>}
                      </div>
                    )}

                    {/* Team Name (conditional) */}
                    {team && !joinTeam && showCode && (
                      <div className='mt-6'>
                        <label htmlFor='teamName' className={labelClasses}>Team Name</label>
                        <input
                          type='text'
                          id='teamName'
                          name='teamName'
                          value={formData.teamName}
                          onChange={handleInputChange}
                          className={`${baseInput} ${errors.teamName ? 'border-red-500 focus:ring-red-500' : 'border-white/20'}`}
                          placeholder='Enter your team name'
                          aria-invalid={!!errors.teamName}
                          aria-describedby={errors.teamName ? 'error-teamName' : undefined}
                        />
                        {errors.teamName && <p id='error-teamName' className={errorText}>{errors.teamName}</p>}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className='md:col-span-2 pt-4'>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={`w-full py-3 px-8 rounded-sm text-white text-base uppercase tracking-widest font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f2133] ${isLoading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-400'}`}
                    >
                      {isLoading ? 'Submitting...' : 'Register Now'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {thankYou && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50 px-4'>
            <div className='bg-white text-black p-8 rounded-lg text-center max-w-md w-full shadow-xl'>
              <h2 className='text-2xl font-bold mb-4'>Thank You for Registering!</h2>
              <p className='mb-6 text-gray-700'>Your registration has been successfully completed.</p>
              <button
                onClick={() => setThankYou(false)}
                className='bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors'
              >
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