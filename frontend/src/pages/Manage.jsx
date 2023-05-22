import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import DbList from '../components/DbList';

function Manage() {
	const ref = useRef(null);
	return (
		<div ref={ref}>
			<Navbar forwardedRef={ref} />

			<div className="section-start manage">
				<h1 className="section-header">List of fonts in db:</h1>
			</div>

			<DbList />
		</div>
	);
}

export default Manage;
