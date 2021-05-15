import React, { useState, useEffect } from 'react'
import AddBand from './createBand'
import UpdateBand from './updateBand'
import { getBands } from '../../../globalApi'
import EmptyData from '../../../components/ui/emptyData/emptyData'
export default function Bands() {

  const [bands, setBands] = useState([]);
  
  const [ addBand, setAddBand] = useState(false)
  const [updateBand, setUpdateBand] = useState(false)
  const [band, setBand] = useState({})

  useEffect( () => {
    getBands().then(result => { setBands(result)})
  }, [])

  const updateBandList = (newband) => {
  setBands([...bands, newband])
  }

  const toggleAddBand = () => {
    addBand ? setAddBand(false) :  setAddBand(true)
  }

  const toggleUpdateBand = async (result) => {
    await setBand(result)
    console.log('result>>>>>>', band)
    console.log('result22>>>>>>', result)
    updateBand ? setUpdateBand(false) :  setUpdateBand(true)
  }

  const searchArray = (e) => {
    getBands().then(result =>{
        const test = result.filter(result => {
        return result.bandName.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setBands(test);
    
    } )
      
}
  
    return (
    <>
     {
           addBand ? <AddBand updateBandList = {updateBandList} closeModal = {toggleAddBand}/> :
           updateBand ? <UpdateBand band = {band} updateBandList = {updateBandList} closeModal = {toggleUpdateBand}/> : null
              }
          <div className="content-header">Bands</div>
      <div className="content-sub">Here are the list of bands</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input onChange={searchArray} type="text" className="app-input-search w-input"  placeholder="Search..." id="name" />
          </div>
          <div className="app-table-buttons">
          <a href="#" onClick={ toggleAddBand } className="table-button filter">Create Band<span className="table-button-icon"></span></a>
        </div>
      </div>
      <div>
      {
              bands.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                     <th className="app-table2-header"><input type = "checkbox" /></th>
                                     <th className="app-table2-header">Band Name</th>
                                    <th className="app-table2-header">Band Description</th>
                                    <th className="app-table2-header">Daily Limit</th>
                                    <th className="app-table2-header">Airtime Limit</th>
                                    <th className="app-table2-header">Transfer Limit</th>
                                    <th className="app-table2-header">Withdrawal Limit</th>
                                    <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      bands.map( result => {
                                        return(
                                        <tr key={result.id} className="app-table2-row">
                                        <td className="app-table2-data"><input type = "checkbox" /></td>
                                        <td style={{textTransform: 'capitalize'}} className="app-table2-data">{result.bandName}</td>
                                        <td className="app-table2-data">{result.bandDescription}</td>
                                        <td className="app-table2-data">{result.dailyCumulativeLimit}</td>
                                        <td className="app-table2-data">{result.airtimeLimit}</td>
                                        <td className="app-table2-data">{result.transferLimit}</td>
                                        <td className="app-table2-data">{result.withdrawalLimit}</td>
                                        <td className="app-table2-data" style={{color:'#de4343', fontWeight: 'bold', cursor: 'pointer'}}>
                                      <div onClick={ () => { toggleUpdateBand(result)}} >Update Band</div>
                                      </td>
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