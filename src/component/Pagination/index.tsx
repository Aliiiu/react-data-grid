import './pagination.css';

interface Props {
	totalPages: number;
	page: number;
	setPage: (p: number) => void;
	nextPage: () => void;
	prevPage: () => void;
}

const Pagination = ({
	totalPages,
	page,
	setPage,
	nextPage,
	prevPage,
}: Props) => {
	return (
		<>
			<div className='pagination-container'>
				<div className='pagination'>
					<button
						onClick={prevPage}
						className={`navButton ${page === 1 && 'disabled'}`}
					>
						&larr; Previous
					</button>
					<div className='page-container'>
						{/* @ts-ignore */}
						{[...Array(totalPages).keys()].map((el: any) => (
							<button
								onClick={() => setPage(el + 1)}
								key={el}
								className={`page ${page === el + 1 ? 'active' : ''}`}
							>
								{el + 1}
							</button>
						))}
					</div>
					<button
						onClick={nextPage}
						className={`navButton ${page === totalPages && 'disabled'}`}
					>
						Next &rarr;
					</button>
				</div>
			</div>
		</>
	);
};

export default Pagination;
