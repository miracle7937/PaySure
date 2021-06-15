import NumberFormat from 'react-number-format';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Overview({merchant, wallet, transDetails}) {

    return(
    <>
    <div className="content-header">{merchant.merchantName}</div>
<div className="content-sub">Here are the latest report on {merchant.merchantName}</div>
<OwlCarousel className='owl-theme' loop margin={10} nav>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Wallet</div>
                          <NumberFormat value={wallet.walletBalance} className="slide-card-value" displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Commission</div>
                          <NumberFormat value={wallet.commissionBalance} className="slide-card-value" displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Transactions</div>
                         <div className="slide-card-value" >{transDetails.totalRecords}</div> 
                        </div>
                        <div className="slide-card-icon orange"></div>
                      </div>
                    </div>
    </div>

</OwlCarousel>
<br/><br/>
<div className="basic-table-card">
        <div className="details-flex">
        {
          Object.entries(merchant).map( ([key,value],i) => {
            return(
                <div key={key} className="details-div-x">
            <div className="details-header">{key}</div>
            <div className="details-value">{value}</div>
          </div>
            )
          })
        }
        

        </div>
        <div className="role-descrip-div">
          <div className="role-descrip-div-col-1"></div>
          <div className="role-descrip-div-col-2"></div>
        </div>
      </div>

    </>
    )
}


