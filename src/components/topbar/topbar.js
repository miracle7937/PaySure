

const Topbar = () => {
    return(
       <div>
        <div className="admin-top-bar">
        <div className="admin-top-bar-left">
          <div className="settings-icon"></div>
          <div className="admin-top-barlinks admin-active-top-link">Link 1</div>
          <div className="admin-top-barlinks">Link 1</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
       </div>
    )
}

export default Topbar