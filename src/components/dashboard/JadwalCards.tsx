'use client';
import { JadwalBooking } from '@/lib/types';
import { useState } from 'react';
import { Input } from '../ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import CopyButton from './CopyButton';
import { teksBahanBooking } from '@/lib/utils';
import { Separator } from '../ui/separator';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

export default function JadwalCards({
	allJadwal,
}: {
	allJadwal: JadwalBooking[];
}) {
	const [keyword, setKeyword] = useState<string>('');
	const resultSearch = allJadwal.filter((jadwal) =>
		jadwal.keyword.match(keyword),
	);

	return (
		<div className="mt-4">
			<Input
				type="search"
				placeholder="Cari judul"
				autoFocus
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
			/>
			<div className="flex flex-col gap-5 mt-5">
				{resultSearch.map((jadwal, index) => {
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
												<CopyButton
													teks={teksBahanBooking(
														jadwal,
													)}
												/>
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
		</div>
	);
}
