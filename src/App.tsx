import './App.css';
import Table from './component/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import usePagination from './hook/usePagination';
import Pagination from './component/Pagination';

export const column: columnData[] = [
	{ field: 'name', header: 'Name' },
	{ field: 'gender', header: 'Gender' },
	{ field: 'role', header: 'Role' },
	{ field: 'country', header: 'Country' },
	{ field: 'action', header: 'Action' },
];

function App() {
	const [data, setData] = useState<rawData[]>([]);
	const fetchData = () => {
		const url = 'http://localhost:8000/employee';
		axios
			.get(url)
			.then((res) => {
				// console.log(res);
				const result = res.data;
				const { status, message, data } = result;

				if (status === 'SUCCESS') {
					setTimeout(() => setData(data), 5000);

					console.log(data);
				} else {
					alert(message);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const {
		firstContentIndex,
		lastContentIndex,
		nextPage,
		prevPage,
		page,
		setPage,
		totalPages,
	} = usePagination({
		contentPerPage: 5,
		count: data.length,
	});

	const paginatedData = data.slice(firstContentIndex, lastContentIndex);
	return (
		<div className='App'>
			<h1>Re-Useable React Data Grid</h1>
			<Table
				data={paginatedData}
				setData={setData}
				columns={column}
				hover
				striped
				editable={true}
			/>
			<Pagination
				totalPages={totalPages}
				setPage={setPage}
				page={page}
				nextPage={nextPage}
				prevPage={prevPage}
			/>
		</div>
	);
}

export default App;
