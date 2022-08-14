import React, { FC, Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './editRowModal.css';

const Backdrop: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <div className='backdrop' onClick={onClick} />;
};

const ModalOverlay: FC<{
	formData?: rawData;
	rowId?: string;
}> = ({ formData, rowId }) => {
	const [addFormData, setAddFormData] = useState<{
		name?: string;
		gender?: string;
		role?: string;
		country?: string;
	}>({
		name: formData && formData.name,
		gender: formData && formData.gender,
		role: formData && formData.role,
		country: formData && formData.country,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(addFormData);
		const url = `http://localhost:8000/employee/${rowId}`;
		axios
			.put(url, addFormData)
			.then((res) => {
				// console.log(res);
				const result = res.data;
				const { status, message } = result;
				if (status !== 'SUCCESS') {
					alert(message);
				} else {
					alert(message);
					window.location.reload();
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className='modal'>
			<div className='modal-element'>
				<label htmlFor='fullName'>Name</label>
				<input
					type='text'
					required
					name='name'
					onChange={(e) =>
						setAddFormData({ ...addFormData, name: e.target.value })
					}
					placeholder='Enter your name'
					defaultValue={formData && formData.name}
				/>
			</div>
			<div className='modal-element'>
				<label htmlFor='gender'>Gender</label>
				<input
					type='text'
					required
					placeholder='Enter your gender'
					name='gender'
					onChange={(e) =>
						setAddFormData({ ...addFormData, gender: e.target.value })
					}
					defaultValue={formData && formData.gender}
				/>
			</div>
			<div className='modal-element'>
				<label htmlFor='role'>Role</label>
				<input
					type='text'
					required
					placeholder='Enter your role'
					name='role'
					onChange={(e) =>
						setAddFormData({ ...addFormData, role: e.target.value })
					}
					defaultValue={formData && formData.role}
				/>
			</div>
			<div className='modal-element'>
				<label htmlFor='country'>Country</label>
				<input
					type='text'
					required
					placeholder='Enter your country'
					name='country'
					onChange={(e) =>
						setAddFormData({ ...addFormData, country: e.target.value })
					}
					defaultValue={formData && formData.country}
				/>
			</div>
			<div>
				<button onClick={handleSubmit} type='submit'>
					Edit Row
				</button>
			</div>
		</div>
	);
};

const EditRowModal: FC<{
	onClick: () => void;
	formData?: rawData;
	rowId?: string;
}> = ({ onClick, formData, rowId }) => {
	const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;
	const overlayRoot = document.getElementById('backdrop-root') as HTMLElement;
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClick={onClick} />, backdropRoot)}
			{ReactDOM.createPortal(
				<ModalOverlay formData={formData} rowId={rowId} />,
				overlayRoot
			)}
		</Fragment>
	);
};

export default EditRowModal;
