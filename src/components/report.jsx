// import React, { useState } from 'react'
// import students from '../students';
// import '../App.css'
// const Reportcard = () => {

//   const [studentData, setStudentData] = useState(students)

//   console.log(students)
//   // let name = 'pratik'
//   // let marks = 90
//   let isLogin= false
//   let passed = studentData.filter((item) => {
//     return item.marks >= 50
//   })
//   let failed = studentData.filter((item) => {
//     return item.marks < 50
//   })
//   let average = studentData.reduce((total, item) => {
//     return total + item.marks
//   }, 0) / studentData.length

//   let studentObj = {
//     name: '',
//     marks: ''
//   }

//   function submitHandler(event) {
//     event.preventDefault()

//     studentObj.name = event.target.name.value
//     studentObj.marks = event.target.marks.value

//     console.log(studentObj)
//     setStudentData((preData) => {
//       return [...preData, studentObj]
//     })

//   }
  

//   return (
//     <div>
//       <h1>Report Card</h1>
//       <p>Total Students : {studentData.length}</p>
//       <p>Passed : {passed.length}</p>
//       <p>Failed : {failed.length}</p>
//       <p>Average : {average}</p>

//       <p></p>
//       <form onSubmit={submitHandler}>
//         <input placeholder='name' name='name' />
//         <input placeholder='marks' name='marks' />
//         <button type='submit'>Add</button>
//       </form>
//       <div id='reportcard'>
//       {
//         studentData.map((item, index) => {
//           return <div key={index}>
//             <p>Name : {item.name}</p>
//             <p>Marks : {item.marks}</p>
//             <hr />
      
//           </div>
//         })

//       }
//       </div>
//       {
//         isLogin ? <button>Logout</button> : <button>Login</button>
//       }

     
//     </div>
//   )
// }

// export default Reportcard

import React, { useState } from 'react';
import students from '../students';
import '../App.css';

const Reportcard = () => {
  const [studentData, setStudentData] = useState(students);

  // Logic
  const totalStudents = studentData.length;
  const passedStudents = studentData.filter((s) => Number(s.marks) >= 40);
  const failedStudents = studentData.filter((s) => Number(s.marks) < 40);
  const average = totalStudents > 0 
    ? (studentData.reduce((acc, s) => acc + Number(s.marks), 0) / totalStudents).toFixed(1) 
    : 0;

  const submitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const marks = event.target.marks.value;

    if (!name || marks === "") return;

    setStudentData([...studentData, { name, marks: Number(marks) }]);
    event.target.reset(); 
  };

  return (
    <div className="container">
      <h1>Student Report Card</h1>

      {/* Stats Cards */}
      <div className="stats-panel">
        <div className="stat-item">
          <span>Total</span>
          <strong>{totalStudents}</strong>
        </div>
        <div className="stat-item">
          <span>Passed</span>
          <strong style={{ color: '#28a745' }}>{passedStudents.length}</strong>
        </div>
        <div className="stat-item">
          <span>Failed</span>
          <strong style={{ color: '#dc3545' }}>{failedStudents.length}</strong>
        </div>
        <div className="stat-item">
          <span>Average</span>
          <strong>{average}</strong>
        </div>
      </div>

      {/* Add Student Form */}
      <form onSubmit={submitHandler}>
        <input placeholder="Name" name="name" required />
        <input placeholder="Marks" name="marks" type="number" required min="0" max="100" />
        <button type="submit">Add Student</button>
      </form>

      {/* Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((item, index) => {
            const isPass = Number(item.marks) >= 40;
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.marks}</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ 
                      backgroundColor: isPass ? '#e6ffed' : '#ffeeee',
                      color: isPass ? '#28a745' : '#dc3545' 
                    }}
                  >
                    {isPass ? 'PASS' : 'FAIL'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reportcard;