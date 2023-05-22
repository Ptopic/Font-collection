import React, { useState, useEffect } from 'react';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Card({ id, image, image2, link, isWide }) {
	return (
		<>
			<div className={isWide ? 'font-card wide' : 'font-card'} key={id}>
				<a href={link}>
					<img src={image} alt="" />
				</a>
			</div>
			<div
				className={
					isWide ? 'font-card-second-part wide' : 'font-card-second-part'
				}
			>
				<img src={image2} alt="" />
			</div>
		</>
	);
}

export default Card;
