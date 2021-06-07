import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import getReceiver from '../../utils/getReceiver'
import { auth, db } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import TimeAgo from 'timeago-react'

function UserChat ({ id, users }) {
  const [user] = useAuthState(auth)
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(users, user))
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const receiver = getReceiver(users, user)
  const receiverPhoto = receiverSnapshot?.docs?.[0]?.data()
  const router = useRouter()

  return (
    <Container onClick={enterChat}>
      <ChatLeft>
        {receiver ? (
          <UserPic src={receiverPhoto?.photoUrl} />
        ) : (
          <UserPic>{receiver[0]}</UserPic>
        )}
        <UserDetails>
          <Name>{receiver}</Name>
        </UserDetails>
      </ChatLeft>
      <ChatRight>
        {receiverSnapshot ? (
          <Timestamp>
            {receiverPhoto?.lastSeen?.toDate() ? (
              <TimeAgo datetime={receiverPhoto?.lastSeen?.toDate()} />
            ) : (
              'N/A'
            )}
          </Timestamp>
        ) : (
          <Timestamp>'loading...'</Timestamp>
        )}
      </ChatRight>
    </Container>
  )
}

export default UserChat

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  :hover {
    background-color: #e9e9e9;
    border-radius: 10px;
    cursor: pointer;
  }
`

const ChatLeft = styled.div`
  display: flex;
  align-items: center;
`

const UserPic = styled(Avatar)``

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

const Name = styled.h4`
  color: #313131;
  font-weight: 500;
`

const ChatRight = styled.div`
  margin-right: 10px;
`

const Timestamp = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: darkgray;
`
