import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

function Login () {
  const logIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Sign in please</title>
      </Head>
      <LoginDiv>
        {/**Logo */}
        <SignalLogo
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Signal_ultramarine_icon.svg/1024px-Signal_ultramarine_icon.svg.png'
          alt=''
        />
        {/**Button */}
        <LoginBtn onClick={logIn}>Sign in with Google</LoginBtn>
      </LoginDiv>
    </Container>
  )
}

export default Login

const Container = styled.div`
  height: 100vh;
  background-color: whitesmoke;
  display: grid;
  place-items: center;
`

const LoginDiv = styled.div`
  padding: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px #2c7cf378;
`
const SignalLogo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`

const LoginBtn = styled(Button)`
  &&& {
    font-weight: 600;
    background-color: #276ace;
    color: #f1f1f1;
    text-transform: capitalize;
  }
`
