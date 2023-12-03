let recolecciones = {
    id: 1,
    name: "Recoleccion 1",
    date: "2021-10-01",
    status: "Pendiente",
    chain: {
        id: 1,
        name: "Cadena 1",
        address: "Calle 1",
        nameLinkPerson: "Persona 1",
        phones: "123456789",
        status: true
    },
    products: [
        {
            id: 1,
            name: "Producto 1",
            quantity: 3,
            annexes: {
                commentary: "De 3 cajas solo me dieron 2",
                photos: ["/images/idRecolección_idProducto.jpg"]
            },
        }
    ],
    user: {
        id: 1,
        name: "Roy",
        lastName: "Rasmussen",
        secondSurname: "Gonzalez",
        email: "roy21rasm@gmail.com",
        role: {
            id: 1,
            name: "Administrador"
        },
        phone: "123456789",
    }

}