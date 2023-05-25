import React, { useState, useEffect, useRef } from 'react';
import DbItem from './DbItem';
import { IoRemove, IoAdd, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import { getFonts, insertFont } from '../utils/fonts';

import Spinner from './Spinner';

// Animations
import {
	dbListHeaderAnimation,
	dbListAnimation,
	dbListAddAnimation,
	openAddModalAnimation,
	flyInAddHeader,
	inputFieldsTimeline,
} from '../utils/Animations';
import '../index.css';
import './DbList.css';

function DbList({ forwardedRef }) {
	const navigate = useNavigate();
	const addMenuRef = useRef(null);
	const addFormRef = useRef(null);
	const timeline = useRef(null);
	const [data, setData] = useState([]);
	const [addingData, setAddingData] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [id, setId] = useState('');
	const [fontName, setFontName] = useState('');
	const [image, setImage] = useState('');
	const [image2, setImage2] = useState('');
	const [link, setLink] = useState('');
	const [isWide, setIsWide] = useState(0);

	const getData = async () => {
		setIsLoading(true);
		const res = await getFonts();
		const data = res.data;
		setData(data);
		setIsLoading(false);
	};

	const closeModalAndReset = () => {
		// Close modal
		setAddingData(false);

		setId('');
		setFontName('');
		setImage('');
		setImage2('');
		setLink('');
		setIsWide(0);
	};

	const autoIdIncrement = () => {
		if (data) {
			let curId = data.length + 1;
			setId(curId);
		} else {
			setId(1);
		}
	};

	useEffect(() => {
		dbListHeaderAnimation(forwardedRef);
		getData();
	}, []);

	// Item animation

	useEffect(() => {
		dbListAnimation();
	}, [data]);

	const onInputChange = (state, e) => {
		state(e.target.value);
	};

	const handleClose = () => {
		closeModalAndReset();
	};

	const handleAdd = async () => {
		setAddingData(true);
		const element = forwardedRef.current;
		openAddModalAnimation(element);
		flyInAddHeader(element);
		inputFieldsTimeline(addFormRef, timeline);
		autoIdIncrement();
	};

	const onHandleSubmit = async (e) => {
		e.preventDefault();
		// Insert into db
		const res = await insertFont(id, fontName, image, image2, link, isWide);
		console.log(res);
		closeModalAndReset();
		navigate(0);
	};
	return (
		<>
			<div
				className={
					addingData
						? 'adding-container-overlay'
						: 'adding-container-overlay hidden'
				}
			>
				<div
					className={
						addingData ? 'adding-container' : 'adding-container hidden'
					}
					ref={addMenuRef}
				>
					<form className="content" onSubmit={onHandleSubmit} ref={addFormRef}>
						<button
							type="button"
							onClick={() => handleClose()}
							className="action-button close"
						>
							<IoClose size={28} />
						</button>
						<div className="adding-header">
							<p>Add font</p>
						</div>
						<label className="id">Id</label>
						<input
							className="input-id"
							type="text"
							name="id"
							defaultValue={id}
							onChange={(e) => onInputChange(setId, e)}
							autoComplete="off"
						/>
						<label className="name">Font name</label>
						<input
							className="input-name"
							type="text"
							name="name"
							defaultValue={name}
							onChange={(e) => onInputChange(setFontName, e)}
							autoComplete="off"
						/>
						{/* <img src={editingData['image']} alt="" /> */}
						<label className="image">Font image (left)</label>
						<input
							className="input-image"
							type="text"
							name="image"
							defaultValue={image}
							onChange={(e) => onInputChange(setImage, e)}
							autoComplete="off"
						/>
						{/* <img src={editingData['image2']} alt="" /> */}
						<label className="image2">Font image (right)</label>
						<input
							className="input-image2"
							type="text"
							name="image2"
							defaultValue={image2}
							onChange={(e) => onInputChange(setImage2, e)}
							autoComplete="off"
						/>
						<label className="link">Link</label>
						<input
							className="input-link"
							type="text"
							name="link"
							defaultValue={link}
							onChange={(e) => onInputChange(setLink, e)}
							autoComplete="off"
						/>

						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>

			{isLoading ? (
				<Spinner size={150} />
			) : (
				<>
					{data ? (
						<div className="dblist-container">
							{data.map((el, index) => {
								return <DbItem name={el.name} id={el.id} key={el.id} />;
							})}
						</div>
					) : (
						<div className="container" style={{ fontSize: '2rem' }}>
							No items in database
						</div>
					)}
					<div className="add-container">
						<button className="main-button add" onClick={() => handleAdd()}>
							<IoAdd />
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default DbList;
