import React from 'react';
import './Admin.scss';
import SideBar from './SideBar';
import Header from './Header';
export default function Admin({ children }) {
    return (
        <div className="admin">

            <div className="container">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="content-admin">
                    {children}
                </div>

            </div>
        </div>
    );
}
