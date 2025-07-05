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
import { ChevronDownIcon, Plus } from 'lucide-react';
import { useActionState, useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { jam_posting } from '@/lib/data';
import { oldFormValue, showErrorMessage } from '@/lib/utils';
import { handleFormAddJadwal } from '@/lib/action';

export default function AddForm() {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [state, formAction, isPending] = useActionState(
		handleFormAddJadwal,
		null,
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus /> Tambah
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Jadwal Postingan</DialogTitle>
					<DialogDescription>
						Tambahkan judul, tanggal posting, dan jam posting
					</DialogDescription>
				</DialogHeader>
				<form
					action={formAction}
					className="flex flex-col gap-5">
					<input
						type="hidden"
						name="tanggal_posting"
						value={date?.toDateString() || ''}
					/>
					<div className="grid gap-4">
						<div>
							<Label htmlFor="judul">Judul Postingan</Label>
							<Input
								id="judul"
								name="judul"
								className="mt-3 mb-2"
								defaultValue={oldFormValue(state?.data?.judul)}
								placeholder="Judul Postingan"
							/>
							{showErrorMessage(state?.errors?.fieldErrors.judul)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="tanggal_posting">
								Tanggal Posting
							</Label>
							<Popover
								open={open}
								onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										id="tanggal_posting"
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
							{showErrorMessage(
								state?.errors?.fieldErrors.tanggal_posting,
							)}
						</div>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="jam_posting">Jam Posting</Label>
						<Select name="jam_posting">
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Pilih jam posting" />
							</SelectTrigger>
							<SelectContent>
								{jam_posting.map((jam, index) => (
									<SelectItem
										key={index}
										defaultChecked={
											state?.errors &&
											oldFormValue(
												state?.data.jam_posting,
											) == jam
										}
										value={jam}>
										{jam} WIB
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{showErrorMessage(
							state?.errors?.fieldErrors.jam_posting,
						)}
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Batal</Button>
						</DialogClose>
						<Button
							type="submit"
							disabled={isPending}>
							Tambahkan
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
