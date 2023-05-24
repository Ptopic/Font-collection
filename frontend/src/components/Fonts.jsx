import React, { useState, useEffect } from 'react';
import Card from './Card';

import { getFonts, updateFont } from '../utils/fonts';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import Spinner from './Spinner';

import '../index.css';
import './Fonts.css';

function Fonts({ forwardedRef }) {
	gsap.registerPlugin(ScrollTrigger);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const res = await getFonts();
			const data = res.data;
			setData(data);
			console.log(data);
			setIsLoading(false);
		};
		getData();

		// Fly header text fly in
		const element = forwardedRef.current;

		gsap.fromTo(
			// Elements fly in animation
			element.querySelector('.section-start'),
			{
				opacity: 0,
				y: -50,
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.9,
				scrollTrigger: {
					trigger: element.querySelector('.section-start'),
					start: 'top center',
					end: 'buttom center',
				},
			}
		);
	}, []);

	useEffect(() => {
		// Left images
		const elements = gsap.utils.toArray('.font-card');
		console.log(elements);
		elements.forEach((el) => {
			gsap.fromTo(
				el,
				{
					opacity: 0,
					x: -150,
				},
				{
					duration: 1,
					x: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: el,
						start: 'top center',
						toggleActions: 'play none none reverse',
						end: 'top center',
					},
				}
			);
		});

		// Right images

		const elementsRight = gsap.utils.toArray('.font-card-second-part');

		elementsRight.forEach((el) => {
			gsap.fromTo(
				el,
				{
					opacity: 0,
					x: 150,
				},
				{
					duration: 1,
					x: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: el,
						start: 'top center',
						toggleActions: 'play none none reverse',
						end: 'top center',
					},
					delay: 0.4,
				}
			);
		});
	}, [data]);
	return (
		<>
			<div className="fonts-container">
				{data.map((card, index) => {
					return (
						<Card
							key={index}
							image={card.image}
							image2={card.image2}
							link={card.url}
							isWide={card.wide === 1 ? true : false}
							forwardedRef={forwardedRef}
						/>
					);
				})}
			</div>
			{/* {isLoading ? (
				// <Spinner size={150} />
			) : (
				<div className="fonts-container">
					{data.map((card, index) => {
						return (
							<Card
								key={index}
								image={card.image}
								image2={card.image2}
								link={card.url}
								isWide={card.wide === 1 ? true : false}
								forwardedRef={forwardedRef}
							/>
						);
					})}
				</div>
			)} */}
		</>
	);
}

export default Fonts;
