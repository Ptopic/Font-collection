import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Fonts from '../components/Fonts';

import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../index.css';
import './Home.css';

function Home() {
	gsap.registerPlugin(ScrollTrigger);
	const ref = useRef(null);

	return (
		<div ref={ref}>
			<Navbar forwardedRef={ref} />

			<Header />

			<div className="section-start">
				<h1 className="section-header">Fonts:</h1>
			</div>

			<Fonts forwardedRef={ref} />
		</div>
	);
}

export default Home;
