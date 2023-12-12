//--------------Recolecciones-----------------


//Admin
//Puede crear las recolecciones y asignarlas a los recolectores
//Puede cancelar la recolección si está en estado pendiente

//Recolector
//Puede iniciar la recolección si está en estado pendiente
//Puede finalizar la recolección si está en estado en proceso
//Puede cancelar la recolección en cualquier estado excepto en finalizado

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



//Admin
//Puede crear las entregas y asignarlas a los repartidores
//Puede cancelar la entrega si está en estado pendiente

//Repartidor
//Puede iniciar la entrega si está en estado pendiente
//Puede finalizar la entrega si está en estado en proceso
//Puede cancelar la entrega en cualquier estado excepto en finalizado

let entregas = {
    "_id": "6576202846fd129f5f7c1e6b",
    "name": "Entrega #1",
    "routes": [
        {
            "_id": {
                "$oid": "65760fecace42244ec1e94f1"
            },
            "name": "San José de las cumbres",
            "reference": "Al sur del estado",
            "nameLinkPerson": "Maura Bustamante",
            "phones": [
                "7771127654",
                "7771167854"
            ],
            "status": "Finalizada",
            "annexes":{
                "commentary": "Se entregó todo correctamente",
                "photos": ["", ""]
            }
        },
        {
            "id": {
                "$oid": "6577900726a2987420a6782c",
            },
            "name": "Avenida Universidad",
            "reference": "Cerca de la UTEZ",
            "nameLinkPerson": "Ignacio Salgado",
            "phones": [
                "7771127984",
                "7771167234"
            ],
            "status": "Cancelada",
            "annexes":{
                "commentary": "No se encontró a la persona del ayuntamiento",
                "photos": ["", ""]
            }
        },
        {
            "id": {
                "$oid": "6577903e26a2987420a6782d",
            },
            "name": "Capiri",
            "reference": "Cerca de la ayudantía",
            "nameLinkPerson": "Kemish Jimenez",
            "phones": [
                "7771127984",
                "7771167234"
            ],
            
            "status": "Cancelada",
        },
        {
            "id": {
                "$oid": "6577917426a2987420a6782e",
            },
            "name": "Base de la ruta inter",
            "reference": "Cerca el centro del municipio",
            "nameLinkPerson": "Nahum Torres",
            "phones": [
                "7771127984",
                "7771167234"
            ],
            "status": "Cancelada",
        }
    ],
    "user": {
        "id": {
            "$oid": "65761025ace42244ec1e94f3",
        },
        "name": "Alex",
        "lastname": "Salgado",
        "email": "alex@gmail.com",
        "role": "Empleado",
        "phone": "7771144520",
        "status": true
    },
    "date": "2023-12-10",
    "generalAnnexes":{
        "commentary": "Se canceló la entrega por falta de tiempo",
        "photos": ["", ""]
    },
    "status": "Pendiente"
}
