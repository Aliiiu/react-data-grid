import './App.css';
import Table from './component/Table';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import usePagination from './hook/usePagination';
import Pagination from './component/Pagination';
import NewPagination from './component/Pagination/newPagination';

export const column: columnData[] = [
	{ field: 'name', header: 'Name' },
	{ field: 'gender', header: 'Gender' },
	{ field: 'role', header: 'Role' },
	{ field: 'country', header: 'Country' },
	{ field: 'action', header: 'Action' },
];

let PageSize = 10;

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

	// const {
	// 	firstContentIndex,
	// 	lastContentIndex,
	// 	nextPage,
	// 	prevPage,
	// 	page,
	// 	setPage,
	// 	totalPages,
	// } = usePagination({
	// 	contentPerPage: 10,
	// 	count: data.length,
	// });

	const firstPageIndex = (currentPage - 1) * PageSize;
	const lastPageIndex = firstPageIndex + PageSize;
	const paginatedData = data.slice(firstPageIndex, lastPageIndex);

	return (
		<div className='App'>
			<h1>Re-Useable React Data Grid</h1>
			{data.length > 0 && (
				<Table
					data={paginatedData}
					setData={setData}
					columns={column}
					hover
					striped
					editable={true}
				/>
			)}

			{/* <Pagination
				totalPages={totalPages}
				setPage={setPage}
				page={page}
				nextPage={nextPage}
				prevPage={prevPage}
			/> */}
			<NewPagination
				className='pagination-bar'
				currentPage={currentPage}
				totalCount={data.length}
				pageSize={PageSize}
				onPageChange={(page: number) => setCurrentPage(page)}
			/>
		</div>
	);
}

export default App;
