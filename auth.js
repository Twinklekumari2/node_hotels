const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //username pswd strategy
const Person = require('./models/Person')

passport.use(new LocalStrategy(async function(username,password,done) {
    //authentication logic here
    try{
        // console.log('Received credentials:', username, password);
        const user = await Person.findOne({username:username}); 
        if(!user){
            return done(null,false,{ message:'incorrext username'});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'incorrect pswd'});
        }
    }catch(error){
        return done(error);
    }
}))

module.exports = passport;