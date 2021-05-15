import './caution.css'
export default function Caution(props) {
    return(
     <div className="app-modal-overlay">
    <div className="app-modal-div success" style={{ padding:'50px'}}>
      <div className="alert-icon failed"></div>
      <div style={{ textAlign: 'center'}} className="alert-message">Are you sure you want to perform this action</div>
      <div className="caution-flex">
        <div style={{ textAlign: 'center'}} onClick={ props.cancel } className="caution-button cancel">Cancel</div>
        <div style={{ textAlign: 'center'}} onClick={ props.confirm } className="caution-button confirm">Confirm</div>
      </div>
    </div>
  </div> 
    )
}