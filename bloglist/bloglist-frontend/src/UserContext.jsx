import { createContext, useState } from 'react'
import { getUser } from './services/persistentUser'

const UserContext = createContext()
export default UserContext

export const UserContextProvider = (props) => {
  const [user,setUser]=useState(() => getUser())

  return(
    <UserContext.Provider value={{ user,setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}