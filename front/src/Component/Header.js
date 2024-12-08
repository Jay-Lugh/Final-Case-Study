import React from 'react';
import { GiShoppingCart } from "react-icons/gi";
import { Link } from 'react-router-dom';  
import { IoBagHandle } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";


export default function Header({ user }) {
    const userMode = user;

    return (
        <div className="header">
            <div className="title">
                <IoBagHandle className="bag-icon" />
                <h4>Just a Shop</h4>
            </div>
            <div className="icons">
                {userMode === 'user' && (
                    <Link to="/cart">
                        <GiShoppingCart className="cart-icon" />
                    </Link>
                )}
                <Link to="/">
                    <FiLogOut className="logout-icon" />
                </Link>
            </div>
        </div>
    );
}
