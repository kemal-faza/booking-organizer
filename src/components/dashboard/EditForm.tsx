'use client';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '../ui/button';
import { ChevronDownIcon, Edit } from 'lucide-react';
import { useState } from 'react';

export default function EditForm() {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	return (
		<Dialog>
			<form className="w-full">
				<DialogTrigger asChild>
					<Button
						variant={'secondary'}
						className="w-full">
						<Edit /> Edit
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Tambah Jadwal Postingan</DialogTitle>
						<DialogDescription>
							Tambahkan judul dan waktu posting
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="title">Judul Postingan</Label>
							<Input
								id="title"
								name="title"
								placeholder="Judul Postingan"
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="waktu_posting">Waktu Posting</Label>
							<Popover
								open={open}
								onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										id="waktu_posting"
										className="w-full justify-between font-normal">
										{date
											? date.toLocaleDateString()
											: 'Select date'}
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start">
									<Calendar
										mode="single"
										selected={date}
										captionLayout="dropdown"
										onSelect={(date) => {
											setDate(date);
											setOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Batal</Button>
						</DialogClose>
						<Button type="submit">Tambahkan</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
