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

interface CreateJobProps {
    adminJwt: string
}

const CreateJob: React.FC<CreateJobProps> = ({ adminJwt }) => {
    const [search, setSearch] = useState<string>('');
    // const [status, setStatus] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const jobStatus: string[] = ['All', 'Pre-deadline', 'Post-deadline', 'Interviewing', 'Filled', 'Trashed'];
    const positions: string[] = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship'];

    useEffect(() => {
        setIsLoading(false)
    }, [])



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
                        <Link to={location}><h2>Create Job</h2></Link>
                    </div>
                    <div className='hr'></div>
                    <section className='jobManagement column'>

                    </section>
                </div>
            )}
        </>
    );
};

export default CreateJob;
