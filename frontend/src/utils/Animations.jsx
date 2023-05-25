// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const dbListHeaderAnimation = (forwarededRef) => {
	const element = forwarededRef.current;
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

// Fonts

export const fontsHeaderTextFlyIn = (forwardedRef) => {
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
};

// Font images fly ins

// Left images

export const leftImageFlyIn = (el) => {
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
};

export const rightImageFlyIn = (el) => {
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
};

// Navbar

// Navbar scroll animations

export const navbarScrollAnimation = (element) => {
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
};

export const navbarScrollAnimationMobile = (element) => {
	gsap.fromTo(
		// Scroll animation
		element.querySelector('.navbar-mobile'),
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
};

// Left container fly in

export const navbarLogoFlyIn = (element) => {
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
};

export const homeFlyIn = (element) => {
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
};

export const manageFlyIn = (element) => {
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
};

export const headerFlyIn = (element) => {
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
};

// Add menu

export const flyInAddHeader = (element) => {
	gsap.fromTo(
		element.querySelector('.adding-header'),
		{
			opacity: 0,
			y: -50,
		},
		{
			opacity: 1,
			y: 0,
			delay: 1.2,
			duration: 0.6,
		}
	);
};

export const openAddModalAnimation = (element) => {
	gsap.fromTo(
		element.querySelector('.adding-container'),
		{
			opacity: 0,
		},
		{
			opacity: 1,
			delay: 0.4,
			duration: 0.6,
		}
	);
};

// Fly in input fields

export const inputFieldsTimeline = (forwardedRef, timeline) => {
	const ctx = gsap.context(() => {
		timeline.current = gsap
			.timeline()
			.fromTo(
				'.id',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					delay: 1.4,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-id',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.name',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-name',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.image',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-image',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.image2',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-image2',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.link',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-link',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			);
	}, forwardedRef);
};

// Fly in edit input fields
export const openEditModalAnimation = (element) => {
	gsap.fromTo(
		element.querySelector('.editing-container'),
		{
			opacity: 0,
		},
		{
			opacity: 1,
			backgroundColor: 'red',
			duration: 0.6,
		}
	);
};

export const editinputFieldsTimeline = (forwardedRef, timeline) => {
	const ctx = gsap.context(() => {
		timeline.current = gsap
			.timeline()
			.fromTo(
				'.input-id',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.name',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-name',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.image',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-image',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.image2',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-image2',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.link',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.input-link',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.checkbox',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			);
	}, forwardedRef);
};

// Delete item animation

export const deleteItemTimeline = (ref, timeline) => {
	const ctx = gsap.context(() => {
		timeline.current = gsap
			.timeline()
			.fromTo(
				'.input-id',
				{
					opacity: 0,
					y: -50,
					x: 0,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.4,
				}
			)
			.fromTo(
				'.name',
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
				}
			);
	}, ref);
};
