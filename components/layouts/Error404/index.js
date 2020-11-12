const H2 = { 
  textAlign: 'center',
  margin: '3rem auto 0',
  maxWidth: '600px'
}

const Error404 = ({ message }) => {
  return (<h2 style={H2}> Error 404: {message}</h2> );
}
 
export default Error404;