import React, { useEffect, useState } from 'react';
import { IoRemove, IoAdd, IoClose } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';

import { getFontById, updateFont } from '../utils/fonts';

function DbItem({ id, name }) {
	const [activeId, setActiveId] = useState('');
	const [isEdited, setIsEdited] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);
	const [editingData, setEditingData] = useState('');

	const [fontName, setFontName] = useState('');
	const [image, setImage] = useState('');
	const [image2, setImage2] = useState('');
	const [link, setLink] = useState('');
	const [isWide, setIsWide] = useState('');

	useEffect(() => {
		console.log(editingData);
		setFontName(editingData['name']);
		setImage(editingData['image']);
		setImage2(editingData['image2']);
		setLink(editingData['url']);
		setIsWide(editingData['wide']);
	}, [editingData]);

	const onSubmitHandler = async (e) => {
		e.preventDefault();

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
		setEditingData('');
	};

	const onInputChange = (state, e) => {
		state(e.target.value);
	};

	const onCheckboxChange = (state, e) => {
		const status = e.target.checked === true ? 1 : 0;
		setIsWide(status);
	};

	const handleEdit = async (e) => {
		// Set active id to clicked item
		// console.log(id);
		setActiveId(id);

		// Open edit modal
		setIsEdited(true);

		// Fetch font with that id and put data into form
		const fontId = id;
		const res = await getFontById(fontId);
		const data = res.data;
		setEditingData(data[0]);
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
		setEditingData('');
	};

	const confirmDelete = () => {
		// Remove item from db
		setIsRemoving(false);
	};

	const cancelDelete = () => {
		setIsRemoving(false);
	};
	return (
		<>
			{isRemoving && (
				<div className="removing-container-overlay">
					<div className="removing-container">
						Are you sure you want to remove that item?
						<div className="removing-container-buttons">
							<button onClick={() => confirmDelete()}>Confirm</button>
							<button onClick={() => cancelDelete()}>Cancel</button>
						</div>
					</div>
				</div>
			)}
			{isEdited && (
				<div className="editing-container-overlay">
					<button onClick={() => handleClose()}>
						<IoClose size={32} />
					</button>
					<div className="editing-container">
						<form className="editing-content" onSubmit={onSubmitHandler}>
							<input
								type="text"
								name="name"
								defaultValue={editingData['name']}
								onChange={(e) => onInputChange(setFontName, e)}
							/>
							{/* <img src={editingData['image']} alt="" /> */}
							<input
								type="text"
								name="image"
								defaultValue={editingData['image']}
								onChange={(e) => onInputChange(setImage, e)}
							/>
							{/* <img src={editingData['image2']} alt="" /> */}
							<input
								type="text"
								name="image2"
								defaultValue={editingData['image2']}
								onChange={(e) => onInputChange(setImage2, e)}
							/>
							<input
								type="text"
								name="link"
								defaultValue={editingData['url']}
								onChange={(e) => onInputChange(setLink, e)}
							/>
							<div className="checkbox">
								<input
									type="checkbox"
									name="wide"
									defaultChecked={editingData['wide'] === 1 ? true : false}
									onChange={(e) => onCheckboxChange(setIsWide, e)}
								/>
								<label>Is wide</label>
							</div>

							<input type="submit" value="Submit" />
						</form>
					</div>
				</div>
			)}
			<div className="dbitem">{name}</div>
			<div className="buttons-container">
				<button className="edit" onClick={(e) => handleEdit(e)}>
					<FiEdit size={26} className="editIcon" />
				</button>
				<button className="remove" onClick={(e) => handleRemove(e)}>
					<IoRemove size={26} className="removeIcon" />
				</button>
			</div>
		</>
	);
}

export default DbItem;
