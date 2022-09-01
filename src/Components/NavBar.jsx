import React from 'react'
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material'
import { useNavigate,useParams } from 'react-router-dom'

const Nav = styled(Button)`
  color: #95989c;
  &:hover {
    color: white;
  }
  &:active {
    color: white;
  }
`

const NavBar = () => {

  const Navigate = useNavigate()
  const { id } = useParams()


  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem('auth')
    Navigate('/')
  }

  const linkUsers = (e) => {
    e.preventDefault()
    Navigate('/users')
  }

  const linkNetworks = (e) => {
    e.preventDefault()
    Navigate('/networks')
  }

  return (
    <AppBar
      position="static"
      sx={{ background: '#292D34', display: 'flex', flexDirection: 'row' }}
    >
      <Toolbar sx={{ display: 'flex', width: 'inherit' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexDirection: 'flex-start', marginRight: '10px' }}
        >
          Aequalis
        </Typography>

        {localStorage.getItem('auth') ? (
          <>
            <Nav
              color="inherit"
              onClick={(e) => linkUsers(e)}
              sx={{
                fontSize: '15px',
                textTransform: 'none',
                color: "#95989c",
              }}

              
            >
              users
            </Nav>
            <Nav
              color="inherit"
              onClick={(e) => linkNetworks(e)}
              sx={{
                fontSize: '15px',
                textTransform: 'none',
                color: "#95989c",
              }}
            >
              network
            </Nav>

            <Button
              color="inherit"
              href="/"
              onClick={logoutHandler}
              sx={{
                fontSize: '15px',
                color: '#95989c',
                textTransform: 'none',
                justifyContent: 'flex-end',
                marginLeft: 'auto',
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
