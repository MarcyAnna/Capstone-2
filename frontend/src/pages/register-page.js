import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("register", formData)
    await register(formData);
    navigate("/");
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="register-form">
        <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                      name="DOB"
                      className="form-control"
                      value={formData.DOB}
                      onChange={handleChange}
                  />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>  
      </div>
  )

}



