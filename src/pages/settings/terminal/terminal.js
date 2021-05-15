import React, { useState, useEffect } from 'react'
import { getTerminal } from '../../../globalApi'
import EmptyData from '../../../components/ui/emptyData/emptyData'
export default function Terminal() {

  const [terminals, setTerminal] = useState([]);

  useEffect( () => {
    getTerminal().then(result => { setTerminal(result)})
  }, [])



  const searchArray = (e) => {
    getTerminal().then(result =>{
        const test = result.filter(result => {
        return result.applicationName.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setTerminal(test);
    
    } )
      
}
  
    return (
    <>
          <div className="content-header">Terminals</div>
      <div className="content-sub">Here are the list of terminals</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input onChange={searchArray} type="text" className="app-input-search w-input"  placeholder="Search..." id="name" />
          </div>
        
      </div>
      <div>
      {
              terminals.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                     <th className="app-table2-header"><input type = "checkbox" /></th>
                                     <th className="app-table2-header">Application Name</th>
                                    <th className="app-table2-header">Install Date</th>
                                    <th className="app-table2-header">Application Version</th>
                                    <th className="app-table2-header">Firmware Version</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      terminals.map( result => {
                                        return(
                                        <tr key={result.id} className="app-table2-row">
                                        <td className="app-table2-data"><input type = "checkbox" /></td>
                                        <td style={{textTransform: 'capitalize'}} className="app-table2-data">{result.applicationName}</td>
                                        <td className="app-table2-data">{result.installDate}</td>
                                        <td className="app-table2-data">{result.applicationVersion}</td>
                                        <td className="app-table2-data">{result.firmwareVersion}</td>
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