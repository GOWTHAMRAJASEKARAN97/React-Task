import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { userDeleted } from './UserSlice1'
import NavBar from './NavBar'
import LoginForm from './LoginForm'

import InfoIcon from '@mui/icons-material/Info'
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Stack,
  styled,
  TextField,
  MenuItem,
  ListSubheader,
  Tooltip,
  IconButton,
} from '@mui/material'

const StyledImage = styled('img')`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

const Users = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const { entities } = useSelector((state) => state.users)
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState('' || 'name')
  const [filtered, setFiltered] = useState('')
  const [list, setList] = useState(entities)
  const [tooltip, setTooltip] = useState('Default')
  localStorage.setItem('path', 'users')

  React.useEffect(() => {
    if (!localStorage.getItem('auth')) {
      Navigate('/')
    }
  }, [Navigate])

  const DetailHandler = (e, id) => {
    e.preventDefault()
    if (localStorage.getItem('auth')) {
      Navigate(`/user/${id}`)
    }
  }

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  React.useEffect(() => {
    setFiltered(
      entities.filter((items) => {
        return (
          items[dropdown].toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      }),
    )
  }, [search, dropdown, entities])

  const AccHandler = (e) => {
    e.preventDefault()

    setList(entities)
    setTooltip('Accending')
    setFiltered(filtered.slice().sort((a, b) => (a.name > b.name ? 1 : -1)))

    if (!search) {
      setList('')
      setList(entities.slice().sort((a, b) => (a.name > b.name ? 1 : -1)))
    }
  }

  const DecHandler = (e) => {
    e.preventDefault()

    setTooltip('Decending')
    setList(entities)
    setFiltered(filtered.slice().reverse())

    if (!search) {
      setList('')
      setList(entities.slice().reverse())
    }
  }

  React.useEffect(() => {
    if (!search) {
      setList(entities)
    }
  }, [search, entities])

  return (
    <>
      {/* Navigation bar authentication */}

      {localStorage.getItem('auth') ? <NavBar /> : <></>}

      {/* dropdown and search bar */}

      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: '95%',
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 1,
        }}
      >
        {/* <Dropdown /> */}

        <TextField
          placeholder="select"
          select
          value={dropdown}
          sx={{ width: '100px' }}
          size="small"
          onChange={(e) => setDropdown(e.target.value)}
        >
          <MenuItem value={'name'} defaultValue={'name'}>
            <ListSubheader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '23px',
                width: '62px',
                alignItems: 'center',
              }}
            >
              Login
            </ListSubheader>
          </MenuItem>
          <MenuItem value={'role'}>
            <ListSubheader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '23px',
                width: '62px',
                alignItems: 'center',
              }}
            >
              Role
            </ListSubheader>
          </MenuItem>
          <MenuItem value={'status'}>
            <ListSubheader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '23px',
                width: '62px',
                alignItems: 'center',
              }}
            >
              Status
            </ListSubheader>
          </MenuItem>
        </TextField>

        <TextField
          placeholder="Search"
          value={search}
          sx={{ width: '200px', marginRight: '10px' }}
          size="small"
          onChange={(e) => handleSearch(e)}
        />
      </Stack>

      {/* users table */}

      {search ? (
        <TableContainer
          component={Paper}
          sx={{
            margin: ' 2% auto',
            width: '90%',
            maxHeight: '400px',
            marginBottom: '15px',
            borderRadius: '0px',
          }}
        >
          <Table aria-label="userList" stickyHeader>
            <TableHead style={{ zIndex: 0 }}>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Profile
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#e8e8e8',
                  }}
                  align="center"
                >
                  Login
                  <Tooltip
                    title={tooltip}
                    placement="right"
                    arrow
                    enterDelay={500}
                    leaveDelay={200}
                    size="small"
                  >
                    <IconButton>
                      <InfoIcon sx={{ width: '15px', height: '15px' }} />
                    </IconButton>
                  </Tooltip>
                  <Stack
                    sx={{
                      display: 'flex',
                      height: 'auto',
                      width: 'fit-content',
                      padding: '4px',
                      margin: ' 1% auto',
                    }}
                  >
                    <Button
                      sx={{ height: '10px' }}
                      onClick={(e) => AccHandler(e)}
                    >
                      ꜛ
                    </Button>
                    <Button
                      sx={{ height: '10px', width: '10px' }}
                      onClick={(e) => DecHandler(e)}
                    >
                      ↓
                    </Button>
                  </Stack>
                </TableCell>

                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Role
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Data
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities.length &&
                filtered.map(({ id, name, image, role, data }, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-chid td,&:last-child th': { border: 1 } }}
                  >
                    {/* {" "} */}
                    <TableCell align="center">
                      <StyledImage src={image} alt="profile" />
                    </TableCell>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{role}</TableCell>
                    <TableCell align="center">
                      {name === localStorage.getItem('login')
                        ? 'Active'
                        : 'Loggedout'}
                    </TableCell>
                    <TableCell align="center">{data}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: '#65c1d6',
                          textTransform: 'none',
                        }}
                        onClick={(e) => DetailHandler(e, id)}
                      >
                        Details
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: 'red',
                          textTransform: 'none',
                          marginLeft: '3px',
                        }}
                        onClick={() => handleDelete(id)}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            margin: ' 2% auto',
            width: '90%',
            maxHeight: '400px',
            marginBottom: '15px',
            borderRadius: '0px',
          }}
        >
          <Table aria-label="userList" stickyHeader>
            <TableHead style={{ zIndex: 0 }}>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Profile
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: '#e8e8e8',
                  }}
                  align="center"
                >
                  Login
                  <Tooltip
                    title={tooltip}
                    placement="right"
                    arrow
                    enterDelay={500}
                    leaveDelay={200}
                    size="small"
                  >
                    <IconButton>
                      <InfoIcon sx={{ width: '15px', height: '15px' }} />
                    </IconButton>
                  </Tooltip>
                  <Stack
                    sx={{
                      display: 'flex',
                      height: 'auto',
                      width: 'fit-content',
                      padding: '4px',
                      margin: ' 1% auto',
                    }}
                  >
                    <Button
                      sx={{ height: '10px' }}
                      onClick={(e) => AccHandler(e)}
                    >
                      ꜛ
                    </Button>
                    <Button
                      sx={{ height: '10px', width: '10px' }}
                      onClick={(e) => DecHandler(e)}
                    >
                      ↓
                    </Button>
                  </Stack>
                </TableCell>

                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Role
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Data
                </TableCell>
                <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities.length &&
                list.map(({ id, name, image, role, data }, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-chid td,&:last-child th': { border: 1 } }}
                  >
                    {/* {" "} */}
                    <TableCell align="center">
                      <StyledImage src={image} alt="profile" />
                    </TableCell>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{role}</TableCell>
                    <TableCell align="center">
                      {name === localStorage.getItem('login')
                        ? 'Active'
                        : 'Loggedout'}
                    </TableCell>
                    <TableCell align="center">{data}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: '#65c1d6',
                          textTransform: 'none',
                        }}
                        onClick={(e) => DetailHandler(e, id)}
                      >
                        Details
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: 'red',
                          textTransform: 'none',
                          marginLeft: '3px',
                        }}
                        onClick={() => handleDelete(id)}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Stack
        sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 8 }}
        direction="row"
      >
        <LoginForm />
      </Stack>
    </>
  )
}

export default Users
