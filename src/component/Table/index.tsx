import React, { FC, useState } from 'react';
import { column } from '../../App';
import './table.css';
import EditRowModal from '../EditRowModal';
import axios from 'axios';
import CreateEmployeeModal from '../CreateEmployeeModal';

const Table: FC<{
	data: Data[];
	setData: Function;
	columns: columnData[];
	hover: boolean;
	striped: boolean;
	editable: boolean;
}> = ({ data, setData, columns, hover, striped, editable }) => {
	const [showModal, setShowModal] = useState(false);
	const [showPostModal, setShowPostModal] = useState(false);
	const [selectedData, setSelectedData] = useState<Data>();
	const [sortedData, setSortedData] = useState<Data[]>(() => data);
	const [rowId, setRowID] = useState<string>('');
	const [order, setOrder] = useState<string>('ASC');
	const handleEditShow = (id: any, rowData: any) => setShowModal(true);

	const getCaps = (head: string, field: string) => {
		if (head) return head.toUpperCase();
		return field.toUpperCase();
	};

	const sortHandler = (col: string) => {
		if (order === 'ASC') {
			const sorted = [...data].sort((a: any, b: any) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setSortedData(sorted);
			setOrder('DESC');
			return sorted;
		}
		if (order === 'DESC') {
			const sorted = [...data].sort((a: any, b: any) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setSortedData(sorted);
			setOrder('ASC');
			return sorted;
		}

		return [];
	};

	const handleDelete = (id: string) => {
		const url = `https://data-grid-api-2.herokuapp.com/employee/${id}`;
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
			<div>
				<button onClick={() => setShowPostModal(true)} className='addBtn'>
					Add New Employee
				</button>
			</div>
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
						{sortedData.map((item) => (
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
														setSelectedData(item)
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
			{showPostModal && (
				<CreateEmployeeModal onClick={() => setShowPostModal(false)} />
			)}
			{/* {data.length === 0 ? (
				<div className='loader-container'>
					{' '}
					<Loader />
				</div>
			) : null} */}
			{showModal && (
				<div>
					<>
						{console.log(selectedData)}
						<EditRowModal
							rowId={rowId}
							formData={selectedData}
							onClick={() => setShowModal(false)}
						/>
					</>
				</div>
			)}
		</div>
	);
};

export default Table;
