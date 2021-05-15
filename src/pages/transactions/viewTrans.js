
export default function ViewTrans({trans, closeModal}) {
    
    return(
        <>
              <div className="app-modal-overlay">
      <div className="app-modal-div" style={{width:"80%", height: "90%", overflow:"auto"}}>
      <div className="app-modal-heading">
        <div className="app-modal-header">Transaction Details</div>
      </div>
      <div class="details-flex">
          <div class="details-div">
            <div class="details-header">Transaction ID</div>
            <div class="details-value">{trans.transactionId}</div>
          </div>
        </div>
        <div class="details-flex">
          <div class="details-div">
            <div class="details-header">Session ID</div>
            <div class="details-value">{ trans.sessionId}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Transaction Type</div>
            <div class="details-value">{trans.transactionType}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Channel</div>
            <div class="details-value">{trans.channel}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Provider Name</div>
            <div class="details-value">{trans.providerName}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Service Name</div>
            <div class="details-value">{trans.serviceName}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Merchant Name</div>
            <div class="details-value">{trans.merchantName}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Amount</div>
            <div class="details-value">{trans.amount}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Actual Amount</div>
            <div class="details-value">{trans.actualAmount}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Paysure Commissson</div>
            <div class="details-value">{trans.paysureCoreCommission}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Merchant Commission</div>
            <div class="details-value">{trans.merchantCommission}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Transaction Date</div>
            <div class="details-value">{trans.transactionDate}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Status</div>
            <div class="details-value">{trans.transactionStatus}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Trans Status Message</div>
            <div class="details-value">{trans.transactionStatusMessage}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Prov. Status Message</div>
            <div class="details-value">{trans.providerStatusMessage}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Provider Ref</div>
            <div class="details-value">{trans.providerReference}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Date</div>
            <div class="details-value">{trans.transactionDate}</div>
          </div>
        </div>
      <div onClick= {closeModal} className="app-modal-close"></div>
    </div>
  </div>
      
        </>
    )
}