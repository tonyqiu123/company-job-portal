import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
// import SelectDropdown from 'src/components/shared/SelectDropdown';
import Input from 'src/components/shared/Input';
import { getJobs, getMonthlyData, getUsersById } from 'src/util/apiFunctions';
import { JobInterface, UserInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
import DataCard from 'src/components/admin/DataCard';

interface ViewJobProps {
    adminJwt: string;
}

const ViewJob: React.FC<ViewJobProps> = ({ adminJwt }) => {
    const [search, setSearch] = useState<string>('');
    // const [status, setStatus] = useState<string>('Unseen');
    const [job, setJob] = useState<JobInterface>();
    const [applicantData, setApplicantData] = useState<UserInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [monthlyData, setMonthlyData] = useState<any>([{}])


    const fetchMonthlyData = async (): Promise<void> => {
        try {
            const data = await getMonthlyData()
            setMonthlyData(data)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMonthlyData()
    }, [])
    // const userStatus: string[] = ['Unseen', 'Selected', 'Rejected', 'Shortlisted'];

    const location = useLocation();

    const fetchJobData = async (): Promise<void> => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const jobId = searchParams.get('jobId')
            if (jobId) {
                const jobData = await getJobs({}, [jobId]);
                setJob(jobData[0]);
                const userIds = jobData[0].applicants
                let applicantData = await getUsersById({ _id: true, firstName: true, lastName: true, email: true, location: true, phone: true, createdAt: true }, adminJwt, search, userIds)

                // Prepare your Sets
                const selected = new Set<string>(jobData[0].selected);
                const selectedForInterview = new Set<string>(jobData[0].selectedForInterview);
                const shortlisted = new Set<string>(jobData[0].shortlisted);
                const rejected = new Set<string>(jobData[0].rejected);

                // Add the status property to each applicant object
                applicantData = applicantData.map((applicant: UserInterface) => {
                    if (applicant._id) {

                        if (selected.has(applicant._id)) {
                            return { ...applicant, status: 'Offered Position' };
                        }
                        if (selectedForInterview.has(applicant._id)) {
                            return { ...applicant, status: 'Selected For Interview' };
                        }
                        if (shortlisted.has(applicant._id)) {
                            return { ...applicant, status: 'Shortlisted' };
                        }
                        if (rejected.has(applicant._id)) {
                            return { ...applicant, status: 'Rejected' };
                        }
                    }
                    return { ...applicant, status: 'Pending' }; // assuming default status is 'pending'
                });
                setApplicantData(applicantData);
            } else {
                throw new Error('Job doesn\'t exist');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };

    const navigate = useNavigate();

    const actions = {
        // view job
        View: async (selectedUser: number) => {
            try {
                const userId = applicantData[selectedUser]._id;
                navigate(`/admin/job-management/job/applicant?jobId=${job?._id}&applicantId=${userId}`);
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        fetchJobData();
    }, []);

    return (
        <>
            <div className={`sectionLoading column ${!isLoading && 'skele-exit'}`}>
                <SectionLoading />
            </div>
            {!isLoading && (
                <div className='body contentLoaded'>
                    <div className='dashboardTitle row'>
                        <Link to="/admin/job-management"><h2>Job Management</h2></Link>
                        <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
                        {job && <Link to={location}><h2>{job.title}</h2></Link>}
                    </div>
                    <div className='hr'></div>
                    <section className='jobManagement column'>
                        <div className='dashboard-overviewStats row'>
                            <DataCard data={monthlyData} />

                        </div>
                        <div className='jobManagement-search row'>
                            <div className='column'>
                                <Tooltip toolTipText='Search'><h6>Search</h6></Tooltip>
                                <Input search={search} setSearch={setSearch} placeholder="Tony Qiu" />
                            </div>
                            {/* <div className='column'>
                                <Tooltip toolTipText='Status'><h6>Status</h6></Tooltip>
                                <SelectDropdown values={userStatus} handleSetState={setStatus} />
                            </div> */}
                            <Button variant='primary' text="Search" handleClick={fetchJobData} />
                        </div>
                        {applicantData.length > 0 ? <Table data={applicantData} actions={actions} /> :
                            <h4>No applicants</h4>
                        }
                    </section>
                </div>
            )}
        </>
    );
};

export default ViewJob;
