import React from 'react'
function About() {
    return (
        <div>
            <h1>About</h1>
            <form>
            <div className='mb-3'> 
                <label htmlFor='name' className='from-lable'>Name </label>
                <input type="text" className='from-control' placeholder='Enter name'/>
            </div>
            <button className='btn btn-success'>Add Employee</button>
            </form>
            <button className='btn btn-primary'>Show Employee</button>
        </div>
    )
}
export default About