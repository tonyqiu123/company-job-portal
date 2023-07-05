import React from 'react';

interface BadLoginProps {
  isAdminUrl: boolean;
}

function BadLogin({ isAdminUrl }: BadLoginProps) { 

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
        <a href={isAdminUrl ? '/admin/login' : '/login'}>Go to login</a>
      </div>
    </>
  );
}

export default BadLogin;
