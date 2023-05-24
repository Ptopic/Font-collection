import React, { useState, useEffect, useRef } from 'react';
import DbItem from './DbItem';
import { IoRemove, IoAdd, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { getFonts, insertFont } from '../utils/fonts';

// import Spinner from './Spinner';

// Animations
import {
	dbListHeaderAnimation,
	dbListAnimation,
	dbListAddAnimation,
} from '../utils/Animations';
import '../index.css';
import './DbList.css';

function DbList({ forwardedRef }) {
	const navigate = useNavigate();
	const addMenuRef = useRef(null);
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

		autoIdIncrement();
	};

	const onHandleSubmit = async (e) => {
		// Insert into db
		const res = await insertFont(id, fontName, image, image2, link, isWide);
		console.log(res);
		closeModalAndReset();
		navigate(0);
	};
	return (
		<>
			{addingData && (
				<div className="adding-container-overlay">
					<div className="adding-container" ref={addMenuRef}>
						<form className="content" onSubmit={onHandleSubmit}>
							<button
								onClick={() => handleClose()}
								className="action-button close"
							>
								<IoClose size={28} />
							</button>
							<div className="adding-header">
								<p>Add font</p>
							</div>
							<label className="adding-id">Id</label>
							<input
								type="text"
								name="id"
								defaultValue={id}
								onChange={(e) => onInputChange(setId, e)}
								autoComplete="off"
							/>
							<label className="adding-name">Font name</label>
							<input
								type="text"
								name="name"
								defaultValue={name}
								onChange={(e) => onInputChange(setFontName, e)}
								autoComplete="off"
							/>
							{/* <img src={editingData['image']} alt="" /> */}
							<label className="adding-image">Font image (left)</label>
							<input
								type="text"
								name="image"
								defaultValue={image}
								onChange={(e) => onInputChange(setImage, e)}
								autoComplete="off"
							/>
							{/* <img src={editingData['image2']} alt="" /> */}
							<label className="adding-image2">Font image (right)</label>
							<input
								type="text"
								name="image2"
								defaultValue={image2}
								onChange={(e) => onInputChange(setImage2, e)}
								autoComplete="off"
							/>
							<label className="adding-link">Link</label>
							<input
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
			)}

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
			{/* {isLoading ? (
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
			)} */}
		</>
	);
}

export default DbList;
