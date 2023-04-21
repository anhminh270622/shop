import React from 'react';
import './Admin.scss';
import SideBar from './SideBar';
import ContentAdmin from './ContentAdmin';
import Header from './Header';
export default function Admin() {
    return (
        <div className="admin">
            <div className="top">
                <Header />
            </div>
            <div className="container">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="content-admin">
                    <ContentAdmin />
                </div>

            </div>
        </div>
    );
}
