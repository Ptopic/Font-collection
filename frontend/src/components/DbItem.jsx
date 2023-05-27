import React, { useEffect, useState, useRef } from 'react';
import { IoRemove, IoAdd, IoClose, IoCheckmarkOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { deleteFontById, getFontById, updateFont } from '../utils/fonts';

import { Formik } from 'formik';
import * as Yup from 'yup';

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

	const onCheckboxChange = (state, e) => {
		e.preventDefault();
		const status = isWide == 1 ? 0 : 1;
		console.log(status);
		state(status);
	};

	const handleEdit = async (e) => {
		// Fetch font with that id and put data into form
		const fontId = id;
		const res = await getFontById(fontId);
		const data = res.data;
		setFontName(data[0]['name']);
		setImage(data[0]['image']);
		setImage2(data[0]['image2']);
		setLink(data[0]['url']);
		setIsWide(data[0]['wide']);

		// Set active id to clicked item
		setActiveId(id);

		// Open edit modal
		setIsEdited(true);

		// Trigger container animation
		const element = editContainerRef.current;
		openEditModalAnimation(element);

		// Trigger animation
		editinputFieldsTimeline(editFormRef, timeline);
	};

	const handleRemove = async (e) => {
		setActiveId(id);

		// Open confirm remove modal
		setIsRemoving(true);
	};

	const handleClose = (e) => {
		e.preventDefault();
		// Close modal
		setIsEdited(false);
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

	const onSubmitHandler = async (values, formikActions) => {
		formikActions.setSubmitting(false);
		// Insert into db
		console.log(isWide);
		const res = await updateFont(values, activeId, isWide);
		console.log(res);

		// Close modal
		if (!res.success) {
			formikActions.resetForm();
		} else {
			formikActions.resetForm();
			setIsEdited(false);
			navigate(0);
		}
	};

	const initialValuse = {
		name: fontName.toString(),
		image: image.toString(),
		image2: image2.toString(),
		link: link.toString(),
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.required('Required')
			.typeError('Id must be a number'),
		image: Yup.string().url().nullable().required('Required'),
		image2: Yup.string().url().nullable().required('Required'),
		link: Yup.string().url().nullable().required('Required'),
	});
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
					<Formik
						initialValues={initialValuse}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={onSubmitHandler}
					>
						{(formik) => (
							<form
								className="content"
								onSubmit={formik.handleSubmit}
								ref={editFormRef}
							>
								<button
									onClick={(e) => handleClose(e)}
									className="action-button close"
								>
									<IoClose size={28} />
								</button>
								<label className="name">Font name</label>
								<input
									className="input-name"
									type="text"
									name="name"
									{...formik.getFieldProps('name')}
									autoComplete="off"
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className="error">{formik.errors.name}</div>
								) : null}
								<label className="image">Font image (left)</label>
								<input
									className="input-image"
									type="text"
									name="image"
									{...formik.getFieldProps('image')}
									autoComplete="off"
								/>
								{formik.touched.image && formik.errors.image ? (
									<div className="error">{formik.errors.image}</div>
								) : null}
								<label className="image2">Font image (right)</label>
								<input
									className="input-image2"
									type="text"
									name="image2"
									{...formik.getFieldProps('image2')}
									autoComplete="off"
								/>
								{formik.touched.image2 && formik.errors.image2 ? (
									<div className="error">{formik.errors.image2}</div>
								) : null}
								<label className="link">Link</label>
								<input
									className="input-link"
									type="text"
									name="link"
									{...formik.getFieldProps('link')}
									autoComplete="off"
								/>
								{formik.touched.link && formik.errors.link ? (
									<div className="error">{formik.errors.link}</div>
								) : null}

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
						)}
					</Formik>
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
