/// <reference types="react-scripts" />
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

interface UsePaginationProps {
	totalCount: number;
	pageSize: number;
	siblingCount: number;
	currentPage: number;
}
interface columnData {
	field: string;
	header: string;
}
interface PaginationProps {
	onPageChange: Function;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className: string;
}
interface Data {
	_id: string;
	name: string;
	gender: string;
	role: string;
	country: string;
	__v: number;
}
