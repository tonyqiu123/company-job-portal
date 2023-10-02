import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'src/components/shared/Input';
import Select from 'src/components/shared/Select';
import JobResults from 'src/components/user/JobResults';
import 'src/css/shared/interview.css'
import { JobInterface, UserInterface } from 'src/util/interfaces';


interface SearchJobsProps {
    userJwt: string
    jobData: JobInterface[]
    userData: UserInterface
    setUserData: (userData: UserInterface) => void
}

const InterviewDashboard: React.FC<SearchJobsProps> = ({ userJwt, jobData, userData, setUserData }) => {

    const [filters, setFilters] = useState({ search: '', location: '', position: '' });
    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('')
    const [position, setPosition] = useState('')

    const positions: string[] = ['All roles', 'Full Time', 'Part Time', 'Contract', 'Internship'];

    useEffect(() => {
        let allEdgeCase = position
        if (position === 'All roles') {
            allEdgeCase = ''
        }
        setFilters({ search, location, position: allEdgeCase });
    }, [search, location, position]);

    return (
        <div className='body'>
            <div className='dashboardTitle row'>
                <Link to="/search"><h2>Interviews</h2></Link>
            </div>
            <div className='hr'></div>
            <section className='searchJobs column'>
                <div className='searchJobs-inputContainer column'>
                    <div className='searchJobs-input column' style={{ gap: '4px' }} >
                        <p>Search</p>
                        <Input search={search} setSearch={setSearch} placeHolder="Search" />
                    </div>

                    <div className='searchJobs-input row'>
                        <div className='column' style={{ gap: '4px', width: '100%' }}>
                            <p>Location</p>
                            <Input search={location} setSearch={setLocation} placeHolder="Location" />
                        </div>
                        <div className='column' style={{ gap: '4px', width: '200px' }}>
                            <p>Role Type</p>
                            <Select queries={positions} selected={position} setSelected={setPosition} />
                        </div>
                    </div>
                </div>
                <JobResults {...filters} jobData={jobData} userJwt={userJwt} userData={userData} setUserData={setUserData} filterByInterview={true} />
            </section>
        </div>
    )
}

export default InterviewDashboard