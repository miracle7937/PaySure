export default function Overview(props) {

    return(
    <>
    <div className="content-header">{props.organisation.organisationName}</div>
    <div className="content-sub">Here are the latest report on {props.organisation.organisationName}</div>
    <div className="basic-table-card overview">
        <div className="details-flex">
          <div className="details-div">
          <div className="details-header">Organisation Code</div>
          <div className="details-value">{ props.organisation.organisationCode}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Organisation Name</div>
            <div className="details-value">{props.organisation.organisationName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Phone Number</div>
            <div className="details-value">{props.organisation.contactAddress}</div>
          </div> 
          <div className="details-div">
            <div className="details-header">Contact Address</div>
            <div className="details-value">{props.organisation.contactAddress}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Email Address</div>
            <div className="details-value">{props.organisation.contactEmailAddress}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Bank Name</div>
            <div className="details-value">{props.organisation.settlementBankName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Account Name</div>
            <div className="details-value">{props.organisation.settlementAccountName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Account Number</div>
            <div className="details-value">{props.organisation.settlementAccountNumber}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Account Type</div>
            <div className="details-value">{props.organisation.settlementAccountType}</div>
          </div>
          <div className="details-div">
            <div className="details-header">BVN</div>
            <div className="details-value">{props.organisation.settlementBvn}</div>
          </div>
          
        </div>
        <div className="role-descrip-div">
          <div className="role-descrip-div-col-1"></div>
          <div className="role-descrip-div-col-2"></div>
        </div>
      </div>

    </>
    )
}


