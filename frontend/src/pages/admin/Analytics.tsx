import React, { useState, useEffect } from 'react';
import 'src/css/admin/analytics.css'
import Tooltip from 'src/components/shared/Tooltip';

const Analytics: React.FC = () => {

    return (
        <>
            <div className='body'>
                <div className='dashboardTitle column'>
                    <h2>Analytics</h2>
                </div>
                <div className='hr'></div>
                <section className='analytics row'>

                    <div className='column'>
                        <div className='analytics-stat column'>
                            <Tooltip toolTipText='Total Stats'><h4>Total Stats</h4></Tooltip>
                            <Tooltip toolTipText='Active Users: 80'><h6>Active Users: 80</h6></Tooltip>
                            <Tooltip toolTipText='Total Number of Job Postings: 500'><h6>Total Number of Job Postings: 500</h6></Tooltip>
                            <Tooltip toolTipText='Total Number of Job Applications: 10000'><h6>Total Number of Job Applications: 10000</h6></Tooltip>
                            <Tooltip toolTipText='Total User Registration: 2000'><h6>Total User Registration: 2000</h6></Tooltip>
                            <Tooltip toolTipText='Total Site Visits: 500000'><h6>Total Site Visits: 500000</h6></Tooltip>
                        </div>

                    </div>
                    <div className='column'>
                        <div className='analytics-graph column'>
                            <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                            <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                        </div>
                        <div className='analytics-graph column'>
                            <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                            <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                        </div>
                        <div className='analytics-graph column'>
                            <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                            <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                        </div>
                    </div>
                </section>

            </div>
        </>
    )

}

export default Analytics