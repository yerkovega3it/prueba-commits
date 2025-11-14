import { icons } from '@/components/icons'

export const authConfig = {
  config: {
    darkTheme: false
  },
  menu : {
    main: [
			{
				id: 110,
				name: "Home",
				icon: icons.house,
				url: "/",
				requiresPermissions: false,
				module: "Home",
				submenu: []
			},
			{
				id: 111,
				name: "Examples",
				icon: icons.star,
				url: "/examples",
				requiresPermissions: false,
				module: "Examples",
				submenu: []
			}
    ],
    admin: [
			{
				id: 210,
				name: "Usuarios",
				icon: icons.circleUser,
				url: "",
				requiresPermissions: true,
				module: "Users",
				submenu: [
					{
						id: 211,
						name: "Lista de usuarios",
						url: "/users",
						requiresPermissions: true,
						module: "Users"
					},
					{
						id: 212,
						name: "Roles de usuario",
						url: "/roles",
						requiresPermissions: true,
						module: "Roles"
					}
				]
			},
    ]
  }
}
