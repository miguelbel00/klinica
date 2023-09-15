'use client';
import { Container, Grid } from '@mui/material';
import { useAuth } from '@/contexts/Auth.context';
import { useEffect, useState } from 'react';
import { getSpecialty } from '@/lib/getSpecialty';
import UneditableInfo from './inputs/UneditableInfo';
import SpecialtyInput from './inputs/SpecialtyInput';
import ProfesionalIdInput from './inputs/ProfesionalIdInput';
import NationalidInput from './inputs/NationalidInput';
import PhoneInput from './inputs/PhoneInput';
import ResumeInput from './inputs/ResumeInput';
import SocialNetworksInput from './inputs/SocialNetworksInput';

function Details({
	editResume,
	setEditResume,
	resume,
	setResume,
	editProfessionalid,
	phone,
	editPhone,
	setPhone,
	setEditPhone,
	setEditProfessionalid,
	professionalid,
	setProfessionalid,
	editNationalId,
	setEditNationalId,
	nationalId,
	setNationalId,
	editSocialNetwork,
	setEditSocialNetwork,
	socialNetwork,
	setSocialNetwork,
	speciality,
	setSpeciality,
}) {
	const [specialtiesList, setSpecialtiesList] = useState([]);
	const { userData, token, getUserData } = useAuth();
	const fetchSpecialties = async () => {
		const data = await getSpecialty();
		setSpecialtiesList(data.data.specialties);
	};

	useEffect(() => {
		fetchSpecialties();
	}, []);

	const handleAddSpecialty = async e => {
		if (e.target.value === '') return;
		const findSpecialtyById = specialtiesList.find(specialty =>
			specialty.name.includes(e.target.value),
		);
		console.log('especialidad buscada', findSpecialtyById);

		try {
			const newSpecialty = {
				specialtyId: findSpecialtyById.id,
				medicId: userData.id,
			};
			console.log(newSpecialty);

			const response = await fetch(`http://localhost:3005/api/v1/medic/addspecialty`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `bearer ${token}`,
				},
				body: JSON.stringify(newSpecialty),
			});

			if (response.error) {
				throw new Error(response.error);
			}

			const data = await response.json();
			console.log(data);

			await getUserData(token, userData, 'medic');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container sx={{ paddingY: 4 }}>
			{userData && (
				<Grid container spacing={2}>
					<UneditableInfo userData={userData} />
					<SpecialtyInput
						specialties={specialtiesList}
						setSpeciality={setSpeciality}
						speciality={speciality}
						handleAddSpecialty={handleAddSpecialty}
					/>
					<ProfesionalIdInput
						professionalid={professionalid}
						editProfessionalid={editProfessionalid}
						handleAddSpecialty={handleAddSpecialty}
						setEditProfessionalid={setEditProfessionalid}
					/>
					<NationalidInput
						nationalId={nationalId}
						setNationalId={setNationalId}
						editNationalId={editNationalId}
						setEditNationalId={setEditNationalId}
					/>
					<SocialNetworksInput
						socialNetwork={socialNetwork}
						setSocialNetwork={setSocialNetwork}
						editSocialNetwork={editSocialNetwork}
						setEditSocialNetwork={setEditSocialNetwork}
					/>
					<PhoneInput
						phone={phone}
						editPhone={editPhone}
						setPhone={setPhone}
						setEditPhone={setEditPhone}
					/>
					<ResumeInput
						resume={resume}
						setResume={setResume}
						editResume={editResume}
						setEditResume={setEditResume}
					/>
				</Grid>
			)}
		</Container>
	);
}

export default Details;
