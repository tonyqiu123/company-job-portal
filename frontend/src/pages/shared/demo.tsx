function Demo() {
    return (
        <div className="split-content" style={{ height: '100dvh', width: '100dvw', display: 'flex', flexDirection: 'column', overflowX:'hidden' }}>
            <div style={{ display:'flex' }}>
                <h3 style={{ width:'50dvw', textAlign:'center', backgroundColor:'black', color:'white', padding:'24px' }}>User</h3>
                <h3 style={{ width:'50dvw', textAlign:'center', backgroundColor:'black', color:'white', padding:'24px' }}>Admin</h3>
            </div>
            <div style={{ display:'flex' }}>

                <iframe
                    style={{ width: '50vw', height: 'calc(100dvh - 84px)', border: 'none' }}
                    className="half"
                    title="Website 1"
                    src="https://company-job-portal.netlify.app/sign-up" // Replace with the URL of the first website
                    allowFullScreen
                >
                </iframe>
                <iframe
                    style={{ width: '50vw', height: 'calc(100dvh - 84px)', border: 'none' }}
                    className="half"
                    title="Website 2"
                    src="https://company-job-portal.netlify.app/admin/login" // Replace with the URL of the second website
                    allowFullScreen
                ></iframe>
            </div>

        </div>
    );
}

export default Demo;
