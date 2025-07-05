'use server';
import { Button, buttonVariants } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import AddForm from '@/components/dashboard/AddForm';
import EditForm from '@/components/dashboard/EditForm';
import DeleteForm from '@/components/dashboard/DeleteForm';
import { DateTime } from 'luxon';
import { getAllJadwal, getJadwalWithoutHeader } from '@/lib/action';

export default async function Home() {
	const allJadwal = await getJadwalWithoutHeader(await getAllJadwal());
	return (
		<div className="p-4">
			<div className="flex justify-between">
				<Button
					variant={'destructive'}
					size={'sm'}>
					Logout
				</Button>
				<AddForm />
			</div>
			<div className="flex flex-col gap-5 mt-5">
				{allJadwal.map((jadwal, index) => {
					const tanggal_posting = DateTime.fromJSDate(
						new Date(jadwal.tanggal_posting),
					);
					return (
						<Card key={index}>
							<CardHeader>
								<CardTitle>{jadwal.judul}</CardTitle>
								<CardDescription>
									{tanggal_posting.toLocaleString(
										DateTime.DATE_MED,
									)}{' '}
									jam {jadwal.jam_posting}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Link
									href={jadwal.link_gdrive || ''}
									target="_blank"
									className={buttonVariants({
										variant: 'outline',
										className: 'w-full',
									})}>
									<ExternalLink />
									Google Drive
								</Link>
							</CardContent>
							<CardFooter className="flex flex-col gap-2.5">
								<EditForm jadwal={jadwal} />
								<DeleteForm jadwal={jadwal} />
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
