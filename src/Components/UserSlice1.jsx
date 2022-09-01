import { createSlice } from '@reduxjs/toolkit'
const entities = [
  {
    id: '1234',
    name: 'gowtham',
    password: '123',
    role: 'Super Admin',
    image:
      'https://i.natgeofe.com/n/6490d605-b11a-4919-963e-f1e6f3c0d4b6/sumatran-tiger-thumbnail-nationalgeographic_1456276_3x2.jpg',
    data: '',
    status: 'Active',
    confirmPassword: '123',
  },
]

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities,
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload)
    },
    userUpdated(state, action) {
      const {
        id,
        name,
        status,
        password,
        image,
        data,
        role,
        confirmPassword,
      } = action.payload
      const existingUser = state.entities.find((user) => user.id === id)
      if (existingUser) {
        existingUser.name = name
        existingUser.status = status
        existingUser.id = id
        existingUser.password = password
        existingUser.image = image
        existingUser.data = data
        existingUser.role = role
        existingUser.confirmPassword = confirmPassword
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload
      const existingUser = state.entities.find((user) => user.id === id)
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id)
      }
    },
    userDetails(state, action) {
      const { id } = action.payload
      const existingUser = state.entities.find((user) => user.id === id)
      const DetailsOfUser = existingUser
      return DetailsOfUser
    },
  },
})

export const {
  userAdded,
  userUpdated,
  userDeleted,
  userDetails,
  DetailsOfUser,
} = usersSlice.actions

export default usersSlice.reducer
