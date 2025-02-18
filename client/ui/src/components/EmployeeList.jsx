import React,{ useState, useEffect} from 'react'
import axios from "axios";
import EmployeeData from './EmployeeData';
import EmployeeCard from './EmployeeCard';
import "./EmployeeList.css"


const EmployeeList = () => {

  const [employees, setEmployees]= useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/api/employees/").then((res)=>{
      setEmployees(res.data);
      console.log(res.data);
  }).catch(()=>{
    console.log("Error while getting data");
  });


    },[]);

    const employeesList = employees.length === 0 ? "no employees found ! ": employees.map((employee,index)=>(
         <EmployeeCard key={index} employee={employee}/>
    ));
  
    const downloadReport = () => {
      // Generate the report content
      const reportContent = employees.map(employee => (
        `Name: ${employee.name}, Employee ID: ${employee.employeeID}, Mobile: ${employee.mobile}, Employee Type: ${employee.employeeType}`
      )).join('\n');
  
      // Create a blob with the report content
      const blob = new Blob([reportContent], { type: 'text/plain' });
  
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element and click it to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'employee_report.txt');
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };

  return (
    
     <div className="Show_EmployeeList">
       <div className="container">
       <button className="btn btn-primary" onClick={downloadReport}>Download Report</button>
        <div className="list">{employeesList}</div>
      
       
    
       </div>

    </div>
    
  );
};

export default EmployeeList;
