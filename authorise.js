function authorise (req,res,next){
    const user = req.query.user
    if(user === 'john'){
        console.log({user:'john', id:3});
        next()
    } else{
        res.status(401).send('unauthorised access');
    }
 next();
}

module.exports = authorise