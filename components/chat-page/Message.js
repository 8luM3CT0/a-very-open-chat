import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import moment from 'moment'

function Message ({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const Type = user === userLoggedIn.email ? Sender : Receiver

  return (
    <Container>
      <Type>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </Type>
    </Container>
  )
}

export default Message

const Container = styled.div``

const MessageDiv = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageDiv)`
  margin-left: auto;
  background-color: #267ace;
  color: white;
`

const Receiver = styled(MessageDiv)`
  background-color: whitesmoke;
  color: #313131;
  text-align: left;
`

const Timestamp = styled.span`
  color: lightgray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
