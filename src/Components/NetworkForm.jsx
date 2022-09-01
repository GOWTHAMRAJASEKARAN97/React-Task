import React, { useState } from 'react'
import {
  Button,
  TextField,
  Stack,
  TextareaAutosize,
  styled,
  DialogContentText,
  Modal,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { networkAdded, networkUpdated } from './NetworksSlice'

function NetworkForm({ setOpenModal }) {

  const Dispatch = useDispatch()
  const { datas } = useSelector((state) => state.networks)
  const id = localStorage.getItem('network.id')
  const ButtonChange = localStorage.getItem('currentPath')
  const networkss = datas.filter((network) => network.id === id)

  const [action, setAction] = useState('')
  const [title, setTitle] = useState('Add')
  const [alert, setAlert] = useState(false)

  const NetworkChanger =
    ButtonChange === 'networksEdit' ? networkss[0].network : ''
  const DiscriptionChanger =
    ButtonChange === 'networksEdit' ? networkss[0].discription : ''

  const [network, setNetwork] = useState(NetworkChanger)
  const [discription, setDiscription] = useState(DiscriptionChanger)
  
  const handleNetwork = (e) => setNetwork(e.target.value)
  const handleDiscription = (e) => setDiscription(e.target.value)

  React.useEffect(() => {
    if (localStorage.getItem('button') === 'edit') {
      setTitle('Edit')
    } else {
      setTitle('Add')
    }
  }, [title])

  React.useEffect(() => {
    if (ButtonChange === 'networksEdit') {
      setAction('edit')
    } else {
      setAction('')
    }
  }, [ButtonChange])

  const handleSubmit = () => {
    if (network && discription) {
      setAlert(true)
      if (action !== 'edit') {
        Dispatch(
          networkAdded({
            id: Math.floor(Math.random() * 1000000).toString(),
            network,
            discription,
          }),
        )
      } else if (action === 'edit') {
        Dispatch(
          networkUpdated({
            id: id,
            network,
            discription,
          }),
        )
      }
    }
    setNetwork('')
    setDiscription('')
    setOpenModal(false)
  }

  return (
    <>
      <Modal open={setOpenModal}>
        <Background className="modalBackground">
          <Container className="modalContainer">
            <ButtonContainer>
              <HeadingContainer>
                {title === 'Add' ? (
                  <h4>Create new network</h4>
                ) : (
                  <h4>Edit network</h4>
                )}
              </HeadingContainer>
              <ContainerButton>
                <Button
                  onClick={() => setOpenModal(false)}
                  sx={{ color: 'black' }}
                >
                  X
                </Button>
              </ContainerButton>
            </ButtonContainer>

            <NameContainer>
              <Name>
                <Lable>Network</Lable>
              </Name>
              <NameField>
                <TextField
                  placeholder="Name"
                  size="small"
                  value={network}
                  error={!network}
                  onChange={(e) => handleNetwork(e)}
                  helperText={!network ? 'please enter network' : ''}
                  inputProps={{ style: { fontSize: 'small' } }}
                  sx={{ width: '100%' }}
                />
              </NameField>
            </NameContainer>

            <DiscriptionContainer>
              <Discription>
                <Lable>Discription</Lable>
              </Discription>
              <DiscriptionField>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Enter discription"
                  style={{ width: '100%', height: '70px' }}
                  inputProps={{ style: { fontSize: 'small' } }}
                  sx={{ width: '100%' }}
                  value={discription}
                  error={!discription}
                  helperText={!discription ? 'please enter discription' : ''}
                  onChange={(e) => handleDiscription(e)}
                />
              </DiscriptionField>
              {!discription ? (
                <DialogContentText
                  sx={{
                    fontSize: 'smaller',
                    color: '#c53229',
                    paddingLeft: '10px',
                  }}
                >
                  enter discription
                </DialogContentText>
              ) : (
                <></>
              )}
            </DiscriptionContainer>

            <ActionContainer>
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={() => setOpenModal(false)}
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
              </Stack>
            </ActionContainer>
          </Container>
        </Background>
      </Modal>
    </>
  )
}

export default NetworkForm

const Container = styled('div')`
  width: 350px;
  height: auto;
  margin: 15% auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const Background = styled('div')`
  /* width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0px, -365px);
  z-index: 2; */
  /* backgroundColor: white; */
`
const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
`

const HeadingContainer = styled('div')`
  display: flex;
  width: 50%;
  padding-left: 15px;
  height: 55px;
  align-items: center;
`
const ContainerButton = styled('div')`
  display: flex;
  width: 50%;
  justify-content: end;
`
const Lable = styled('h5')`
  padding: 0px;
  margin: 0px;
  margin-bottom: 3%;
  margin-top: 3%;
`

const Name = styled('div')`
  width: 100%;
`

const NameContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const NameField = styled('div')`
  width: 100%;
  /* padding-top:0px */
`

const DiscriptionField = styled('div')`
  width: 100%;
  padding-bottom: 10px;
  /* padding-top:0px */
`

const DiscriptionContainer = styled('div')`
  width: 99%;
  display: flex;
  flex-direction: column;
`

const Discription = styled('div')`
  width: 100%;
`

const ActionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  border-top: 1px solid grey;
  padding-top: 20px;
  padding-bottom: 15px;
`
