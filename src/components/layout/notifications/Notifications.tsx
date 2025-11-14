import './Notifications.css'
import { useRef, useState } from 'react'
import { utils, Dropdown } from 'uikit-3it-react'
import { FaIcon } from '@/components'
import { icons } from '@/components/icons'
import type { NotificationsProps } from '@/interfaces'
import { useOutsideClick } from '@/hooks'
 
// Utils
const { formatDateAgo } = utils.createFormat()

export default function Notifications({
  slide,
  counter,
  notifications,
  tabChanged,
  markAllAsRead,
  archiveAll,
  archiveNotification,
  markAsRead,
  markAsNotRead,
  closeNotificaciones
}: NotificationsProps) {

  const notification = useRef<HTMLElement>(null!)
  const [tab, setTab] = useState<string>('inbox')

  useOutsideClick(notification, closeNotificaciones)

  const handleTabChange = (newTab: string) => {
    setTab(newTab)
    tabChanged(newTab)
  }

  return (
    <section 
      ref={notification}
      className={`notification notification-float eit-box-shadow--bottom ${slide ? 'notification-float-show' : ''}`}
    >
		<div className="notification-head">
			<h4 
				data-eit-font-size="x5"
				data-eit-color="text"
				data-eit-my="0"
			>
				Notificaciones
			</h4>
			<Dropdown
				position="right"
				btnClass="eit-btn-action"
				data-eit-display='none'
				data-eit-display-lg='inline'
        button={
          <FaIcon name="ellipsis"/>
        }
			>
        <div data-eit-mx='2'>
          <a 
            onClick={markAllAsRead}
            className="eit-dropdown__item" 
            href="javascript:"
          >
            <FaIcon 
              name="circleCheck"
              data-eit-me="1"
            />
            Marcar todo como leído
          </a>
          <a 
            onClick={archiveAll}
            className="eit-dropdown__item" 
            href="javascript:"
          >
            <FaIcon 
              name="boxArchive"
              data-eit-me="1"
            />
            Archivar todo
          </a>
          <a 
            className="eit-dropdown__item" 
            href="javascript:"
          >
            <FaIcon 
              name="gear"
              data-eit-me="1"
            />
            Ajustes
          </a>
        </div>   
      </Dropdown>
		</div>
		<div className="notification-filter">
			<ul className="notification-tab">
				<li 
					className="notification-tab-item"
					data-eit-me="4"
				>
					<a 
						onClick={() => handleTabChange('inbox')}
						href="javascript:"
						className={`notification-tab-item-link ${tab === 'inbox' ? 'active' : ''}`}
					>
						Inbox
						{counter.inbox > 99 ? (
							<span className="notification-tab-item-link-pill">+99</span>
						) : (
							<span className="notification-tab-item-link-pill">{counter.inbox}</span>
						)}
					</a>
				</li>
				<li
					className="notification-tab-item"
					data-eit-me="4"
				>
					<a
						onClick={() => handleTabChange('unread')}
						href="javascript:"
						className={`notification-tab-item-link ${tab === 'unread' ? 'active' : ''}`}
					>
						No leído
						{counter.noread > 99 ? (
							<span className="notification-tab-item-link-pill">+99</span>
						) : (
							<span className="notification-tab-item-link-pill">{counter.noread}</span>
						)}
					</a>
				</li>
				<li className="notification-tab-item">
					<a 
						onClick={() => handleTabChange('archived')}
						href="javascript:"
						className={`notification-tab-item-link ${tab === 'archived' ? 'active' : ''}`}
					>
						Archivado
					</a>
				</li>
			</ul>
		</div>
		<div className="notification-body">
			<ul 
				className="notification-list"
				data-eit-my="3"
			>
        {notifications.map(item => (
          <li
            key={item.id}
            className="notification-list-item"
            data-eit-display="flex"
            data-eit-align="center"
            >
            <div data-eit-flex-grow='1'>
              <a
                className="notification-list-item-link"
                data-eit-display="flex"
                href="javascript:"
              >
                <div data-eit-flex-shrink='0'>
                  {item.read ? (
                    <FaIcon
                      name={item.notification.icon as keyof typeof icons}
                      data-eit-color="text-soft"
                      data-eit-font-size="x5"
                    />
                  ) : (
                    <FaIcon 
                      name={item.notification.icon as keyof typeof icons}
                      className={item.notification.color}
                      data-eit-font-size="x5"
                    />
                  )}
                </div>
                <div 
                  data-eit-flex-grow="1"
                  data-eit-ms="3"
                >
                  <h6 
                    data-eit-mt="0"
                    data-eit-mb="1"
                    data-eit-font-size="x3"
                    data-eit-font-weight="500"
                    data-eit-color={item.read ? 'text-soft' : 'text'}
                  > 
                    { item.module.record_name } 
                  </h6>
                  <p 
                    data-eit-font-size="x2"
                    data-eit-color="text-soft"
                    data-eit-my="0"
                  >
                    { formatDateAgo(item.date) } • { item.module.name }
                  </p>
                </div>
              </a>
            </div>
            <div 
              data-eit-display='flex'
              data-eit-flex-shrink='0'
              data-eit-align="center"
              data-eit-ms="3"
            >
              {!item.read && (
                <span
                  data-eit-shape="circle"
                  data-eit-bg="secondary"
                  data-eit-shape-size='10'
                  data-eit-me="3"
                ></span>
              )}
              <Dropdown 
                position="right"
                btnClass="eit-btn-action notification-list-action"
                button={
                  <FaIcon name="ellipsis" />
                }
              >
                <div data-eit-mx='2'>
                  <a 
                    onClick={() => markAsRead(item)}
                    className="eit-dropdown__item" 
                    href="javascript:"
                  >
                    <FaIcon name="circleCheck" />
                    Marcar como leído
                  </a>
                  <a 
                    onClick={() => markAsNotRead(item)}
                    className="eit-dropdown__item" 
                    href="javascript:"
                  >
                    <FaIcon 
                      name="circle" 
                      data-eit-me="1"
                    />
                    Marcar como no leído
                  </a>
                  <a 
                    onClick={() => archiveNotification(item)}
                    className="eit-dropdown__item" 
                    href="javascript:"
                  >
                    <FaIcon 
                      name="boxArchive" 
                      data-eit-me="1"
                    />
                    Archivar
                  </a>
                </div>
              </Dropdown>
            </div>
          </li>
        ))}
			</ul>
		</div>
	</section>
  )
}