import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import {
  Videocam,
  Phone,
  Add,
  InsertDriveFileOutlined,
  CameraAltOutlined,
  MicNoneOutlined,
  SendOutlined,
  ArrowBack
} from '@material-ui/icons'
//for chat sending functions
import { useRef, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import getReceiver from '../../utils/getReceiver'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase'
//component/s
import Message from '../chat-page/Message'

function Feed ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [messageInput, setMessageInput] = useState('')
  const endOfMessageRef = useRef(null)
  const router = useRouter()
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(chat.users, user))
  )
  const [messageSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  //push back to home
  const BackToHome = () => {
    router.push('/')
  }

  //allows to send a message
  const sendMessage = e => {
    e.preventDefault()

    db.collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )

    db.collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: messageInput,
        user: user.email,
        photoURL: user.photoURL
      })
    setMessageInput('')
    scrollDown()
  }

  //shows all messages
  const showChat = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message
              .data()
              .timestamp?.toDate()
              .getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollDown = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const userEmail = getReceiver(chat.users, user)
  return (
    <FeedContainer>
      {/**FeedHeader */}
      <FeedHeader>
        {/**HeaderUser */}
        <HeaderUser>
          <InputBtn>
            <Back onClick={BackToHome} />
          </InputBtn>
          {receiver ? (
            <UserPic src={receiver?.photoUrl} />
          ) : (
            <UserPic src={userEmail[0]} />
          )}
          <Username>{userEmail}</Username>
        </HeaderUser>
        {/**HeaderIcons */}
        <HeaderIcons>
          <IconBtn>
            <Videocam />
          </IconBtn>
          <IconBtn>
            <Phone />
          </IconBtn>
        </HeaderIcons>
      </FeedHeader>
      {/**FeedMessages */}
      <FeedMessage>
        {/**ref */}
        {showChat()}
        <EndofFeed ref={endOfMessageRef} />
      </FeedMessage>
      {/**FeedInput */}
      <FeedInput>
        <InputBtn>
          <Add />
        </InputBtn>
        <InputField>
          <Input
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder='New Message'
          />
          <button
            type='submit'
            hidden
            disabled={!messageInput}
            onClick={sendMessage}
          >
            Send message
          </button>
          <FileCopy />
        </InputField>
        <InputIcons>
          <InputBtn>
            <SendOutlined onClick={sendMessage} />
          </InputBtn>
          <InputBtn>
            <CameraAltOutlined />
          </InputBtn>
          <InputBtn>
            <MicNoneOutlined />
          </InputBtn>
        </InputIcons>
      </FeedInput>
    </FeedContainer>
  )
}

export default Feed

const FeedContainer = styled.div`
  flex: 1;
`

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #276ace;
  top: 0;
  z-index: 999;
  position: sticky;
`

const HeaderUser = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 10px;
  align-items: center;
`
const Back = styled(ArrowBack)`
  &&& {
    color: white;
  }
`

const UserPic = styled(Avatar)`
  margin-right: 20px;
  margin-left: 12px;
  :hover {
    opacity: 0.8;
  }
`

const Username = styled.h4`
  font-weight: 500;
  color: white;
`

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`

const FeedMessage = styled.div`
  min-height: 90vh;
  background-color: white;
  padding: 30px;
`
const EndofFeed = styled.div`
  margin-bottom: 40px;
`

const IconBtn = styled(IconButton)`
  &&& {
    margin: 12px;
    background-color: transparent;
    color: white;
  }
`

const FeedInput = styled.form`
  display: flex;
  align-items: center;
  bottom: 0;
  position: sticky;
  padding: 10px;
  z-index: 100;
  background-color: white;
`
const InputBtn = styled(IconButton)`
  &&& {
    background-color: transparent;
    color: gray;
  }
`
const InputField = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  padding: 10px;
  background-color: whitesmoke;
  z-index: 100;
  border-radius: 20px;
  margin-left: 15px;
  margin-right: 15px;
`

const Input = styled.input`
  outline-width: 0;
  flex: 1;
  padding: 5px;
  font-size: 14px;
  color: #2e2e2e;
  font-weight: 500;
  border: 0;
  background-color: transparent;
  ::placeholder {
    color: gray;
  }
`

const FileCopy = styled(InsertDriveFileOutlined)`
  &&& {
    color: #267ace;
  }
`

const InputIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
