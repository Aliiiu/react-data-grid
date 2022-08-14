import React, { FC, Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Backdrop: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <div className='backdrop' onClick={onClick} />;
};

const ModalOverlay: FC<{}> = () => {
	const [addFormData, setAddFormData] = useState<{
		name?: string;
		gender?: string;
		role?: string;
		country?: string;
	}>({
		name: '',
		gender: '',
		role: '',
		country: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(addFormData);
		// const url = `http://localhost:8000/employee`;
		const url = `https://data-grid-api-2.herokuapp.com/employee`;
		axios
			.post(url, { ...addFormData })
			.then((res) => {
				console.log(res);
				const result = res.data;
				if (result.success !== true) {
					alert(result.error.message);
				} else {
					alert(result.message);
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
				/>
			</div>
			<div>
				<button className='editBtn' onClick={handleSubmit} type='submit'>
					Add New Employee
				</button>
			</div>
		</div>
	);
};

const CreateEmployeeModal: FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;
	const overlayRoot = document.getElementById('backdrop-root') as HTMLElement;
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClick={onClick} />, backdropRoot)}
			{ReactDOM.createPortal(<ModalOverlay />, overlayRoot)}
		</Fragment>
	);
};

export default CreateEmployeeModal;
