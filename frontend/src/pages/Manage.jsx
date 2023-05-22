import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import DbList from '../components/DbList';

import '../index.css';
import './Manage.css';

function Manage() {
	const ref = useRef(null);
	return (
		<div ref={ref}>
			<Navbar forwardedRef={ref} />

			<div className="section-start manage">
				<h1 className="section-header manage">List of fonts in database:</h1>
			</div>

			<DbList forwardedRef={ref} />
		</div>
	);
}

export default Manage;
