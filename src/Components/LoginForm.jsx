import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAdded, userUpdated } from './UserSlice1'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Stack,
  TextareaAutosize,
  MenuItem,
} from '@mui/material'

const LoginForm = (details) => {
  const { entities } = useSelector((state) => state.users)
  const id = details.details
  const users = entities.filter((user) => user.id === id)
  const action = details.option
  const gathered = localStorage.getItem('path')
  const ButtonChange = localStorage.getItem('path')
  const dispatch = useDispatch()
  const NameChanger = action === 'edit' ? users[0].name : ''
  const RoleChanger = action === 'edit' ? users[0].role : ''
  const StatusChanger = action === 'edit' ? users[0].status : ''
  const PasswordChanger = action === 'edit' ? users[0].password : ''
  const ConfirmPasswordChanger =
    action === 'edit' ? users[0].confirmPassword : ''
  const DataChanger = action === 'edit' ? users[0].data : ''

  const [open, setOpen] = useState(false)
  const [confirmError, setConfirmError] = useState(false)
  const [alert, setAlert] = useState(true)
  const [dc, setDc] = useState(false)
  const [nameAlert, setNameAlert] = useState(false)
  const [imageAlert, setImageAlert] = useState(false)
  const [roleAlert, setRoleAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState(false)
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState(false)
  const [name, setName] = useState(NameChanger)
  const [role, setRole] = useState(RoleChanger)
  const [password, setPassword] = useState(PasswordChanger)
  const [status, setStatus] = useState(StatusChanger)
  const [confirmPassword, setConfirmPassword] = useState(ConfirmPasswordChanger)
  const [data, setData] = useState(DataChanger)
  const [dataCheck, setDataCheck] = useState('')
  const ImageChanger = action === 'edit' ? users[0].image : ''
  const [image, setImage] = useState(ImageChanger)

  const handleImage = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setImage(window.URL.createObjectURL(e.target.files[0]))
    }else{
      setImageAlert(true)
    }
  }

  const handleName = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setNameAlert(false)
      setName(e.target.value)
    } else {
      setNameAlert(true)
      setName('')
    }
  }

  const handleRole = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setRoleAlert(false)
      setRole(e.target.value)
    } else {
      setRoleAlert(true)
      setRole('')
    }
  }
  const handleStatus = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setStatusAlert(false)
      setStatus(e.target.value)
    } else {
      setStatusAlert(true)
      setStatus('')
    }
  }
  const handlePassword = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setPasswordAlert(false)
      setPassword(e.target.value)
    } else {
      setPasswordAlert(true)
      setPassword('')
    }
  }
  const handleConfirmPassword = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setConfirmPasswordAlert(false)
      setConfirmPassword(e.target.value)
    } else {
      setConfirmPasswordAlert(true)
      setConfirmPassword('')
    }
  }

  React.useEffect(() => {
    if (confirmPassword !== password) {
      setConfirmError(true)
    } else {
      setConfirmError(false)
    }
  }, [password, confirmPassword])

  const handleData = (e) => {
    e.preventDefault()

    if (e.target.value !== '') {
      setDataAlert(false)
      setData(e.target.value)
      setDc(false)
    } else {
      setDataAlert(true)
      setDc(true)
      setData('')
    }

    // e.preventDefault()
    // setData(e.target.value)
    // if (e.target.value !== '') {
    //   setDc(true)
    // } else {
    //   setDc(false)
    // }
  }

  React.useEffect(() => {
    if (data) {
      try {
        JSON.parse(data)
      } catch (e) {
        setDataCheck(true)
        return
      }
      setDataCheck(false)
      return
    }
  }, [data])

  React.useEffect(() => {
    if (name && status && role && data && password) {
      setAlert(false)
    }
  }, [data, name, password, role, status, alert])

  const handleSubmit = () => {
    setOpen(false)
    if (name && status && role && data && password) {
      if (action !== 'edit') {
        dispatch(
          userAdded({
            id: Math.floor(Math.random() * 1000000).toString(),
            name,
            status,
            image,
            role,
            data,
            password,
            confirmPassword,
          }),
        )

        setName('')
        setStatus('')
        setRole('')
        setData('')
        setImage('')
        setPassword('')
        setConfirmPassword('')
        setAlert(true)
      } else if (action === 'edit') {
        dispatch(
          userUpdated({
            id: id,
            name,
            status,
            image,
            role,
            data,
            password,
            confirmPassword,
          }),
        )
      }
    }

    // setName('')
    // setStatus('')
    // setRole('')
    // setData('')
    // setPassword('')
    // setConfirmPassword('')
  }

  const handleEdit = () => {
    setOpen(true)
    if (data === '') {
      setDc(true)
    } else {
      setDc(false)
    }
  }

  return (
    <>
      {ButtonChange === 'userDetails' ? (
        <Button
          variant="contained"
          size="smaller"
          sx={{ width: '50px', textTransform: 'none' }}
          onClick={handleEdit}
        >
          Edit
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          sx={{
            background: 'green',
            textTransform: 'none',
          }}
          onClick={() => setOpen(true)}
        >
          Add new user
        </Button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-discription"
      >
        {gathered === 'users' ? (
          <DialogTitle
            id="dialog-title"
            sx={{ borderBottom: '1px solid grey' }}
          >
            Create new user
          </DialogTitle>
        ) : (
          <DialogTitle
            id="dialog-title"
            sx={{ borderBottom: '1px solid grey' }}
          >
            Edit user
          </DialogTitle>
        )}

        <DialogContent sx={{ mt: 1, borderBottom: '1px solid grey' }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <Stack spacing={0}>
                <DialogContentText sx={{ fontSize: 'small' }}>
                  Login
                </DialogContentText>

                <TextField
                  placeholder="Name"
                  size="small"
                  value={name}
                  error={nameAlert}
                  onChange={handleName}
                  helperText={nameAlert ? 'please enter UserName' : ''}
                  inputProps={{ style: { fontSize: 'small' } }}
                />
              </Stack>
              <Stack>
                <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                  Profile
                </DialogContentText>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  sx={{
                    width: '200px',
                    height: 'auto',
                    paddingTop: '7px',
                    paddingBottom: '7px',
                  }}
                  inputProps={{ style: { fontSize: 'small' } }}
                >
                  <input type="file" onChange={(e) => handleImage(e)} />
                </Button>
                {imageAlert === '' ? (
                  <DialogContentText
                    sx={{
                      fontSize: 'smaller',
                      color: '#c53229',
                      margin: 'auto',
                    }}
                  >
                    upload image
                  </DialogContentText>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack sx={{ width: '50%' }}>
                <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                  Role
                </DialogContentText>

                <TextField
                  placeholder="Role"
                  select
                  size="small"
                  fontSize="10px"
                  value={role}
                  error={roleAlert}
                  onChange={handleRole}
                  helperText={roleAlert ? 'please enter Role' : ''}
                  sx={{ fontSize: '10px' }}
                >
                  <MenuItem defaultValue></MenuItem>
                  <MenuItem value="Super Admin">SuperAdmin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Client">Client</MenuItem>
                </TextField>
              </Stack>
              <Stack sx={{ width: '50%', fontSize: '15px' }}>
                <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                  Status
                </DialogContentText>

                <TextField
                  placeholder="Status"
                  select
                  size="small"
                  value={status}
                  error={statusAlert}
                  onChange={handleStatus}
                  helperText={statusAlert ? 'please enter Status' : ''}
                  inputProps={{ style: { fontSize: 'small' } }}
                >
                  <MenuItem defaultValue></MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Loggedout">Loggedout</MenuItem>
                </TextField>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack>
                <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                  Password
                </DialogContentText>

                <TextField
                  placeholder="Password"
                  size="small"
                  value={password}
                  error={passwordAlert}
                  type="password"
                  onChange={handlePassword}
                  helperText={passwordAlert ? 'please enter Password' : ''}
                  inputProps={{ style: { fontSize: 'small' } }}
                />
              </Stack>
              <Stack>
                <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                  Confirm password
                </DialogContentText>

                <TextField
                  placeholder="Confirm Password"
                  size="small"
                  value={confirmPassword}
                  error={confirmPasswordAlert}
                  type="password"
                  onChange={handleConfirmPassword}
                  helperText={
                    confirmPasswordAlert ? 'please enter ConfirmPassword' : ''
                    // (confirmError===true? "passwords mismatch":"")
                  }
                  inputProps={{ style: { fontSize: 'small' } }}
                />
              </Stack>
            </Stack>

            <Stack>
              {confirmError === true ? (
                <DialogContentText
                  sx={{ fontSize: 'smaller', color: '#c53229', margin: 'auto' }}
                >
                  passwords mismatch
                </DialogContentText>
              ) : (
                <></>
              )}
            </Stack>

            <Stack>
              <DialogContentText sx={{ fontSize: 'small', color: '#050505' }}>
                Data(json)  
              </DialogContentText>

              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Enter Json"
                style={{ width: 'auto', height: '50px' }}
                inputProps={{ style: { fontSize: 'small' } }}
                value={data}
                // error={!data}
                onChange={handleData}
              />

              {dataCheck === true ? (
                <DialogContentText
                  sx={{ fontSize: 'smaller', color: '#c53229' }}
                >
                  enter valid JSON data
                </DialogContentText>
              ) : (
                <></>
              )}
              {/* {dc === false ? (
                <DialogContentText
                  sx={{ fontSize: 'smaller', color: '#c53229' }}
                >
                  enter JSON data
                </DialogContentText>
              ) : */}
              
              {dataAlert ? (
                <DialogContentText
                  sx={{ fontSize: 'smaller', color: '#c53229' }}
                >
                  enter JSON data
                </DialogContentText>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ margin: '10px', paddingBottom: '25px', width: '88%' }}
        >
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="small"
            sx={{
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            autoFocus
            variant="contained"
            size="small"
            sx={{
              background: 'green',
              textTransform: 'none',
            }}
            disabled={alert}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginForm
