'use client';
import { teksBooking } from '@/lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CopyButton from './CopyButton';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { JadwalBooking } from '@/lib/types';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

export default function BookingButton({
	allJadwal = [],
}: {
	allJadwal: JadwalBooking[];
}) {
	const [selectedJadwal, setSelectedJadwal] = useState<JadwalBooking[]>([]);
	const [keyword, setKeyword] = useState<string>('');
	allJadwal = allJadwal.filter((jadwal) => jadwal.keyword.match(keyword));

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Booking</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Booking Postingan/Story</DialogTitle>
					</DialogHeader>
					<div className="flex w-full max-w-sm flex-col gap-4 mt-3">
						<Input
							type="search"
							placeholder="Cari judul"
							onChange={(e) => setKeyword(e.target.value)}
							value={keyword}
						/>
						<ScrollArea className="h-32">
							<div className="flex flex-col gap-3 ">
								{allJadwal.map((jadwal, index) => (
									<Label
										className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
										key={index}>
										<Checkbox
											id="toggle-2"
											onClick={() => {
												if (
													selectedJadwal.find(
														(item: JadwalBooking) =>
															item.id ==
															jadwal.id,
													)
												) {
													setSelectedJadwal(
														selectedJadwal.filter(
															(
																item: JadwalBooking,
															) =>
																item.id !=
																jadwal.id,
														),
													);
												} else {
													setSelectedJadwal([
														...selectedJadwal,
														jadwal,
													]);
												}
											}}
											className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												{jadwal.judul}
											</p>
											<p className="text-muted-foreground text-sm">
												{jadwal.tanggal_posting} jam{' '}
												{jadwal.jam_posting}
											</p>
										</div>
									</Label>
								))}
							</div>
						</ScrollArea>
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
										<CardTitle>Postingan</CardTitle>
									</CardHeader>
									<CardContent className="grid gap-6">
										<div className="p-4 bg-secondary rounded-md">
											<div className="flex justify-center items-center">
												<CopyButton
													teks={teksBooking(
														selectedJadwal,
														'postingan',
													)}
												/>
											</div>
											<Separator className="my-3" />
											<p className="text-sm">
												{teksBooking(
													selectedJadwal,
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
										<CardTitle>Story</CardTitle>
									</CardHeader>
									<CardContent className="grid gap-6">
										<div className="p-4 bg-secondary rounded-md">
											<div className="flex justify-center items-center">
												<CopyButton
													teks={teksBooking(
														selectedJadwal,
														'story',
													)}
												/>
											</div>
											<Separator className="my-3" />
											<p className="text-sm">
												{teksBooking(
													selectedJadwal,
													'story',
												)}
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
