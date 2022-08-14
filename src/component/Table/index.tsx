import React, { FC, useState } from 'react';
import { column } from '../../App';
import './table.css';
import EditRowModal from '../EditRowModal';
import axios from 'axios';
import Loader from '../Loader';

const Table: FC<{
	data: rawData[];
	setData: Function;
	columns: columnData[];
	hover: boolean;
	striped: boolean;
	editable: boolean;
}> = ({ data, setData, columns, hover, striped, editable }) => {
	const [showModal, setShowModal] = useState(false);
	const [updateData, setUpdateData] = useState<rawData>();
	const [rowId, setRowID] = useState<string>('');
	const [order, setOrder] = useState<string>('ASC');
	// const newData = data;
	const handleEditShow = (id: any, rowData: any) => setShowModal(true);

	const getCaps = (head: string, field: string) => {
		if (head) return head.toUpperCase();
		return field.toUpperCase();
	};

	const sortHandler = (col: string) => {
		console.log(col);
		if (order === 'ASC') {
			const sorted = [...data].sort((a: any, b: any) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setData(sorted);
			setOrder('DESC');
		}
		if (order === 'DESC') {
			const sorted = [...data].sort((a: any, b: any) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setData(sorted);
			setOrder('ASC');
		}
	};

	// console.log(rowData);
	const handleDelete = (id: string) => {
		const url = `http://localhost:8000/employee/${id}`;
		console.log(id);
		axios
			.delete(url)
			.then((res) => {
				const result = res.data;
				const { status, message } = result;
				// console.log(result);
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
		<div>
			<form>
				<table>
					<thead>
						<tr>
							<th onClick={() => sortHandler(column[0].field)}>
								{getCaps(column[0].field, column[0].header)}
							</th>
							<th onClick={() => sortHandler(column[1].field)}>
								{getCaps(column[1].field, column[1].header)}
							</th>
							<th onClick={() => sortHandler(column[2].field)}>
								{getCaps(column[2].field, column[2].header)}
							</th>
							<th onClick={() => sortHandler(column[3].field)}>
								{getCaps(column[3].field, column[3].header)}
							</th>
							{editable && (
								<th>{getCaps(column[4].field, column[4].header)}</th>
							)}
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item) => (
								<tr
									key={item._id}
									className={`${hover && 'hover'} ${striped && 'striped'}`}
								>
									<td>{item.name}</td>
									<td>{item.gender}</td>
									<td>{item.role}</td>
									<td>{item.country}</td>
									{editable && (
										<td>
											<>
												<button
													className='editBtn'
													onClick={() =>
														handleEditShow(
															setRowID(item._id),
															setUpdateData(item)
														)
													}
													type='button'
												>
													Edit
												</button>
												<button
													className='deleteBtn'
													onClick={() => handleDelete(item._id)}
													type='button'
												>
													Delete
												</button>
											</>
										</td>
									)}
								</tr>
							))}
					</tbody>
				</table>
			</form>
			{data.length === 0 ? (
				<div className='loader-container'>
					{' '}
					<Loader />
				</div>
			) : null}

			{showModal && (
				<div>
					<>
						{console.log(updateData)}
						<EditRowModal
							rowId={rowId}
							formData={updateData}
							onClick={() => setShowModal(false)}
						/>
					</>
				</div>
			)}
		</div>
	);
};

export default Table;
