import React, { useState }  from 'react'
import Loader from '../components/ui/loader/loader'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
export default function ViewTrans({alltransactions,closeModal}) {
    const [ startDate, setStartDate] = useState()
    const [ endDate, setEndDate] = useState()
    const [loader, setLoader] = useState(false);
    

    const ExportReport = async (e) => {
        e.preventDefault();
        setLoader(true)
   console.log("start", new Date(startDate))
   console.log("end", new Date(endDate))
   
   const newTrans = await alltransactions.filter(item => {
       const transDate = new Date(item.transactionDate).toISOString().substr(0,10);
       return transDate >= startDate && transDate <= endDate;
   })
   console.log("finalArray>>", newTrans)

   const apiData = newTrans;
   const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
   const fileExtension = ".xlsx";
   const fileName = "paysure-report"; // here enter filename for your excel file  
     const ws = XLSX.utils.json_to_sheet(apiData);
     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
     const data = new Blob([excelBuffer], { type: fileType });
     FileSaver.saveAs(data, fileName + fileExtension);
     setLoader(false)
    }

    return(
        <>
              <div className="app-modal-overlay">
      <div className="app-modal-div" style={{width:"40%", height: "65%", overflow:"auto"}}>
      { loader? <Loader/> : null }
      <div className="app-modal-heading">
        <div className="app-modal-header">Export Report</div>
      </div>
      <form onSubmit={ ExportReport }>
      <div className="details-header">Start Date</div>
          <input onChange = { (event) => setStartDate(event.target.value) } type="date" className="app-modal-form-field w-input"   required/>
          <div className="details-header">End Date</div>
          <input onChange = { (event) => setEndDate(event.target.value) }type="date" className="app-modal-form-field w-input"   required/>

          <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Export Report</button>
        </form>
      <div onClick= {closeModal} className="app-modal-close"></div>
    </div>
  </div>
      
        </>
    )
}