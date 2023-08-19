import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { getMonthlyData } from 'src/util/apiFunctions'
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
// import MonthlyStat from 'src/components/admin/DataCard'; 
import DataCard from 'src/components/admin/DataCard';
import LineGraph from 'src/components/admin/LineGraph';


interface DashboardProps {
    adminJwt: string
}

const Dashboard: React.FC<DashboardProps> = ({ adminJwt }) => {

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


    const data = [10, 20, 30, 40, 50, 30, 25, 15, 5, 40];

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
                                <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                <LineGraph data={data} />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                <LineGraph data={data} />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                <LineGraph data={data} />
                            </div>
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                <LineGraph data={data} />
                            </div>

                        </div>


                    </section>

                </div>
            )}
        </>
    )

}

export default Dashboard