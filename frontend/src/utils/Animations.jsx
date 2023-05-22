// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const dbListHeaderAnimation = (forwarededRef) => {
	const element = forwarededRef.current;
	console.log(element);
	gsap.fromTo(
		element.querySelector('.section-start.manage'),
		{
			opacity: 0,
			y: -50,
		},
		{
			opacity: 1,
			y: 0,
			delay: 0.4,
			duration: 1.2,
		}
	);
};
export const dbListAnimation = () => {
	let elements = gsap.utils.toArray('.dbitem');
	elements.forEach((el) => {
		gsap.fromTo(
			el,
			{
				opacity: 0,
				y: -150,
			},
			{
				duration: 1,
				y: 0,
				opacity: 1,
				delay: 1,
			}
		);
	});

	elements = gsap.utils.toArray('.buttons-container');
	elements.forEach((el) => {
		gsap.fromTo(
			el,
			{
				opacity: 0,
				y: -150,
			},
			{
				duration: 1,
				y: 0,
				opacity: 1,
				delay: 1.4,
			}
		);
	});
};

export const dbListAddAnimation = (forwardedRef) => {
	const element = forwardedRef.current;
	gsap.fromTo(
		element.querySelector('.action-button.close'),
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1.2,
		}
	);
};
