import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { networkDeleted } from './NetworksSlice'
import NetworkForm from './NetworkForm'

import {
  Stack,
  TableCell,
  Button,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Paper,
  TableContainer,
  TextField,

  // styled,
} from '@mui/material'
// import NetworkInput from "./NetworksInput";
import { useState } from 'react'

const Networks = () => {
  const { datas } = useSelector((state) => state.networks)
  const [modalOpen, setModalOpen] = useState(false)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  
  React.useEffect(() => {
    if (!localStorage.getItem('auth')) {
      Navigate('/')
    }
  }, [Navigate])

  const handleDelete = (id) => {
    dispatch(networkDeleted({ id }))
  }
  const handleEdit = (id) => {
    localStorage.setItem('network.id', id)
    localStorage.setItem('currentPath', 'networksEdit')
    localStorage.setItem('button', 'edit')
    setModalOpen(true)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    localStorage.setItem('currentPath', 'networksAdd')
    localStorage.setItem('button', 'add')

    setModalOpen(true)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const filtered = datas.filter((items) => {
    return items.network.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

 



  return (
    <>
      {/* Navigation bar authentication */}

      {localStorage.getItem('auth') ? <NavBar /> : <></>}

      {/* dropdown and search bar */}
      
      <Stack>
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
          <Stack>
            <TextField
              placeholder="Search"
              value={search}
              sx={{ width: '200px', marginRight: '10px' }}
              size="small"
              onChange={(e) => handleSearch(e)}
            />
          </Stack>
        </Stack>

        {/* users table */}

        {search ? (
          <TableContainer
            component={Paper}
            sx={{
              margin: ' 2% auto',
              width: '60%',
              maxHeight: '350px',
              marginBottom: '15px',
              borderRadius: '0px',
            }}
          >
            <Table aria-label="userList" stickyHeader>
              <TableHead >
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Networks
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.length &&
                  filtered.map(({ id, network, discription }, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-chid td,&:last-child th': { border: 1 } }}
                    >
                      {/* {" "} */}

                      <TableCell align="center">{network}</TableCell>
                      <TableCell align="center">{discription}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            background: '#65c1d6',
                            textTransform: 'none',
                          }}
                          onClick={() => handleEdit(id)}
                        >
                          edit
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
              width: '60%',
              maxHeight: '350px',
              marginBottom: '15px',
              borderRadius: '0px',
            }}
          >
            <Table aria-label="userList" stickyHeader>
              <TableHead >
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Networks
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: '#e8e8e8', zIndex: '0' }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.length &&
                  datas.map(({ id, network, discription }, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-chid td,&:last-child th': { border: 1 } }}
                    >
                      {/* {" "} */}

                      <TableCell align="center">{network}</TableCell>
                      <TableCell align="center">{discription}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            background: '#65c1d6',
                            textTransform: 'none',
                          }}
                          onClick={() => handleEdit(id)}
                        >
                          edit
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
            sx={{ display: 'flex', justifyContent: 'flex-end', width:'80%' ,borderBottom:'0px'}}
            direction="row"
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: 'green',
                  textTransform: 'none',
                }}
                onClick={(e) => handleAdd(e)}
                >
                Add new network
              </Button>
            </Stack>
            {modalOpen && <NetworkForm setOpenModal={setModalOpen} />}
      </Stack>
    </>
  )
}

export default Networks
