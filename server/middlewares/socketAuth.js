import jwt from 'jsonwebtoken'

export const verifySocket = (socket, next) => {
  try {

    let token = socket.handshake.auth.token;
    
    if (!token) { 
      next(new Error('Token not found'))
    }

    if (token.startsWith('Bearer ')) token = token.slice(7,token.length).trimStart()

    const userId = jwt.verify(token,process.env.JWT_SECRET).id

    if (!userId) {
      next(new Error('User is not authorized'))
      console.log('user not authenticated');
    }

    socket.userName = userId
    next()


} catch (error) {
    console.log(error);
  }
};
