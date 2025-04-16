import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    // Validation functions
    const validateName = (value) => {
        if (!value.trim()) return 'Name is required';
        return '';
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
    };

    const validatePassword = (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters long';
        if (!/\d/.test(value)) return 'Password must contain at least one number';
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        let error = '';
        if (name === 'name') error = validateName(value);
        if (name === 'email') error = validateEmail(value);
        if (name === 'password') error = validatePassword(value);

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSignup = (e) => {
        e.preventDefault();

        const nameError = validateName(form.name);
        const emailError = validateEmail(form.email);
        const passwordError = validatePassword(form.password);

        const allErrors = { name: nameError, email: emailError, password: passwordError };
        setErrors(allErrors);

        const hasErrors = Object.values(allErrors).some(error => error !== '');
        if (hasErrors) {
            toast.error('Please fix the errors before submitting');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(form);
        localStorage.setItem('users', JSON.stringify(users));

        toast.success('Signup successfully');
        setForm({ name: '', email: '', password: '' });
        setErrors({ name: '', email: '', password: '' });
    };

    return (
        <>
            <form onSubmit={handleSignup}>
                <h1>Signup</h1>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        placeholder='Enter Your Name'
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        placeholder='Enter Your Email'
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        placeholder='Enter Your Password'
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div>
                    <button type='submit'>Signup</button>
                </div>
            </form>

            <ToastContainer />
        </>
    );
};

export default Signup;
