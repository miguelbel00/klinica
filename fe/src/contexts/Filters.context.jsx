'use client';
import React, { useState, useEffect } from 'react';
import { getAllDoctors } from '@/lib/getAllDoctors';
import { useAuth } from './Auth.context';


const { createContext, useContext } = require('react');
export const FilterContext = createContext(null);

export const useFilterContext = () => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error('useFilterContext must be used within a FilterProvider');
	}
	return context;
};

export const FilterProvider = ({ children }) => {
	const [allDoctors, setAllDoctors] = useState([]);
	const [filteredDoctor, setFilteredDoctor] = useState([]);
	const [filterByName, setFilterByName] = useState('');
	const [filterBySpecialty, setFilterBySpecialty] = useState('');
	const [filterByCountry, setFilterByCountry] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const {token} = useAuth();

	const fetchData = async () => {
		try {
			const data = await getAllDoctors();
			setAllDoctors(data.data.medic);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {

		if (token) {

			fetchData();

		}

	}, [token]);

	useEffect(() => {
		setFilteredDoctor(allDoctors);
		setIsLoading(false);
	}, [allDoctors]);

	useEffect(() => {
		handleFilters();
	}, [filterByName, filterBySpecialty, filterByCountry]);

	const handleFilters = () => {
		const filtered = allDoctors.filter(doctor => {
			return (
				doctor.fullname.toLowerCase().includes(filterByName.toLowerCase()) &&
				doctor.specialties[0]?.name.toLowerCase().includes(filterBySpecialty.toLowerCase()) &&
				doctor.country.toLowerCase().includes(filterByCountry.toLowerCase())
			);
		});
		setFilteredDoctor(filtered);
	};

	return (
		<FilterContext.Provider
			value={{
				filteredDoctor,
				allDoctors,
				filterByCountry,
				setFilterByCountry,
				setFilterByName,
				filterBySpecialty,
				setFilterBySpecialty,
				isLoading,
				fetchData,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
