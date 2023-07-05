import React from 'react';

const SectionLoading: React.FC = () => {
    return (
        <div className='body'>
            <div className='dashboardTitle row'>
                <div className='skele-title'></div>
            </div>
            <div className='hr'></div>
            <section className='column'>
                <div style={{ width: '100%', gap: '32px' }} className='row'>
                    <div style={{ height: '140px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '140px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '140px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '140px', maxWidth: '100%' }} className='skele-title'></div>
                </div>
                <div style={{ width: '100%', gap: '32px' }} className='row'>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                    <div style={{ height: '80px', maxWidth: '100%' }} className='skele-title'></div>
                </div>
                <div style={{ height: '100px', marginTop: '0' }} className='skele-longText'></div>
                <div style={{ height: 'calc(100vh - 560px)', marginTop: '0', marginBottom: '-30px' }} className='skele-longText'></div>
            </section>
        </div>
    );
}

export default SectionLoading;
