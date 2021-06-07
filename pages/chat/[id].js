import Head from 'next/head'
import styled from 'styled-components'
import firebase from 'firebase'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getReceiver from '../../utils/getReceiver'
//components
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/chat-page/Feed'

function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <Head>Chat with {getReceiver(chat.users, user)}</Head>
      <Sidebar />
      <ChatPage>
        {/**Feed.js */}
        <Feed chat={chat} messages={messages} />
      </ChatPage>
    </Container>
  )
}

export default Chat

export async function getServerSideProps (context) {
  const ref = db.collection('chats').doc(context.query.id)

  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messageRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  const chatResult = await ref.get()
  const chat = {
    id: chatResult.id,
    ...chatResult.data()
  }
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

const Container = styled.div`
  display: flex;
`

const ChatPage = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`
