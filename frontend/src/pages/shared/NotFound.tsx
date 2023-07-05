import React from 'react';


function NotFound() {

    const style: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '2rem',
        fontWeight: 'bold',
    };

    return (
        <>
            <div style={style}>
                <p>404 page doesn't exist.</p>
            </div>
        </>
    );
}

export default NotFound;
