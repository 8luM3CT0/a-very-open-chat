import styled from 'styled-components'

function Welcome () {
  return (
    <Container>
      <WelcomeDiv>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/6/6a/Signal-logo.png'
          alt=''
        />
        <h2>Welcome !</h2>
        <h3>
          To start chatting, add a user by clicking on the pencil icon and
          entering an email
        </h3>
      </WelcomeDiv>
    </Container>
  )
}

export default Welcome

const Container = styled.div`
  height: 100vh;
  flex: 1;
  display: grid;
  place-items: center;
`

const WelcomeDiv = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    height: 200px;
    width: 600px;
    margin-bottom: 20px;
  }
  > h2 {
    color: #267ace;
    font-weight: 500;
  }
  > h3 {
    color: #7ba5cfdc;
    font-weight: 400;
    :hover {
      opacity: 0.8;
    }
  }
`
