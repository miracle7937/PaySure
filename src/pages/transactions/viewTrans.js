import NumberFormat from 'react-number-format';
export default function ViewTrans({trans, closeModal}) {
    
    return(
        <>
              <div className="app-modal-overlay">
      <div className="app-modal-div" style={{width:"80%", height: "90%", overflow:"auto"}}>
      <div className="app-modal-heading">
        <div className="app-modal-header">Transaction Details</div>
      </div>
      <div className="details-flex">
          <div className="details-div">
            <div className="details-header">Transaction Ref</div>
            <div className="details-value">{trans.transactionId}</div>
          </div>
        </div>
        <div className="details-flex">
          <div className="details-div">
            <div className="details-header">Session Ref</div>
            <div className="details-value">{ trans.sessionId}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Transaction Type</div>
            <div className="details-value">{trans.transactionType}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Channel</div>
            <div className="details-value">{trans.channel}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Provider Name</div>
            <div className="details-value">{trans.providerName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Service Name</div>
            <div className="details-value">{trans.serviceName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Agent Name</div>
            <div className="details-value">{trans.merchantName}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Amount</div>
            <div className="details-value">
              <NumberFormat value={trans.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
</div>
          </div>
          <div className="details-div">
            <div className="details-header">Actual Amount</div>
            <div className="details-value"><NumberFormat value={trans.actualAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} /></div>
          </div>
          <div className="details-div">
            <div className="details-header">Paysure Share</div>
            <div className="details-value"> <NumberFormat value={trans.paysureCoreCommission} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} /></div>
          </div>
          <div className="details-div">
            <div className="details-header">Agent Share</div>
            <div className="details-value"><NumberFormat value={trans.merchantCommission} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
</div>
          </div>
          <div className="details-div">
            <div className="details-header">Transaction Date</div>
            <div className="details-value">{trans.transactionDate}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Transaction Status</div>
            <div className="details-value">{trans.transactionStatus}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Trans Status Message</div>
            <div className="details-value">{trans.transactionStatusMessage}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Provider Status Message</div>
            <div className="details-value">{trans.providerStatusMessage}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Provider Ref</div>
            <div className="details-value">{trans.providerReference}</div>
          </div>
          <div className="details-div">
            <div className="details-header">Transaction Date</div>
            <div className="details-value">{trans.transactionDate}</div>
          </div>
        </div>
      <div onClick= {closeModal} className="app-modal-close"></div>
    </div>
  </div>
      
        </>
    )
}