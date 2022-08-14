/// <reference types="react-scripts" />
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

interface UsePaginationProps {
	contentPerPage: number;
	count: number;
}
interface columnData {
	field: string;
	header: string;
}
interface rawData {
	_id: string;
	name: string;
	gender: string;
	role: string;
	country: string;
	__v: number;
}
