import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthProvider';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

export default function Auth() {
    const { showLogin, setShowLogin } = useAuth();
    const [formType, setFormType] = useState('login'); // 'login' or 'register'

    const handleFormSwitch = () => {
        setFormType(formType === 'login' ? 'register' : 'login');
    };
    const chaneform = (form) => {
        setFormType(form);
    };
    const renderForm = () => {
        switch (formType) {
            case 'register':
                return <Register chaneform={chaneform} />;
            case 'login':
                return <Login chaneform={chaneform} />;
            default:
                return null; // Fallback case
        }
    };

    return (
        <div className="w-full min-h-full fixed z-50 bg-black bg-opacity-50 transition-opacity flex items-center justify-center ">
            <div className="overflow-y-none h-screen w-full px-4 max-w-md">
                {renderForm()}
            </div>
        </div>
    );
}
