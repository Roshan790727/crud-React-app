import React, { useEffect, useState } from 'react';
import { EmployeeData } from './employeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState(0)
  const [id,setId] = useState(0)
  const [isUpdate,setIsUpdate] = useState(false)

  useEffect(() => {
    setData(EmployeeData);
  }, []);
const handleEdit = (id) => {
  const dt = data.filter(item => item.id == id)
  if( id !==undefined)
  {
    setIsUpdate(true)
setId(id);
setFirstName(dt[0].firstName);
setLastName(dt[0].lastName);
setAge(dt[0].age);
  }
}
  const handleDelete = (id) => {
    if(id > 0){
      if(window.confirm("are you sure to delete this item?")){
        const dt = data.filter(item =>item.id !==id);
        setData(dt)
      }
    }
}

  
const handleSave = (e)=>{
  let error = '';

  if(firstName === '')
    error += "first name is required, ";

   if(lastName === '')
    error += "Last name is required, ";

    if(age <= 0)
    error += "Age is required. ";

    if(error ==='')
    {
    
    

    

e.preventDefault();
const dt = [...data];
const newObject = {
  id : EmployeeData.length+1,
  firstName : firstName,
  lastName : lastName,
  age : age
}
dt.push(newObject); 
setData(dt);
    }
    else{
      alert(error)
    }
}
const handleClear = ()=>{
  setId(0);
setFirstName('');
setLastName('');
setAge("");
setIsUpdate(false)
}
const handleUpdate = ()=>{
const index = data.map((item,index)=>{
  return item.id
}).indexOf(id)

const dt = [...data];
dt[index].firstName = firstName;
dt[index].lastName = lastName;
dt[index].age = age;

setData(dt);
handleClear();
}


 
  return (
    <div className='app'>
      <div  style={{display:"flex", justifyContent:"center", marginTop:10, marginBottom:10}}>
        <div>
          <label>First Name : 
            <input onChange={(e=> setFirstName(e.target.value))} placeholder='Enter First Name' type="text"  value={firstName}/>
          </label>
        </div>
        <div>
          <label>Last Name : 
            <input  onChange={(e=> setLastName(e.target.value))} placeholder='Enter Last Name' type="text"  value={lastName}/>
          </label>
        </div>
        <div>
          <label>Age : 
            <input onChange={(e=> setAge(e.target.value))} placeholder='Enter Age' type="text"  value={age}/>
          </label>
        </div>
        <div>
          {
            !isUpdate ?
            <button onClick={(e)=> handleSave(e)} className='btn btn-primary'>Add</button>
            :
            <button onClick={()=> handleUpdate()} className='btn btn-primary'>Update</button>

          }
          

          
          <button onClick={()=> handleClear()} className='btn btn-danger'>Clear</button>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.no</td>
            <td>ID</td>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                <button onClick={() => handleEdit(item.id)} className='btn btn-primary'>Edit</button>
                <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

