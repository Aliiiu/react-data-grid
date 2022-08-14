import React, { FC, ReactNode } from 'react';

export interface tableArray {
	id?: number;
	name?: string;
	role?: string;
	gender?: string;
	country?: string;
	action?: React.ReactNode;
}

export const tableData: tableArray[] = [
	{
		id: 1,
		name: 'Kim Parrish',
		role: 'Backend Developer',
		gender: 'Female',
		country: 'Kenya',
	},
	{
		id: 2,
		name: 'Michele Castillo',
		role: 'Frontend Developer',
		gender: 'Male',
		country: 'Kenya',
	},
	{
		id: 3,
		name: 'Eric Ferris',
		role: 'Frontend Developer',
		gender: 'Male',
		country: 'Kenya',
	},
	{
		id: 4,
		name: 'Gloria Noble',
		role: 'Devops Engineer',
		gender: 'Male',
		country: 'Kenya',
	},
	{
		id: 5,
		name: 'Darren Daniels',
		role: 'Data Engineer',
		gender: 'Male',
		country: 'Kenya',
	},
	{
		id: 6,
		name: 'Ted McDonald',
		role: 'Backend Developer',
		gender: 'Male',
		country: 'Scotland',
	},
];
