import { Avatar, IconButton } from '@material-ui/core'
import { CreateOutlined, Search } from '@material-ui/icons'
import styled from 'styled-components'
import UserChat from './UserChat'
//db functions
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
//for email validtion
import * as EmailChecker from 'email-validator'

function Sidebar () {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)

  const userExists = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const addUser = () => {
    const input = prompt(
      'Please enter an email address for the user you want to chat with : '
    )

    if (!input) return null

    if (
      EmailChecker.validate(input) &&
      !userExists(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  return (
    <Container>
      {/**SidebarHeader */}
      <SidebarHeader>
        {/**UserAvatar */}
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        {/**HeaderSearch */}
        <HeaderSearch>
          <SearchIcon />
          <input placeholder='Search' type='text' />
        </HeaderSearch>
        <IconBtn>
          <CreateOutlined onClick={addUser} />
        </IconBtn>
      </SidebarHeader>
      {/**Sidebar stuff */}
      {chatSnapshot?.docs.map(chat => (
        <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  min-width: 380px;
  max-width: 420px;
  background-color: whitesmoke;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left: 10px;
  margin-bottom: 20px;
`

const UserAvatar = styled(Avatar)`
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
`

const SearchIcon = styled(Search)`
  &&& {
    color: darkgray;
    margin-right: 10px;
  }
`

const HeaderSearch = styled.div`
  display: flex;
  padding: 7px;
  flex: 1;
  border-radius: 30px;
  background-color: #e2e2e2;
  > input {
    outline: 0;
    border: 0;
    background-color: transparent;
  }
`
const IconBtn = styled(IconButton)`
  &&& {
    margin: 0 2px 0 2px;
  }
`
