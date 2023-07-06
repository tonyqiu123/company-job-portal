import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import SelectDropdown from 'src/components/shared/SelectDropdown';
import Input from 'src/components/shared/Input';
import { deleteJobs, getJobs } from 'src/util/apiFunctions';
import { JobInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';
import { useNavigate, Link } from "react-router-dom";
import SectionLoading from 'src/components/shared/SectionLoading';

interface JobManagementProps {
    adminJwt: string
}

const JobManagement: React.FC<JobManagementProps> = ({ adminJwt }) => {
    const [search, setSearch] = useState<string>('');
    // const [status, setStatus] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const jobStatus: string[] = ['All', 'Pre-deadline', 'Post-deadline', 'Interviewing', 'Filled', 'Trashed'];
    const positions: string[] = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship'];

    const fetchJobs = async (): Promise<void> => {
        try {
            let jobs = await getJobs({ location: true, views: true, salary: true, date: true, deadline: true, remote: true, applicants: true, yoe: true, title: true, position: true }, [], search, position);

            jobs = jobs.map((job: JobInterface) => {
                return {
                    ...job,
                    applications: job.applicants?.length,
                };
            });

            setJobs(jobs);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDelete = async (selectedRows: Set<string>) => {
        try {
            const jobIdsToDelete = jobs
                .filter((job) => selectedRows.has(job._id))
                .map(job => job._id);

            await deleteJobs(jobIdsToDelete, adminJwt);
            const updatedData = jobs.filter((job) => !selectedRows.has(job._id));
            setJobs(updatedData);
        } catch (err: any) {
            console.error(err);
        }
    };

    const navigate = useNavigate();

    const actions = {
        // view job
        View_Applicants: async (selectedJob: number) => {
            try {
                const jobId = jobs[selectedJob]._id;
                navigate(`/admin/job-management/job?jobId=${jobId}`);
            } catch (err) {
                console.error(err);
            }
        },
        // edit job
    }

    useEffect(() => {
        fetchJobs();
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
                    </div>
                    <div className='hr'></div>
                    <section className='jobManagement column'>
                        <div className='dashboard-overviewStats row'>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total views: 2000'><h6>Total Views</h6></Tooltip>
                                <h2>+22057</h2>
                                <p>+29.3% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total Users'><h6>Total Applications</h6></Tooltip>
                                <h2>+231</h2>
                                <p>+16.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications: 2000'><h6>Active Jobs</h6></Tooltip>
                                <h2>+162</h2>
                                <p>+2.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications / total views'><h6>Average Application Rate</h6></Tooltip>
                                <h2>26%</h2>
                                <p>+53.2% from last month</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='jobManagement-search row'>
                                {/* <div className='column'>
                                    <Tooltip toolTipText='Status'><h6>Status</h6></Tooltip>
                                    <SelectDropdown values={jobStatus} handleSetState={setStatus} />
                                </div> */}
                                <div className='column'>
                                    <Tooltip toolTipText='Position'><h6>Position</h6></Tooltip>
                                    <SelectDropdown values={positions} handleSetState={(value) => setPosition(value === 'All' ? '' : value)} />
                                </div>
                                <div className='column'>
                                    <Tooltip toolTipText='Search'><h6>Search</h6></Tooltip>
                                    <Input handleState={setSearch} placeholder="Frontend Developer" />
                                </div>
                                <Button primary={true} text="Search" handleClick={fetchJobs} />
                            </div>
                            <Button
                                primary={true}
                                text="Create New Job"
                                handleClick={() =>
                                    new Promise<void>((resolve, reject) => {
                                        if (search==='idk') {
                                            resolve();
                                        } else {
                                            reject();
                                        }
                                    })
                                }
                            />
                        </div>
                        {jobs.length > 0 && <Table data={jobs} handleDelete={handleDelete} actions={actions} />}
                    </section>
                </div>
            )}
        </>
    );
};

export default JobManagement;
