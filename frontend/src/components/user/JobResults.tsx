import { useEffect, useState } from 'react'
import JobDetailsCard from "src/components/user/JobDetailsCard"
import { updateUser, applyJob } from 'src/util/apiFunctions'
import { formatDate } from 'src/util/util'
import { JobInterface, UserInterface } from 'src/util/interfaces'

interface JobResultsProps {
  userJwt: string
  jobData: JobInterface[]
  userData: UserInterface
  setUserData: (userData: UserInterface) => void
  search: string
  location: string
  position: string
  application?: boolean
  shortlist?: boolean
}


const JobResults: React.FC<JobResultsProps> = ({ userJwt, jobData, userData, setUserData, search, location, position, application = false, shortlist = false }) => {
  const [filteredJobs, setFilteredJobs] = useState<JobInterface[]>([])
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [shortlistedJobs, setShortlistedJobs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showJobDetailsCard, setShowJobDetailsCard] = useState<boolean>(false)
  const [jobDetailsCardData, setJobDetailsCardData] = useState<any>(null)

  const jobsPerPage: number = 10

  useEffect(() => {
    setAppliedJobs(userData.appliedJobs || [])
    setShortlistedJobs(userData.shortlisted || [])
  }, [])

  useEffect(() => {
    let filtered = jobData
    if (search || location || position) {

      const escapeRegExp = (search: string) => { return search.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') }
      const filters = {
        title: new RegExp(escapeRegExp(search), 'i'),
        location: new RegExp(escapeRegExp(location), 'i'),
        position: new RegExp(escapeRegExp(position), 'i')
      }

      filtered = jobData.filter(job => {
        for (const [prop, regex] of Object.entries(filters)) {
          if (!regex.test(job[prop])) { return false }
        }
        return true
      })
      setCurrentPage(1)
    }
    filtered = filtered.filter(job => {
      const applied = appliedJobs.includes(job._id)
      const shortlisted = shortlistedJobs.includes(job._id)
      return (application && applied) || (shortlist && shortlisted) || (!application && !shortlist && !applied && !shortlisted)
    })

    setFilteredJobs(filtered)
  }, [search, location, position, appliedJobs, shortlistedJobs])


  const handleJobAction = async (jobID: string, action: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const newAppliedJobs = action === 'apply' ? [...appliedJobs, jobID] : appliedJobs.filter(id => id !== jobID)
        const newShortlistedJobs = action === 'shortlist' ? [...shortlistedJobs, jobID] : shortlistedJobs.filter(id => id !== jobID)
        await Promise.all([updateUser(userJwt, {
          appliedJobs: newAppliedJobs,
          shortlisted: newShortlistedJobs
        }), applyJob(userJwt, userData._id || '', jobID, action)])

        setAppliedJobs(newAppliedJobs)
        setShortlistedJobs(newShortlistedJobs)

        setUserData({
          ...userData, appliedJobs: newAppliedJobs,
          shortlisted: newShortlistedJobs
        })
        if (currentJobs.length === 1) {
          setCurrentPage(currentPage - 1)
        }
        setFilteredJobs(filteredJobs.filter(job => job._id !== jobID))
        setShowJobDetailsCard(false)

        resolve()
      } catch {
        reject()
      }
    })
  }

  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <>
      <div className='jobsBody column'>
        {userData && (
          <>
            {showJobDetailsCard && <JobDetailsCard shortlist={shortlist} application={application} jobId={jobDetailsCardData} setShowJobDetailsCard={setShowJobDetailsCard} handleJobAction={handleJobAction} />}
            <h6>{filteredJobs.length === 0 ? 'No' : filteredJobs.length} Results <span>(viewing {Math.min((Math.max(currentPage, 1) - 1) * jobsPerPage + 1, filteredJobs.length)} to {Math.min(currentPage * jobsPerPage, filteredJobs.length)})</span></h6>
            {filteredJobs.length > 0 && (
              <div className='jobsBody-jobs column'>
                {currentJobs.map(job => (
                  <div key={job._id} className='job row' onClick={() => {
                    setJobDetailsCardData(job._id)
                    setShowJobDetailsCard(true)
                  }}>
                    <div className='column job-left'>
                      <div className='row'>
                        <h6>{job.title}</h6>
                        <p>{job.remote ? `Remote - ${job.location}` : job.location}</p>
                        <p>{job.position}</p>
                        <p>{formatDate(job.date || '')}</p>
                      </div>
                      <div className='tagsContainer row'>
                        {job.skills && job.skills.slice(0, 5).map((skill, index) => (
                          <p key={index}>{skill}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
                )}
              </div>
            )}

            {filteredJobs.length > jobsPerPage &&
              <div className='pagination'>
                {pageNumbers.map(pageNumber => (
                  <div
                    key={pageNumber}
                    className={currentPage === pageNumber ? 'activePageButton' : 'pageButton'}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    <p>{pageNumber}</p>
                  </div>
                ))}
              </div>
            }
          </>
        )
        }
      </div>
    </>
  )
}

export default JobResults