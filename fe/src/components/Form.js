import { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const Form = props => {
    const [errMsg, setErrMsg] = useState(null);

    const formik = useFormik({
        initialValues: {
            bookName: '',
            isbn: '',
            authorFirstName: '',
            authorLastName: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.bookName) {
                errors.bookName = "Book name is required";
            }
            if (!data.authorFirstName) {
                errors.authorFirstName = "Author full name is required";
            }
            if (!data.authorLastName) {
                errors.authorLastName = "Author full name is required";
            }

            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            fetch('books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result.data);
                    props.updateBooks(result.data);
                })
                .catch((error) => {
                    setErrMsg(JSON.parse(error.message));
                    console.error('Error:', error);
                });
            formik.resetForm();
        }
    })

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
                    <label htmlFor="bookName" className={classNames({ 'p-error': isFormFieldValid('bookName') })}>Book Name*</label>
                    &nbsp;&nbsp;
                    <InputText id="bookName" name="bookName" value={formik.values.bookName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('bookName') })} />
                {getFormErrorMessage("bookName")}
            </div>
            <div className="p-field">
                <label htmlFor="isbn" className={classNames({ 'p-error': isFormFieldValid('isbn') })}>ISBN</label>
                &nbsp;&nbsp;
                <InputText id="isbn" name="isbn" value={formik.values.isbn} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('isbn') })} />
            </div>
            <div className="p-field">
                <label htmlFor="authorFirstName" className={classNames({ 'p-error': isFormFieldValid('authorFirstName') })}>Author First Name*</label>
                &nbsp;&nbsp;
                <InputText id="authorFirstName" name="authorFirstName" value={formik.values.authorFirstName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('authorFirstName') })} />
                {getFormErrorMessage("authorFirstName")}
            </div>
            <div className="p-field">
                <label htmlFor="authorLastName" className={classNames({ 'p-error': isFormFieldValid('authorLastName') })}>Author Last Name*</label>
                &nbsp;&nbsp;
                <InputText id="authorLastName" name="authorLastName" value={formik.values.authorLastName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('authorLastName') })} />
                {getFormErrorMessage("authorLastName")}
            </div>
            <Button type="submit" label="Add" className="p-mt-2" />
            <div style={{color:"red"}}>{errMsg}</div>
        </form>
    )
}


export default Form;