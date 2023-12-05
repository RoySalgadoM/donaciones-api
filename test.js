//--------------Recolecciones-----------------

//El admin puede cancelar una recolección pero el recolector no
//El admin solo puede cancelar la recolección si está en estado pendiente

//Pendiente --- > En proceso
//En proceso ---> Finalizado
//En proceso ---> Cancelado (El recolector tiene que agregar comentarios generales y fotos generales)

let recolecciones = {
    id: 1,
    name: "Recoleccion 1",
    date: "2021-10-01",
    status: "Pendiente", //En proceso, Finalizado, Cancelado
    chain: {
        id: 1,
        name: "Cadena 1",
        address: "Calle 1",
        nameLinkPerson: "Persona 1",
        phones: ["123456789", "123456789"],
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
    generalAnnexes: {
        commentary: "Comentario general",
        photos: ["/images/idRecolección.jpg"]
    },
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