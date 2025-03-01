import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import "./App.css";

function LoginForm({touched, errors, values, isSubmitting, status} ){
    const [users, setUsers] = useState([{name: "John S"}, {name: "Jane, D"}]);
    useEffect(() => {
        if(status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return(
        <>
    <Form>
        <p>Log In</p>
        {errors.name && (<p className="error">{errors.name}</p>)}
        <Field type="text" name="name" placeholder="Full Name"></Field>
        {touched.email && errors.email && (<p className="error">{errors.email}</p>)} {/* //if there is an error, this shows you the errors message. */}
        <Field type="text" name="email" placeholder="Username" />
    {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
        <Field type="password" name="password" placeholder="Password" />
        <Field component="select" name="food" className="select">
            <option>Please choose an option</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="platnum">Platnum</option>
        </Field>
        <label>
            <Field  type="checkbox" name="tos" checked={values.tos} />
            Accept TOS
        </label>
        <button disabled={isSubmitting}>Submit!</button>
    </Form>
    {users.map(user => (
        <p className="user" key="user.id">Name: {user.name}</p>
    ))}
    </>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, food, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            food: food || "",
            tos: tos || false
        };
    },
    //======VALIDATION SCHEMA==========
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters")
            .required()
    }),
    //======END VALIDATION SCHEMA==========
    handleSubmit(values, {setStatus, setSubmitting}) {
        console.log(values);
        axios.post("https://reqres.in/api/users", values)
            .then(res=> {
                console.log(res);
                setSubmitting(false);
                setStatus(res.data);
              
            })
            .catch(err => {
                console.log(err)
            })
    }
})(LoginForm);

export default FormikLoginForm;