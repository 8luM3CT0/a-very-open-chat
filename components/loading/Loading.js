import { Circle } from 'better-react-spinkit'

function Loading () {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
      }}
    >
      <div>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Signal_ultramarine_icon.svg/1024px-Signal_ultramarine_icon.svg.png'
          alt=''
          style={{ marginBottom: 10 }}
          height={200}
        />
      </div>
      <Circle color='#2c7cf3' size={60} />
    </center>
  )
}

export default Loading
