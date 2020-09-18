import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const [form, setForm] = useState({ email: "", password: "" });

    const modifyForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); // access the etargetname key and sets its to the value
        console.log(form);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('signup form, username:');
        console.log(form);

        a
    }

    // const modifyPassword = (e) => {
    //   setForm({ ...form, password: e.target.value });
    //   console.log(form);
    // };

    const emailStyles = () => {
        let styles = "form-control";

        if (form.email.includes("@")) {
            styles += " border-success";
        } else {
            styles += " border-danger";
        }

        return styles;
    };

    return (
        <div>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            onChange={modifyForm}
                            type="email"
                            className={emailStyles()}
                            name="email"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
              </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            // onChange={modifyPassword}
                            onChange={modifyForm}
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
            </button>
                </form>
            </div>
            <h1>{form.email}</h1>
            <h1>{form.password}</h1>
        </div>
    );
}

export default Signup
