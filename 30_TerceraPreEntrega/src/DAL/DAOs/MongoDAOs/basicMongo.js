export default class BasisMongo{
    constructor(model){
        this.model = model
    }
    async findAll(){
        try{
            const response = await this.model.find()
            return response
        }catch(error){
            return error
        }
    }
    async findOne(arg1){
        try{
            const response = await this.model.findOne({email:arg1})
            return response
        }catch(error){
            return error
        }
    }
    async findOneById(id){
        try{
            const response = await this.model.findById(id)
            return response
        }catch(error){
            return error
        }
    }
    async createOne(obj){
        try{
            const response = await this.model.create(obj)
            return response
        }catch(error){
            return error
        }
    }
    async deleteOne(id){
        try{
            const response = await this.model.deleteOne({_id:id})
            return response

        }catch(error){
            return error
        }
    }  
}
