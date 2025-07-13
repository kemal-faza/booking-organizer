'use server';
import React from 'react';
import AddForm from '@/components/dashboard/AddForm';
import { getAllJadwal, getJadwalWithoutHeader } from '@/lib/action';
import BookingButton from '@/components/dashboard/BookingButton';
import JadwalCards from '@/components/dashboard/JadwalCards';

export default async function Home() {
	const allJadwal = await getJadwalWithoutHeader(await getAllJadwal());

	return (
		<div className="p-4 w-full sm:w-sm md:w-md lg:w-lg">
			<div className="flex justify-between">
				<BookingButton allJadwal={allJadwal} />
				<AddForm />
			</div>
			<JadwalCards allJadwal={allJadwal} />
		</div>
	);
}
