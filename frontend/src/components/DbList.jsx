import React, { useState, useEffect, useRef } from 'react';
import DbItem from './DbItem';
import { IoRemove, IoAdd, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import { getFonts, insertFont } from '../utils/fonts';

import Spinner from './Spinner';

import { Formik } from 'formik';
import * as Yup from 'yup';

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
	const [idVal, setIdVal] = useState(1);

	const [insertError, setInsertError] = useState('');

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
	};

	useEffect(() => {
		getData();
		dbListHeaderAnimation(forwardedRef);
	}, []);

	// Item animation

	useEffect(() => {
		dbListAnimation();
	}, [data]);

	const handleClose = () => {
		closeModalAndReset();
	};

	const autoIdIncrement = () => {
		if (data) {
			let curId = data.length + 1;
			setIdVal(curId);
		} else {
			setIdVal(1);
		}
	};

	const handleAdd = async () => {
		setAddingData(true);
		const element = forwardedRef.current;
		openAddModalAnimation(element);
		flyInAddHeader(element);
		inputFieldsTimeline(addFormRef, timeline);
		autoIdIncrement();
	};

	const onHandleSubmit = async (values, formikActions) => {
		formikActions.setSubmitting(false);
		// Insert into db
		const res = await insertFont(values);
		if (!res.success) {
			setInsertError(res.data);
			formikActions.resetForm();
		} else {
			setInsertError();
			formikActions.resetForm();
			navigate(0);
		}
	};

	const initialValuse = {
		id: idVal,
		name: '',
		image: '',
		image2: '',
		link: '',
	};

	const validationSchema = Yup.object({
		id: Yup.number().required().positive().integer().required('Required'),
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
					<Formik
						initialValues={initialValuse}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={onHandleSubmit}
					>
						{(formik) => (
							<form
								className="content"
								onSubmit={formik.handleSubmit}
								ref={addFormRef}
							>
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

								{insertError ? (
									<div className="error">{insertError}</div>
								) : null}
								<label className="id">Id</label>
								<input
									className="input-id"
									type="text"
									name="id"
									autoComplete="off"
									{...formik.getFieldProps('id')}
								/>
								{formik.touched.id && formik.errors.id ? (
									<div className="error">{formik.errors.id}</div>
								) : null}

								<label className="name">Font name</label>
								<input
									className="input-name"
									type="text"
									name="name"
									autoComplete="off"
									{...formik.getFieldProps('name')}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className="error">{formik.errors.name}</div>
								) : null}
								<label className="image">Font image (left)</label>
								<input
									className="input-image"
									type="text"
									name="image"
									autoComplete="off"
									{...formik.getFieldProps('image')}
								/>
								{formik.touched.image && formik.errors.image ? (
									<div className="error">{formik.errors.image}</div>
								) : null}
								<label className="image2">Font image (right)</label>
								<input
									className="input-image2"
									type="text"
									name="image2"
									autoComplete="off"
									{...formik.getFieldProps('image2')}
								/>
								{formik.touched.image2 && formik.errors.image2 ? (
									<div className="error">{formik.errors.image2}</div>
								) : null}
								<label className="link">Link</label>
								<input
									className="input-link"
									type="text"
									name="link"
									autoComplete="off"
									{...formik.getFieldProps('link')}
								/>
								{formik.touched.link && formik.errors.link ? (
									<div className="error">{formik.errors.link}</div>
								) : null}

								<input type="submit" value="Submit" />
							</form>
						)}
					</Formik>
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
