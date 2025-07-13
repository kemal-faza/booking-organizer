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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

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
											Kirim Bahan Post
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<Tabs defaultValue="account">
											<TabsList>
												<TabsTrigger value="account">
													Postingan
												</TabsTrigger>
												<TabsTrigger value="password">
													Story
												</TabsTrigger>
											</TabsList>
											<TabsContent value="account">
												<Card>
													<CardHeader>
														<CardTitle>
															Postingan
														</CardTitle>
													</CardHeader>
													<CardContent className="grid gap-6">
														<div className="p-4 bg-secondary rounded-md">
															<div className="flex justify-center items-center">
																<CopyButton
																	teks={teksBahanBooking(
																		jadwal,
																		'postingan',
																	)}
																/>
															</div>
															<Separator className="my-3" />
															<p className="text-sm">
																{teksBahanBooking(
																	jadwal,
																	'postingan',
																)}
															</p>
														</div>
													</CardContent>
												</Card>
											</TabsContent>
											<TabsContent value="password">
												<Card>
													<CardHeader>
														<CardTitle>
															Story
														</CardTitle>
													</CardHeader>
													<CardContent className="grid gap-6">
														<div className="p-4 bg-secondary rounded-md">
															<div className="flex justify-center items-center">
																<CopyButton
																	teks={teksBahanBooking(
																		jadwal,
																		'story',
																	)}
																/>
															</div>
															<Separator className="my-3" />
															<p className="text-sm">
																{teksBahanBooking(
																	jadwal,
																	'story',
																)}
															</p>
														</div>
													</CardContent>
												</Card>
											</TabsContent>
										</Tabs>
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
