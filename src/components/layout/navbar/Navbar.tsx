import './Navbar.css'
import { Avatar, Button, Dropdown, Breadcrumbs } from 'uikit-3it-react'
import { logoutAction } from '@/actions'
import { FaIcon } from '@/components'
import { icons } from '@/components/icons'
import type { ChangeEvent } from 'react'

import type { UserAuthCore } from '@/interfaces'
export interface NavbarProps {
  user: UserAuthCore | null
  slideNotificaction?: boolean
  toggleDarkTheme?: (event: ChangeEvent<HTMLInputElement>) => void
  toggleNotificaciones?: (event: Event) => void
}

export default function Navbar({ 
  user, 
  slideNotificaction, 
  toggleDarkTheme, 
  toggleNotificaciones,
}: NavbarProps) {
  return (
	<nav 
		id="navbar" 
		className="eit-navbar"
		data-eit-display="none"
		data-eit-justify="between"
		data-eit-align="center"
		data-eit-display-md="flex"
	>
  <div className="eit-navbar-left">
			<Breadcrumbs colorClass="text-soft" />
	</div>
		<div
			className="eit-navbar-right"
			data-eit-display="flex"
		>
		<Button
			data-eit-display="flex"
			data-eit-justify="center"
			data-eit-align="center"
			data-eit-variant='gray'
			data-eit-outline
			data-eit-shape='square'
			data-eit-font-size="x5"
			data-eit-border="clean"
      onClick={toggleNotificaciones}
      className={slideNotificaction ? 'active' : ''}
			icon={icons.bell}
		/>
			<Dropdown 
				position="right"
				width="large"
				btnClass="eit-flex eit-ms-3"
        button={
          <Avatar
            width="48"
            data-eit-object-fit='contain'
            data-eit-shape='circle'
          />
        }>
					<div 
						data-eit-display="flex"
						data-eit-p="3"
					>
						<div data-eit-flex-shrink='0'>
							<Avatar
								width="60"
								data-eit-object-fit='contain'
								data-eit-border-radius='x3'
							/>
						</div>
						<div 
							data-eit-flex-grow='1'
							data-eit-ms="3"
						>
							<h6 
								data-eit-font-size="x3"
								data-eit-font-weight="500"
								data-eit-color="text"
								data-eit-my="0"
							> 
							{ user?.firstName } { user?.lastName } 
							</h6>
							<p 
								data-eit-font-size="x2"
								data-eit-color="text-soft"
								data-eit-my="0"
							>
								{ user?.email }<br/>
								<small 
									data-eit-border="all"
									data-eit-border-color="default"
									data-eit-border-radius="x3"
									data-eit-px="1"
								> 
									{ user?.role.name } 
								</small>
							</p>
						</div>
					</div>
					<div data-eit-px="3">
						<label 
							className="eit-dropdown__item-text eit-cursor--pointer"
							data-eit-display="flex"
							data-eit-justify="between"
							data-eit-align="center"
						>
							<span>
								<FaIcon name="circleHalfStroke" data-eit-me="1"/>
								Tema oscuro
							</span>
							<span className="eit-switch">
								<input
									type="checkbox"
                  onChange={toggleDarkTheme}
									className="eit-switch__input"
								/>
								<span className="eit-switch__slider"></span>
							</span>
						</label> 
					</div>
					<div className="eit-dropdown-divider"></div>
					<div data-eit-mx="3">
						<a 
							className="eit-dropdown__item" 
							href="/settings"
						>
							<FaIcon name="gear" data-eit-me="1"/>
							Administrar tu cuenta
						</a>
					</div>
					<div className="eit-dropdown-divider"></div>
					<div data-eit-mx="3">
						<button
              type="button"
              onClick={logoutAction}
							className="eit-dropdown__item" 
						>
							<FaIcon name="rightFromBracket" data-eit-me="1"/>
							Cerrar sesión
						</button>
					</div>
      </Dropdown>
    </div>
  </nav>
)} 