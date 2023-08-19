import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import Input from 'src/components/shared/Input';
import { deleteJobs, getJobs, getMonthlyData } from 'src/util/apiFunctions';
import { JobInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';
import { useNavigate, Link } from "react-router-dom";
import SectionLoading from 'src/components/shared/SectionLoading';
import DataCard from 'src/components/admin/DataCard';
import Select from 'src/components/shared/Select';

interface JobManagementProps {
    adminJwt: string
}

const JobManagement: React.FC<JobManagementProps> = ({ adminJwt }) => {
    const [search, setSearch] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [monthlyData, setMonthlyData] = useState<any>([{}])


    const fetchMonthlyData = async (): Promise<void> => {
        try {
            const data = await getMonthlyData()
            setMonthlyData(data)
            setIsLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMonthlyData()
    }, [])


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
        fetchMonthlyData();
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
                            <DataCard data={monthlyData} />

                        </div>
                        <div style={{ alignItems: 'flex-start' }} className='row'>
                            <div className='jobManagement-search row'>
                                <div className='column'>
                                    <Tooltip toolTipText='Position'><h6>Position</h6></Tooltip>
                                    <Select queries={positions} selected={position} setSelected={setPosition} />
                                </div>
                                <div className='column'>
                                    <Tooltip toolTipText='Search'><h6>Search</h6></Tooltip>
                                    <Input search={search} setSearch={setSearch} placeholder="Frontend Developer" />
                                </div>
                                <Button variant='primary' text="Search" handleClick={fetchJobs} />
                            </div>
                            <Button
                                variant='primary'
                                text="Create New Job"
                                handleClick={async () => navigate('/admin/job-management/create-job')}
                            />
                        </div>
                        {jobs.length > 0 ? <Table data={jobs} handleDelete={handleDelete} actions={actions} /> :
                            <h4>No jobs</h4>
                        }
                    </section>
                </div>
            )}
        </>
    );
};

export default JobManagement;
