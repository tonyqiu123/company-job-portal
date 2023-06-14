import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import SelectDropdown from 'src/components/shared/SelectDropdown';
import Input from 'src/components/shared/Input';
import { getJobs } from 'src/util/apiFunctions';
import { JobInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';

const JobManagement: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [jobAction, setJobAction] = useState<string>('View');
    const [position, setPosition] = useState<string>('Full time');
    const [jobs, setJobs] = useState<JobInterface[]>([]);

    const jobStatus: string[] = ['All', 'Pre-deadline', 'Post-deadline', 'Interviewing', 'Filled', 'Trashed'];
    const jobActions: string[] = ['View', 'Edit', 'Delete'];
    const positions: string[] = ['Full time', 'Part time', 'Contract', 'Internship'];


    const fetchJobs = async (): Promise<void> => {
        try {
            const jobs = await getJobs({ search, status });
            setJobs(jobs);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);


    return (
        <>
            <div className='body'>
                <div className='dashboardTitle column'>
                    <h2>Job Management</h2>
                </div>
                <div className='hr'></div>
                <section className='jobManagement column'>
                    <Button primary={true} text="Create New Job" handleClick={() => new Promise((resolve, reject) => resolve())} />
                    <div className='jobManagement-search row'>
                        <div className='column'>
                            <Tooltip toolTipText='Select Action'><h6>Select Action</h6></Tooltip>
                            <SelectDropdown values={jobActions} handleSetState={setJobAction} />
                        </div>
                        <div className='column'>
                            <Tooltip toolTipText='Status'><h6>Status</h6></Tooltip>
                            <SelectDropdown values={jobStatus} handleSetState={setStatus} />
                        </div>
                        <div className='column'>
                            <Tooltip toolTipText='Position'><h6>Position</h6></Tooltip>
                            <SelectDropdown values={positions} handleSetState={setPosition} />
                        </div>
                        <div className='column'>
                            <Tooltip toolTipText='Search'><h6>Search</h6></Tooltip>
                            <Input handleState={setSearch} placeholder="Frontend Developer" />
                        </div>
                        <Button primary={true} text="Search" handleClick={fetchJobs} />
                    </div>

                    {jobs.length > 0 && <Table data={jobs} showDelete={jobAction === 'Delete'} />}

                </section>
            </div>
        </>
    );
};

export default JobManagement;
