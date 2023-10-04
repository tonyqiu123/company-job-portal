import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import 'src/css/shared/login.css'
import { signup } from 'src/util/apiFunctions'
import Button from 'src/components/shared/Button'
import Input from '../shared/Input';
import { useDispatch } from 'react-redux';
import { overwriteUserData } from 'src/redux/userSlice';


const Signup: React.FC = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const emailWarning = document.querySelector('.emailWarning');
    if (emailWarning) {
      if (email !== '') {
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? emailWarning.classList.remove('invalid') : emailWarning.classList.add('invalid');
      } else {
        emailWarning.classList.remove('invalid');
      }
    }
  }, [email]);


  useEffect(() => {
    const passwordWarning = document.querySelector('.passwordWarning')
    if (passwordWarning) {
      if (password !== '') {
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? passwordWarning.classList.remove('invalid') : passwordWarning.classList.add('invalid')
      } else {
        passwordWarning.classList.remove('invalid')
      }
    }
  }, [password])


  const handleSignup = async () => {
    try {
      if (!firstName || !lastName || !email || !password) {
        setError('Please fill in all inputs')
        throw new Error('Please fill in all fields')
      }
      const data = await signup(firstName, lastName, email, password)
      localStorage.setItem('modernJobPortal_jwt', data.token);
      dispatch(overwriteUserData(data.jwt));
      window.location.href = '/profile';
    } catch (err) {
      throw err
    }
  }

  return (
    <>
      <h3>Create your account</h3>
      <div className='row' style={{ gap: '16px' }}>
        <div className='inputCont column'>
          <h6>First Name</h6>
          <Input placeHolder='First name' search={firstName} setSearch={setFirstName} />
        </div>
        <div className='inputCont column'>
          <h6>Last Name</h6>
          <Input placeHolder='Last name' search={lastName} setSearch={setLastName} />
        </div>
      </div>
      <div className='inputCont column'>
        <h6>Email</h6>
        <Input placeHolder='Enter your email' search={email} setSearch={setEmail} />
        <p className='emailWarning'>Invalid email</p>
      </div>
      <div className='inputCont column'>
        <h6>Password</h6>
        <Input type='password' placeHolder='Password' search={password} setSearch={setPassword} />
        <p className='passwordWarning'>Password must be 8 characters, contain one uppercase letter, one lowercase letter, one digit, and one special character</p>
      </div>
      {error && <div>
        <p className='errorMsg'>{error}</p>
      </div>}
      <Button text='Sign up' handleClick={() => handleSignup()} variant='primary' ></Button>
      <div className='signUp-cont row'>
        <p style={{ color: 'var(--neutral-4)' }}>Already have an account?</p>
        <Link to="/login" className='column'><p style={{ color: 'var(--primary-2)' }}>Login</p></Link>
      </div>
    </>
  )
};

export default Signup