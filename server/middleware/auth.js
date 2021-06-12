import jwt from 'jsonwebtoken';

function findUser(req, res, next) {
  
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(' ')[1];
            // console.log(token);
            if (token == null) return res.status(401).json({errorMessage: "Unauthorized"});
                
            jwt.verify(token, 'test', (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user; 
                   
            next();     
            });
       
}

export default findUser;