import React, { useEffect, useState, useRef } from 'react';
import { IoRemove, IoAdd, IoClose, IoCheckmarkOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { deleteFontById, getFontById, updateFont } from '../utils/fonts';

import {
	openEditModalAnimation,
	editinputFieldsTimeline,
} from '../utils/Animations';

import '../index.css';
import './DbList.css';

function DbItem({ id, name }) {
	let navigate = useNavigate();
	const editContainerRef = useRef(null);
	const editFormRef = useRef(null);
	const timeline = useRef(null);
	const [activeId, setActiveId] = useState('');
	const [isEdited, setIsEdited] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);

	const [fontName, setFontName] = useState('');
	const [image, setImage] = useState('');
	const [image2, setImage2] = useState('');
	const [link, setLink] = useState('');
	const [isWide, setIsWide] = useState(0);

	const onSubmitHandler = async (e) => {
		// Insert into db
		const res = await updateFont(
			activeId,
			fontName,
			image,
			image2,
			link,
			isWide
		);
		// Close modal
		setActiveId('');
		setIsEdited(false);

		setFontName('');
		setImage('');
		setImage2('');
		setLink('');
		setIsWide('');
	};

	const onInputChange = (state, e) => {
		state(e.target.value);
	};

	const onCheckboxChange = (state, e) => {
		e.preventDefault();
		const status = isWide == 1 ? 0 : 1;
		state(status);
	};

	const handleEdit = async (e) => {
		// Set active id to clicked item
		setActiveId(id);

		// Open edit modal
		setIsEdited(true);

		// Trigger container animation
		const element = editContainerRef.current;
		openEditModalAnimation(element);

		// Fetch font with that id and put data into form
		const fontId = id;
		const res = await getFontById(fontId);
		const data = res.data;
		setFontName(data[0]['name']);
		setImage(data[0]['image']);
		setImage2(data[0]['image2']);
		setLink(data[0]['url']);
		setIsWide(data[0]['wide']);

		// Trigger animation
		editinputFieldsTimeline(editFormRef, timeline);
	};

	const handleRemove = async (e) => {
		setActiveId(id);

		// Open confirm remove modal
		setIsRemoving(true);
	};

	const handleClose = () => {
		// Close modal
		setActiveId('');
		setIsEdited(false);

		setFontName('');
		setImage('');
		setImage2('');
		setLink('');
		setIsWide('');
	};

	const confirmDelete = async () => {
		// Remove item from db
		const fontId = id;
		const res = await deleteFontById(fontId);
		const data = res.data;
		console.log(data);
		// exit delete modal
		setIsRemoving(false);
		// Redirect back to same page to force a refresh
		navigate(0);
	};

	const cancelDelete = () => {
		// exit delete modal
		setIsRemoving(false);
	};
	return (
		<>
			{isRemoving && (
				<div className="removing-container-overlay">
					<div className="removing-content">
						<p>Are you sure you want to remove that item?</p>
						<div className="content-buttons">
							<button
								onClick={() => confirmDelete()}
								className="main-button confirm"
							>
								Confirm
							</button>
							<button onClick={() => cancelDelete()} className="main-button">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			<div
				className={
					isEdited
						? 'editing-container-overlay'
						: 'editing-container-overlay hidden'
				}
			>
				<div
					ref={editContainerRef}
					className={
						isEdited ? 'editing-container' : 'editing-container hidden'
					}
				>
					<form
						className="content"
						onSubmit={onSubmitHandler}
						ref={editFormRef}
					>
						<button
							onClick={() => handleClose()}
							className="action-button close"
						>
							<IoClose size={28} />
						</button>
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
						<div className="checkbox">
							<button
								className={isWide == 1 ? 'button checked' : 'button'}
								onClick={(e) => onCheckboxChange(setIsWide, e)}
							>
								{isWide == 1 ? <IoCheckmarkOutline size={24} /> : ''}
							</button>

							<label>Is wide</label>
						</div>

						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>

			<div className="dbitem">{name}</div>
			<div className="buttons-container">
				<button className="edit action-button" onClick={(e) => handleEdit(e)}>
					<FiEdit size={26} className="editIcon" />
				</button>
				<button
					className="remove action-button"
					onClick={(e) => handleRemove(e)}
				>
					<IoRemove size={26} className="removeIcon" />
				</button>
			</div>
		</>
	);
}

export default DbItem;
