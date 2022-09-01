import React, { useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavBar from './NavBar'
import LoginForm from './LoginForm'

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Stack,
  styled,
} from '@mui/material'

const Heading = styled('p')`
  margin-left: 20px;
  font-size: 15px;
`
const StyledImage = styled('img')`
  border-radius: 50%;
  width: 70px;
  height: 70px;
`
const UserDetails = () => {
  const Navigate = useNavigate()
  const { entities } = useSelector((state) => state.users)
  const { id } = useParams()
  const users = entities.filter((user) => user.id === id)

  const [open, setOpen] = useState(false)

  localStorage.setItem('path', 'userDetails')
  localStorage.setItem('id', id)

  React.useEffect(() => {
    if (!localStorage.getItem('auth')) {
      Navigate('/')
    }
  })

  return (
    <>
      <NavBar />

      <Stack
        sx={{
          padding: '20px',
          backgroundColor: 'rgba(0,0,0,.2)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {' '}
        <Link to="/users">users</Link> / {id}
      </Stack>
      <Box sx={{ width: '50%', margin: '2% 10%' }}>
        <Card sx={{ height: '320px', justifyContent: 'center' }}>
          <Stack sx={{ backgroundColor: 'rgba(0,0,0,.1)' }}>
            <Heading>User</Heading>
          </Stack>
          <CardContent sx={{ width: '95%', height: '200px' }}>
            <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Stack spacing={2} sx={{ fontSize: '15px', width: '35%' }}>
                <p>Login : {users[0].name}</p>
                <p>Role : {users[0].role}</p>
                <p>Data(json) :{users[0].data}</p>
              </Stack>
              <Stack
                spacing={2}
                sx={{
                  marginLeft: '50px',
                  fontSize: '15px',
                  width: '35%',
                  height: 'inherit%',
                  justifyContent: 'center',
                }}
              >
                <p>Status:{users[0].status} </p>
              </Stack>
              <Stack
                sx={{ width: '30%', height: '100%', justifyContent: 'center' }}
              >
                <StyledImage src={users[0].image} alt="profile" />
              </Stack>
            </Stack>
            <CardActions
              sx={{ justifyContent: 'end', transform: 'translate(0px,50px)' }}
            >
              {<LoginForm value={open} details={id} option={'edit'} />}
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default UserDetails
