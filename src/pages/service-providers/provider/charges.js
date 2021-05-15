import React from 'react'
import EmptyData from '../../../components/ui/emptyData/emptyData'
export default function Charges(props) {

    return (
    <>
          <div className="content-header">{props.provider.providerName} - Charges</div>
      <div className="content-sub">Here are the latest report on {props.provider.providerName}</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input type="text" className="app-input-search w-input" placeholder="Search..." id="name" />
          </div>
        <div className="app-table-buttons">
          {/* <a href="#" className="table-button sort">Sort <span className="table-button-icon"></span></a>
          <a href="#" className="table-button filter">Filter <span className="table-button-icon"></span></a>
          <a href="#" className="table-button actions">Actions <span className="table-button-icon"></span></a> */}
          <div className="styled">
        <select>
                <option selected>Sort</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        <div className="styled">
        <select>
                <option selected>Filter</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>


        <div className="styled">
        <select>
                <option selected>Actions</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        </div>
      </div>
      <div>
      {
                        props.chargesData.length <= 0 ? <EmptyData/> :
                <table className="app-table2">
                    <thead>
                        <tr className="app-table2-row">
                        <th className="app-table2-header">Provider Service</th>
                            <th className="app-table2-header">Service Operation</th>
                            <th className="app-table2-header">Discount</th>
                            <th className="app-table2-header">Paysure.Commision</th>
                            <th className="app-table2-header">Merchant.Commision</th>
                            <th className="app-table2-header"></th>
                        </tr>
                    </thead>
            
                        <tbody style={{background:'red'}}>
                        {
                            props.chargesData.map( result => {
                                return (
                            <tr key={ result.id } className="app-table2-row">
                            <td className="app-table2-data">{result.providerServiceAlias}</td>
                            <td className="app-table2-data">{result.serviceOperation}</td>
                            <td className="app-table2-data">{result.discount}</td>
                            <td className="app-table2-data">{result.paysureCoreCommission}</td>
                            <td className="app-table2-data">{result.merchantCommission}</td>
                            </tr>
                                )
                            })
                        }
                    
                    </tbody>
          
                </table>

                    }
      </div>
    </>
    )
}