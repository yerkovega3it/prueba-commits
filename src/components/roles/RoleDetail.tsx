import { FaIcon } from '@/components'

import type { Role } from '@/interfaces'

interface RoleDetailProps {
  record: Role | undefined
}

export default function RoleDetail ({ 
  record 
}: RoleDetailProps) {
  return (
  <>
    <h3 
      data-eit-font-size="x5"
      data-eit-color="secondary"
      data-eit-font-weight="900"
      data-eit-mt="4"
      data-eit-mb="0"
    >
      Información rol
    </h3>

    <ul 
      data-eit-list="unstyled"
      data-eit-mb="3"
      data-eit-font-size="x2"
    >
        <li 
          data-eit-display="flex"
          data-eit-justify="between"
          data-eit-color="text-soft"
          data-eit-border="bottom"
          data-eit-border-color="default"
          data-eit-pb="1"
          data-eit-mb="2"
        >
          Nombre
          <span 
            data-eit-color="text"
            data-eit-ms="3"
          >
            { record?.name }
          </span>
        </li>
            <li 
          data-eit-display="flex"
          data-eit-justify="between"
          data-eit-color="text-soft"
          data-eit-border="bottom"
          data-eit-border-color="default"
          data-eit-pb="1"
          data-eit-mb="2"
        >
          Usuarios totales
          <span 
            data-eit-color="text"
            data-eit-ms="3"
          >
            { record?.totalUsers }
          </span>
        </li>
            <li 
          data-eit-display="flex"
          data-eit-justify="between"
          data-eit-color="text-soft"
          data-eit-border="bottom"
          data-eit-border-color="default"
          data-eit-pb="1"
          data-eit-mb="2"
        >
          Módulos totales
          <span 
            data-eit-color="text"
            data-eit-ms="3"
          >
            { record?.totalModules }
          </span>
        </li>
    </ul>

    <h4
      data-eit-font-size="x3"
      data-eit-color="text"
      data-eit-font-weight="900"
      data-eit-mt="3"
      data-eit-mb="0"
    >
      Descripción
    </h4>
    <p 
      data-eit-font-size="x2"
      data-eit-color="text-soft"
      data-eit-mt="1"
    >
      { record?.description }
    </p>

    <h4
      data-eit-font-size="x3"
      data-eit-color="text"
      data-eit-font-weight="900"
      data-eit-mt="0"
      data-eit-mb="2"
    >
      <FaIcon name="borderAll" 
        data-eit-color="text"
      />
      Módulos
    </h4>

    {record?.subModules?.map((module) => (
      <div 
        key={module.id}
        data-eit-mb="3"
        data-eit-border="all"
        data-eit-border-color="default"
        data-eit-p="3"
        data-eit-mx="1"
      >
        <h5 
          data-eit-color="text"
          data-eit-font-size="x3"
          data-eit-font-weight="500"
          data-eit-mt="0"
          data-eit-mb="1"
        >
          { module.name }
        </h5>
      <div
        data-eit-display="flex"
        data-eit-flex-wrap='wrap'
        data-eit-gap="2"
        data-eit-font-size="x2"
      >
        <div 
          data-eit-flex="col"
          data-eit-display='flex'
          data-eit-justify='between'
          data-eit-align='center'
          data-eit-p="2"
          data-eit-border="all"
          data-eit-border-color="default"
          data-eit-border-radius="x3"
        >
          Ver
          {module.canRead ? (
            <FaIcon name="circleCheck" 
              data-eit-color="green"
              data-eit-font-size="x4"
            />
          ) : (
            <FaIcon name="circleXmark" 
              data-eit-color="text-soft"
              data-eit-font-size="x4"
            />
          )}
        </div>
        <div 
          data-eit-flex="col"
          data-eit-display='flex'
          data-eit-justify='between'
          data-eit-align='center'
          data-eit-p="2"
          data-eit-border="all"
          data-eit-border-color="default"
          data-eit-border-radius="x3"
        >
          Crear
          {module.canCreate ? (
            <FaIcon name="circleCheck" 
              data-eit-color="green"
              data-eit-font-size="x4"
            />
          ) : (
            <FaIcon name="circleXmark" 
              data-eit-color="text-soft"
              data-eit-font-size="x4"
            />
          )}
        </div>
        <div 
          data-eit-flex="col"
          data-eit-display='flex'
          data-eit-justify='between'
          data-eit-align='center'
          data-eit-p="2"
          data-eit-border="all"
          data-eit-border-color="default"
          data-eit-border-radius="x3"
        >
          Editar
          {module.canUpdate ? (
            <FaIcon name="circleCheck" 
              data-eit-color="green"
              data-eit-font-size="x4"
            />
          ) : (
            <FaIcon name="circleXmark" 
              data-eit-color="text-soft"
              data-eit-font-size="x4"
            />
          )}
        </div>
        <div 
          data-eit-flex="col"
          data-eit-display='flex'
          data-eit-justify='between'
          data-eit-align='center'
          data-eit-p="2"
          data-eit-border="all"
          data-eit-border-color="default"
          data-eit-border-radius="x3"
        >
          Eliminar
          {module.canDelete ? (
            <FaIcon name="circleCheck" 
              data-eit-color="green"
              data-eit-font-size="x4"
            />
          ) : (
            <FaIcon name="circleXmark" 
              data-eit-color="text-soft"
              data-eit-font-size="x4"
            />
          )}
        </div>
      </div>
    </div>
    ))}
  </>
)
}