import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from 'src/util/apiFunctions'
import Button from 'src/components/shared/Button'

interface LoginProps {
    setUserJwt: (jwt: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUserJwt }) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>('')

    const handleLogin = async (): Promise<void> => {
            try {
                if (!email || !password) {
                    setError('Please enter an email and password')
                    throw new Error('Please enter your email and password');
                }
                const data = await login(email, password)
                localStorage.setItem('modernJobPortal_jwt', data.token);
                setUserJwt(data.token);
                window.location.href = '/search';
            } catch (err: any) {
                setError(err.message)
                throw err
            }
    }

    return (
        <>
            <h3>Login to your account</h3>
            <div className='inputCont column'>
                <h6>Email</h6>
                <input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='inputCont column'>
                <h6>Password</h6>
                <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div>
                <p className='errorMsg'>{error}</p>
            </div>}
            <Button text='Login' handleClick={handleLogin} primary={true}></Button>
            <div className='signUp-cont row'>
                <p style={{ color: 'var(--neutral-4)' }}>Don't have an account?</p>
                <Link to="/sign-up" className='column'><p style={{ color: 'var(--primary-2)' }}>Sign up</p></Link>
            </div>
        </>
    )
}

export default Login