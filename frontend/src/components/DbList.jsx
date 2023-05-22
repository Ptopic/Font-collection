import React, { useState, useEffect, useRef } from 'react';
import DbItem from './DbItem';
import { IoAdd } from 'react-icons/io5';

import { getFonts, updateFont } from '../utils/fonts';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
function DbList() {
	gsap.registerPlugin(ScrollTrigger);
	const ref = useRef(null);

	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const res = await getFonts();
			const data = res.data;
			setData(data);
			console.log(data);
		};
		getData();
	}, []);

	return (
		<>
			<div className="dblist-container">
				{data.map((el, index) => {
					return <DbItem name={el.name} id={el.id} key={el.id} />;
				})}
			</div>

			<div className="add-container">
				<button>
					<IoAdd />
				</button>
			</div>
		</>
	);
}

export default DbList;
