import React from 'react'

function BadLogin() {

    const style= {
        loading: {
            position: 'absolute',  
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            fontWeight: 'bold',
        }
    }


    return (
        <>
        <div style={style.loading}>
            <a href="/">Goto login</a>
        </div>
        </> 
    )
}

export default BadLogin