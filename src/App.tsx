import './App.css';
import Table from './component/Table';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Pagination from './component/Pagination/';
import Loader from './component/Loader';

export const column: columnData[] = [
	{ field: 'name', header: 'Name' },
	{ field: 'gender', header: 'Gender' },
	{ field: 'role', header: 'Role' },
	{ field: 'country', header: 'Country' },
	{ field: 'action', header: 'Action' },
];

let PAGE_SIZE = 10;

function App() {
	const [data, setData] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const fetchData = () => {
		const url = 'https://data-grid-api-2.herokuapp.com/employee';
		axios
			.get(url)
			.then((res) => {
				// console.log(res);
				const result = res.data;
				const { status, message, data } = result;

				if (status === 'SUCCESS') {
					setData(data);
				} else {
					alert(message);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
	const lastPageIndex = firstPageIndex + PAGE_SIZE;
	const paginatedData = useMemo(
		() => data.slice(firstPageIndex, lastPageIndex),
		[firstPageIndex, lastPageIndex, data]
	);

	console.log(firstPageIndex, lastPageIndex, paginatedData);

	return (
		<div className='App'>
			<h1>Re-Useable React Data Grid</h1>
			{paginatedData.length > 0 ? (
				<Table
					data={paginatedData}
					setData={setData}
					columns={column}
					hover
					striped
					editable={true}
					key={firstPageIndex + lastPageIndex}
				/>
			) : (
				<div className='loader-container'>
					{' '}
					<Loader />
				</div>
			)}
			<Pagination
				className='pagination-bar'
				currentPage={currentPage}
				totalCount={data.length}
				pageSize={PAGE_SIZE}
				onPageChange={(page: number) => setCurrentPage(page)}
			/>
		</div>
	);
}

export default App;
