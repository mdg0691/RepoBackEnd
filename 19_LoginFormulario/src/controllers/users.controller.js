export const registerUser = () =>{
    async (req,res) => {
    
        const { email, password } = req.body;
        const user = await userModel.findOne({email,password})
    
        if(user){
            return res.redirect('/api/session/errorRegister')
        }
    
        const userNew = new userModel(req.body)
        console.log(userNew)
        await userNew.save()
        res.redirect("/api/session");
    }
}

export const loginUsers = () => {
    async (req,res) => {
    
        const { email, password } = req.body;
        const user = await userModel.findOne({email,password}).lean()
    
        if(!user){
            return res.redirect('/api/session/errorLogin')
        }
        // res.send(`usuario: ${user.email} Logueado`)
        res.redirect(`/products/${user._id}`)
        // res.redirect("/api/");
    }
}