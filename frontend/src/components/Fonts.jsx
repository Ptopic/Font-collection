import React, { useState, useEffect } from 'react';
import Card from './Card';

import { getFonts, updateFont } from '../utils/fonts';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Fonts({ forwardedRef }) {
	gsap.registerPlugin(ScrollTrigger);

	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const res = await getFonts();
			const data = res.data;
			setData(data);
			console.log(data);
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
		<div className="fonts-container">
			{data.map((card, index) => {
				return (
					<Card
						key={index}
						image={card.image}
						image2={card.image2}
						link={card.link}
						isWide={card.wide === 1 ? true : false}
						forwardedRef={forwardedRef}
					/>
				);
			})}
			{/* <Card
				key={1}
				image={
					'https://images.squarespace-cdn.com/content/v1/63d31edbc3c1e6324267c78e/3e4b2ad8-d161-4af6-8d9b-c905e77388be/xillian-font-5.jpg?format=750w'
				}
				image2={
					'https://images.squarespace-cdn.com/content/v1/63d31edbc3c1e6324267c78e/dbce1160-754b-4639-b8db-7fba37b99af8/Xillian-Font-3.jpg?format=750w'
				}
				link={'https://www.fontfabric.com/fonts/mont-blanc/'}
				forwardedRef={forwardedRef}
				// isWide={true}
			/>
			 */}
		</div>
	);
}

export default Fonts;
