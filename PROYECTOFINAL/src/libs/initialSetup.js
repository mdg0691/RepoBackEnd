import Role from "../DAL/mongoDB/models/role.model.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount(); // busco en el modelo rol para contar si existe ya documentos
    if (count > 0) return;

    // creo nuevos roles y los guardo en la DB 
    const values = await Promise.all([// las englobo a las tres funciones para ejecutar las tres al mismo tiempo
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values)// imprimo los valores de values
  } catch (error) {}
};
