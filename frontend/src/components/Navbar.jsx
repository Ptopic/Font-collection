import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Navbar({ forwardedRef }) {
	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		const element = forwardedRef.current;

		// console.log(element.querySelector('.home'));
		gsap.fromTo(
			// Elements fly in animation
			element.querySelector('.left-container'),
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
			}
		);
		// Home fly in
		gsap.fromTo(
			element.querySelector('.home'),
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				delay: 0.8,
				duration: 1.2,
			}
		);
		// Manage fly in
		gsap.fromTo(
			element.querySelector('.manage'),
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				delay: 1.6,
				duration: 1.2,
			}
		);

		// Header fly in
		gsap.fromTo(
			element.querySelector('.header-container'),
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				delay: 1.6,
				duration: 1.2,
			}
		);

		gsap.fromTo(
			// Scroll animation
			element.querySelector('.navbar'),
			{
				background: 'none',
			},
			{
				background: 'white',
				scrollTrigger: {
					trigger: element.querySelector('.section-start'),
					start: 'top center',
					end: 'bottom top',
					scrub: true,
				},
			}
		);
	}, []);

	return (
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
	);
}

export default Navbar;
