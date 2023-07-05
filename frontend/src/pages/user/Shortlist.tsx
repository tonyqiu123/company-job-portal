import React, { useState } from 'react'
import 'src/css/user/jobQuery.css'
import searchIcon from 'src/assets/images/search.svg'
import locationIcon from 'src/assets/images/locationIcon.svg'
import JobResults from 'src/components/user/JobResults'
import { JobInterface, UserInterface } from 'src/util/interfaces'
import { Link } from 'react-router-dom'

interface ShortlistProps {
  userJwt: string
  jobData: JobInterface[]
  setUserData: (userData: UserInterface) => void
  userData: UserInterface
}

const Shortlist: React.FC<ShortlistProps> = ({ userJwt, jobData, userData, setUserData }) => {
  const [filters, setFilters] = useState({ search: '', location: '', position: '' })


  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }))
  }

  return (
    <>
      <div className='body'>
        <div className='dashboardTitle row'>
          <Link to="/shortlist"><h2>Shortlist</h2></Link>
        </div>
        <div className='hr'></div>
        <section className='searchJobs column'>
          <div className='searchJobs-inputContainer column'>

            <div className='searchJobs-input row' style={{ gridTemplateColumns: '1fr' }} >
              <div className='searchJobs-relative'>
                <input
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder='Search Jobs'
                />
                <img src={searchIcon} />
              </div>
            </div>

            <div className='searchJobs-input row'>
              <div className='searchJobs-relative'>
                <input
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder='Location'
                />
                <img src={locationIcon} />
              </div>
              <div className='searchJobs-relative dropDown'>
                <select onChange={(e) => handleFilterChange('position', e.target.value)}>
                  <option value=''>All roles</option>
                  <option value='Full time'>Full time</option>
                  <option value='Part time'>Part time</option>
                  <option value='Internship'>Internship</option>
                  <option value='Contract'>Contract</option>
                </select>
              </div>
            </div>
          </div>
          <JobResults {...filters} shortlist={true} jobData={jobData} userJwt={userJwt} userData={userData} setUserData={setUserData} />
        </section>
      </div>
    </>
  )
}

export default Shortlist