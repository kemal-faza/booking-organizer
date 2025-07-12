'use server';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import React from 'react';
import AddForm from '@/components/dashboard/AddForm';
import EditForm from '@/components/dashboard/EditForm';
import DeleteForm from '@/components/dashboard/DeleteForm';
import { getAllJadwal, getJadwalWithoutHeader } from '@/lib/action';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { teksBahanBooking } from '@/lib/utils';
import CopyButton from '@/components/dashboard/CopyButton';
import BookingButton from '@/components/dashboard/BookingButton';

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
					return (
						<Card key={index}>
							<CardHeader>
								<CardTitle>{jadwal.judul}</CardTitle>
								<CardDescription>
									{jadwal.tanggal_posting} jam{' '}
									{jadwal.jam_posting}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className="w-full">
											Kirim Bahan Postingan
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<div className="p-4 bg-secondary rounded-md">
											<div className="flex justify-center items-center">
												<CopyButton jadwal={jadwal} />
											</div>
											<Separator className="my-3" />
											<p className="text-sm">
												{teksBahanBooking(jadwal)}
											</p>
										</div>
									</PopoverContent>
								</Popover>
							</CardContent>
							<CardFooter className="flex flex-col gap-2.5">
								<EditForm jadwal={jadwal} />
								<DeleteForm jadwal={jadwal} />
							</CardFooter>
						</Card>
					);
				})}
			</div>
			<BookingButton />
		</div>
	);
}
