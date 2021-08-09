import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    public async index() {
        return [
            {
                "id":1,
                "name":"Shonkonil Karagar",
                "writter":"Humayun Ahmed"
            },
            {
                "id":2,
                "name":"Ma",
                "writter":"Anisul Hoque"
            }
        ]
    }
    public async store({request,response}:HttpContextContract) {
        const newUserSchema = schema.create({
            name:schema.string({trim:true,escape:true},[
                rules.alpha({
                    allow:['space','dash','underscore']
                })
            ]),
            email:schema.string({},[
                rules.email()
            ]),
            phone:schema.string({},[
                rules.mobile({strict:true})
            ])
        })

        try {
            const payload = await request.validate({schema:newUserSchema})
            response.status(201)
            return {
                "Successfully Created":
                payload
            }
            
        } catch (error) {
            response.status(400)
            return error.messages.errors
        }

    }
    public async update({params, request,response}:HttpContextContract) {
        const newUserSchema = schema.create({
            name:schema.string({trim:true,escape:true},[
                rules.alpha({
                    allow:['space','dash','underscore']
                })
            ]),
            email:schema.string({},[
                rules.email()
            ]),
            phone:schema.string({},[
                rules.mobile({strict:true})
            ])
        })

        try {
            const payload = await request.validate({schema:newUserSchema})
            response.status(202)
            return {
                "Updated user id :" :params.id ,
                payload
            }
            
        } catch (error) {
            response.status(400)
            return error.messages.errors
        }
    }
}
