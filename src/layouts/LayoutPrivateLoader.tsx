import { Avatar } from 'uikit-3it-react'

export default function LayoutPrivateLoader() {
  return (
  <main
    id="layout-private-default"
    className="layout-private-default"
  >
    <aside id="sidebar" className="eit-sidebar">
      <div
        className="eit-skeleton eit-skeleton__title"
        data-eit-my='2'
        style={{ width: "80%" }}
      ></div>
      <div
        className="eit-skeleton eit-skeleton__text"
        data-eit-my='2'
        style={{ width: "60%" }}
      ></div>
      <section className="eit-sidebar__menu__main">
        <div
          className="eit-skeleton eit-skeleton__text"
          data-eit-my='2'
          style={{ width: "70%" }}
        ></div>
        <div
          className="eit-skeleton eit-skeleton__text"
          data-eit-my='2'
          style={{ width: "40%" }}
        ></div>
      </section>
      <section 
        className="eit-sidebar__footer element--display element-collapse"
        data-eit-flex-direction='column'
      >   
        <div className="eit-sidebar__footer__project">
          <div
            className="eit-skeleton eit-skeleton__text"
            data-eit-my='2'
            style={{ width: "60%" }}
          ></div>
        </div>
      </section>
    </aside>
    <section className="eit-wrapper">
      <nav 
        id="navbar" 
        className="eit-navbar"
        data-eit-display="none"
        data-eit-justify="between"
        data-eit-align="center"
        data-eit-display-md="flex"
      >
        <div 
          className="eit-navbar-left"
          data-eit-flex="fill"
        >
          <div
            className="eit-skeleton eit-skeleton__text"
            data-eit-my='2'
            style={{ width: "50%" }}
          ></div>
        </div>
        <div 
          className="eit-navbar-right"
          data-eit-display="flex"
          >
          <Avatar
            width="48"
            data-eit-object-fit='contain'
            data-eit-shape='circle'
          />
        </div>
      </nav>
      <section 
        className="eit-container"
        data-eit-pt="0"
      >
        <div data-eit-mb="4">
          <div
            className="eit-skeleton eit-skeleton__title"
            data-eit-my='2'
            style={{ width: "60%" }}
          ></div>
          <div
            className="eit-skeleton eit-skeleton__text"
            data-eit-my='2'
            style={{ width: "30%" }}
          ></div>
        </div>
        <div data-eit-mb="4">
          <div
            className="eit-skeleton eit-skeleton__text"
            data-eit-my='2'
            style={{ width: "40%" }}
          ></div>
          <div
            className="eit-skeleton eit-skeleton__text"
            data-eit-my='2'
            style={{ width: "20%" }}
          ></div>
        </div>
      </section>
    </section>
  </main>
  )
}
