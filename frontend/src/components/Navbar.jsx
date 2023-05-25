import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../index.css';
import './Navbar.css';
import {
	navbarLogoFlyIn,
	homeFlyIn,
	manageFlyIn,
	navbarScrollAnimation,
	navbarScrollAnimationMobile,
	headerFlyIn,
} from '../utils/Animations';

function Navbar({ forwardedRef }) {
	const [opened, setOpened] = useState(false);

	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		const element = forwardedRef.current;

		navbarLogoFlyIn(element);
		// Home fly in
		homeFlyIn(element);
		// Manage fly in
		manageFlyIn(element);

		// Header fly in
		headerFlyIn(element);

		// Navbar scroll animations
		navbarScrollAnimation(element);
		navbarScrollAnimationMobile(element);
	}, []);

	const onPress = () => {
		setOpened(!opened);
	};

	return (
		<>
			<nav className="navbar">
				<div className="left-container">
					<h1>Font collection website</h1>
				</div>

				<div className="right-container">
					<ul>
						<li>
							<Link to={`/`} className="home">
								Home
							</Link>
						</li>
						<li>
							<Link to={`/manage`} className="manage">
								Manage
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			<nav className="navbar-mobile">
				<div className="navbar-button" onClick={onPress}>
					{opened === true ? (
						<IoClose size={32} />
					) : (
						<GiHamburgerMenu size={32} />
					)}
				</div>
			</nav>

			<div
				className="navbar-mobile-container"
				style={{
					transform: opened ? `translateX(0%)` : `translateX(100%)`,
					opacity: opened ? 1 : 0,
				}}
			>
				<Link to={`/`} className="home">
					Home
				</Link>

				<Link to={`/manage`} className="manage">
					Manage
				</Link>
			</div>
		</>
	);
}

export default Navbar;
