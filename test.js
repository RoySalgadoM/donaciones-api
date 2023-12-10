//--------------Recolecciones-----------------

//El admin puede cancelar una recolección pero el recolector no
//El admin solo puede cancelar la recolección si está en estado pendiente

//Pendiente --- > En proceso
//En proceso ---> Finalizado
//En proceso ---> Cancelado (El recolector tiene que agregar comentarios generales y fotos generales)

let recolecciones = {
    "id": "6576202846fd129f5f7c1e6b",
    "name": "Recoleccion Chedraui #1",
    "date": "2023-12-10T00:00:00.000Z",
    "status": "Pendiente",
    "chain": {
        "_id": "65760ffcace42244ec1e94f2",
        "name": "Chedraui",
        "address": "Carretera Zapata, A Tezoyuca 38 Col, Campo Nuevo, 62766 Emiliano Zapata, Mor.",
        "nameLinkPerson": "Zulma Martinez",
        "phones": [
            "7776543456",
            "7778909876"
        ],
        "status": true
    },
    "products": [
        {
            "id": "65761050ace42244ec1e94f6",
            "name": "Comida para gato",
            "status": true,
            "quantity": 4
        },
        {
            "id": "65761048ace42244ec1e94f5",
            "name": "Lata de atún",
            "quantity": 10,
            "status": false
        },
        {
            "id": "65761057ace42244ec1e94f7",
            "name": "Telera",
            "quantity": 2,
            "status": true
        }
    ],
    "generalAnnexes": {},
    "user": {
        "id": "65761025ace42244ec1e94f3",
        "name": "Alex",
        "lastname": "Salgado",
        "email": "alex@gmail.com",
        "role": "Empleado",
        "phone": "7771144520",
        "status": true
    }
}