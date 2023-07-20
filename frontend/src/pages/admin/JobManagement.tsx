import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import SelectDropdown from 'src/components/shared/SelectDropdown';
import Input from 'src/components/shared/Input';
import { deleteJobs, getJobs, getMonthlyData } from 'src/util/apiFunctions';
import { JobInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';
import { useNavigate, Link } from "react-router-dom";
import SectionLoading from 'src/components/shared/SectionLoading';
import MonthlyStat from 'src/components/admin/MonthlyStat';

interface JobManagementProps {
    adminJwt: string
}

const JobManagement: React.FC<JobManagementProps> = ({ adminJwt }) => {
    const [search, setSearch] = useState<string>('');
    // const [status, setStatus] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [monthlyData, setMonthlyData] = useState<any>([{}])

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

    const fetchMonthlyData = async (): Promise<void> => {
        try {
            const data = await getMonthlyData()
            setMonthlyData(data)
        } catch (err) {
            console.error(err);
        }
    }


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
                            <MonthlyStat header='Views this month' toolTipText='The total number of views received in this month.' stat={monthlyData[monthlyData.length - 1].views} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].views : 0} />
                            <MonthlyStat header='Applications this month' toolTipText='The total number of applications received in this month.' stat={monthlyData[monthlyData.length - 1].applications} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].applications : 0} />
                            <MonthlyStat header='Active Jobs' toolTipText='The number of currently active job listings.' stat={monthlyData[monthlyData.length - 1].activeJobs} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].activeJobs : 0} />
                            <MonthlyStat header='Application Rate' toolTipText='The percentage of views that resulted in job applications.' stat={parseFloat((monthlyData[monthlyData.length - 1].applicationRate * 100).toFixed(2))} prevStat={monthlyData.length > 1 ? parseFloat((monthlyData[monthlyData.length - 2].applicationRate * 100).toFixed(2)) : 0} />

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
