import {fakerES} from '@faker-js/faker'

export const generateProducts = () =>{
      return{
        name: fakerES.commerce.productName(),
        price: fakerES.commerce.price(),
        description: fakerES.commerce.productDescription(),
        imagen: fakerES.image.urlPicsumPhotos()
    }
}
