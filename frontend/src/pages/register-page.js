import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from "../components/page-layout";
import { Register } from "../services/user.service";


export const RegisterPage = () => {

    const { getAccessTokenSilently } = useAuth0();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        DOB: "",
    });

    async function handleSubmit(evt) {
        evt.preventDefault();
        const accessToken = await getAccessTokenSilently();
        console.log("register", formData)
        await Register(accessToken, formData);
        navigate("/profile");
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    Set Up Your Profile
        </h1>
                <div className="content-form" id="register-form">
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
            </div>
        </PageLayout>
    )

}



