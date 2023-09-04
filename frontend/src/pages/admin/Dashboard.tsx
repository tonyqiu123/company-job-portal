import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { getMonthlyData } from 'src/util/apiFunctions'
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
// import MonthlyStat from 'src/components/admin/DataCard'; 
import DataCard from 'src/components/admin/DataCard';
import SimpleLineChart from 'src/components/admin/SimpleLineChart';


interface DashboardProps {
    adminJwt: string
}

const Dashboard: React.FC<DashboardProps> = ({ adminJwt }) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [monthlyData, setMonthlyData] = useState<any[]>([{}])


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

    useEffect(() => {
        console.log(monthlyData)
    }, [monthlyData])

    return (
        <>
            <div className={`sectionLoading column ${!isLoading && 'skele-exit'}`}>
                <SectionLoading />
            </div>
            {!isLoading && adminJwt && (
                <div className='body contentLoaded'>
                    <div className='dashboardTitle row'>
                        <Link to="/admin/dashboard"><h2>Dashboard</h2></Link>
                    </div>
                    <div className='hr'></div>
                    <section className='dashboard column'>

                        <DataCard data={monthlyData} />

                        <div className='dashboard-graphs column'>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Applications</h4></Tooltip>
                                <SimpleLineChart data={monthlyData} yAxis='applications' />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Application Rate</h4></Tooltip>
                                <SimpleLineChart data={monthlyData} yAxis='applicationRate' />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Jobs Posted</h4></Tooltip>
                                <SimpleLineChart data={monthlyData} yAxis='jobsPosted' />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Signups</h4></Tooltip>
                                <SimpleLineChart data={monthlyData} yAxis='signups' />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Views</h4></Tooltip>
                                <SimpleLineChart data={monthlyData} yAxis='views' />
                            </div>


                        </div>

                    </section>

                </div>
            )}
        </>
    )

}

export default Dashboard