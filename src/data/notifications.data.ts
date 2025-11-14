export const notificationsData = {
	counter: {
		inbox: 123,
		noread: 21
	},
	notifications: [
     {
       id: 1,
       date: "2024-10-06 11:05:20.242464+00",
       url: "/",
       read: false,
       inbox: true,
       notification: {
         type: "record",
         name: "Creación",
         icon: "circleCheck",
         color: "eit-color--green"
       },
       module: {
         name: "Módulo 01",
         record_name: "Lorem ipsum dolor"
       },
       maker: {
         first_name: "John",
         last_name: "Doe",
         profile_name: "Administrador"
       }
     },
     {
       id: 2,
       date: "2024-10-06 22:12:13.597494+00",
       url: "/",
       read: false,
       inbox: true,
       notification: {
         type: "platform",
         name: "Pendiente",
         icon: "clock",
         color: "eit-color--red"
       },
       module: {
         name: "Módulo 02",
         record_name: "Lorem ipsum dolor"
       },
       maker: {
         first_name: "",
         last_name: "",
         profile_name: ""
       }
     },
     {
       id: 3,
       date: "2024-10-06 23:27:52.471021+00",
       url: "/",
       read: true,
       inbox: true,
       notification: {
         type: "record",
         name: "Edición",
         icon: "squarePen",
         color: "eit-color--brown"
       },
       module: {
         name: "Módulo 03",
         record_name: "Lorem ipsum dolor"
       },
       maker: {
         first_name: "John",
         last_name: "Doe",
         profile_name: "Miembro"
       }
     },
     {
       id: 4,
       date: "2024-10-06 23:27:52.471021+00",
       url: "/",
       read: true,
       inbox: true,
       notification: {
         type: "platform",
         name: "Por vencer",
         icon: "calendar",
         color: "eit-color--orange"
       },
       module: {
         name: "Módulo 04",
         record_name: "Lorem ipsum dolor"
       },
       maker: {
         first_name: "",
         last_name: "",
         profile_name: ""
       }
     },
     {
       id: 5,
       date: "2024-10-06 23:27:52.471021+00",
       url: "/",
       read: true,
       inbox: false,
       notification: {
         type: "platform",
         name: "Vencido",
         icon: "calendarXmark",
         color: "eit-color--red"
       },
       module: {
         name: "Módulo 05",
         record_name: "Lorem ipsum dolor"
       },
       maker: {
         first_name: "",
         last_name: "",
         profile_name: ""
       }
     }
  ],
  meta: {
    pagination: {
    pageCount: 13,
    total: 101,
    size: 8,
    page: 0
    }
  }
}