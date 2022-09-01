import React from 'react'
import { useState } from 'react'
import { Stack, TextField, Button, styled, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'

const Login = () => {
  console.log('object')
  const { entities } = useSelector((state) => state.users)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [alert1, setAlert1] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const NameHandler = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setNameError(false)
      setName(e.target.value)
    }
     else {
      setNameError(true)
      setName('')
    }
  }

  const PasswordHandler = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setPasswordError(false)
      setPassword(e.target.value)
    } else {
      setPasswordError(true)
      setPassword('')
    }
  }

  const Navigate = useNavigate()
  React.useEffect(() => {
    if (localStorage.getItem('auth')) {
      Navigate('/users')
    }
  }, [Navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    const result = entities.find((data) => data.name === name)

    if (!name || !password) {
      if (!name) {
        setNameError(true)
      } else {
        setNameError(false)
      }

      if (!password) {
        setPasswordError(true)
      } else {
        setPasswordError(false)
      }

      return
    }

    if (result === undefined) {
      setAlert1(true)
    }

    if (name && password) {
      if (name === result.name && password === result.password) {
        localStorage.setItem('login', name)
        setAlert1(false)
        Navigate('/users')
        localStorage.setItem('auth', true)
        setName('')
        setPassword('')
      } else {
        setAlert1(true)
      }
    }
    // setName('')
    // setPassword('')
  }

  return (
    <>
      <NavBar />
      <Stack spacing={2}>
        <StyledForm onSubmit={submitHandler}>
          <Stack spacing={2}>
            <Stack spacing={2}>
              {alert1 ? (
                <StyledAlert
                  variant="filled"
                  severity="error"
                  onClose={() => setAlert1(false)}
                >
                  Username or password mismatch
                </StyledAlert>
              ) : (
                <></>
              )}
            </Stack>
            <h4>Login</h4>
            <Stack spacing={2}>
              <StyledTextField
                value={null}
                error={nameError}
                InputLabelProps={{ shrink: true }}
                placeholder="username"
                size="small"
                helperText={nameError ? 'please enter UserName' : ''}
                onChange={(e) => NameHandler(e)}
              />
            </Stack>
            <Stack spacing={2}>
              <StyledTextField
                type="password"
                placeholder="password"
                size="small"
                value={null}
                onChange={(e) => PasswordHandler(e)}
                error={passwordError}
                helperText={passwordError ? 'please enter password' : ''}
              />
            </Stack>
            <StyledButton variant="contained" type="submit">
              SUBMIT
            </StyledButton>
          </Stack>
        </StyledForm>
      </Stack>
    </>
  )
}

export default Login

const StyledTextField = styled(TextField)`
  width: 500px;
`
const StyledForm = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled(Button)`
  width: 25%;
  padding: 2px;
  background-color: #6a4ac4;
`

const StyledAlert = styled(Alert)`
  width: 470px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffd477;
  color: black;
`
