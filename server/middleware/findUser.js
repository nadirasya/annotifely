import jwt from 'jsonwebtoken';

function findUser(req, res, next) {
  
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(' ')[1];
<<<<<<< HEAD
            // console.log(token);
=======
            console.log(token);
>>>>>>> Create a Task Form
            if (token == null) return res.status(401).json({errorMessage: "Unauthorized"});
                
            jwt.verify(token, 'test', (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user; 
                   
            next();     
            });
<<<<<<< HEAD
            // try {
            //     const token = req.headers.authorization.split(" ")[1];
            //     const isCustomAuth = token.length < 500;
        
            //     let decodedData; 
        
            //     if(token && isCustomAuth){
            //         decodedData = jwt.verify(token, 'test');
        
            //         req.userId = decodedData?.id; 
            //     } else {
            //         decodedData = jwt.decode(token);
        
            //         req.userId = decodedData?.sub; 
            //     }
        
            //     next();
            // } catch (error) {
            //     console.log(error);
            // }
}



=======
       
}

>>>>>>> Create a Task Form
export default findUser;