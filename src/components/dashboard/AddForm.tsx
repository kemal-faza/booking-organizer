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
import { Button, buttonVariants } from '../ui/button';
import { ChevronDownIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { jam_posting } from '@/lib/data';
import { ErrorMessage, jadwalPostingSchema } from '@/lib/utils';
import { handleFormAddJadwal } from '@/lib/action';
import { useForm } from '@tanstack/react-form';
import { DateTime } from 'luxon';
import { JadwalBooking } from '@/lib/types';

export default function AddForm() {
	const [open, setOpen] = useState(false);

	const form = useForm({
		defaultValues: {
			judul: '',
			tanggal_posting: 'Pilih tanggal',
			jam_posting: '',
		},
		onSubmit: ({ value }) => {
			handleFormAddJadwal(value as JadwalBooking);
			form.reset();
		},
		validators: {
			onChange: jadwalPostingSchema,
		},
	});

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
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="flex flex-col gap-5">
					<div className="grid gap-4">
						<form.Field name="judul">
							{(field) => {
								return (
									<div>
										<Label htmlFor={field.name}>
											Judul Postingan
										</Label>
										<Input
											id={field.name}
											name={field.name}
											className="mt-3 mb-2"
											value={field.state.value}
											placeholder="Judul Postingan"
											onChange={(e) => {
												field.handleChange(
													e.target.value,
												);
											}}
										/>
										<ErrorMessage field={field} />
									</div>
								);
							}}
						</form.Field>
						<form.Field name="tanggal_posting">
							{(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										Tanggal Posting
									</Label>
									<Popover
										open={open}
										onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<div
												className={buttonVariants({
													variant: 'outline',
													className:
														'w-full justify-between font-normal',
												})}>
												<Input
													type="button"
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													value={field.state.value}
													className="border-0 shadow-none cursor-pointer"
												/>
												<ChevronDownIcon />
											</div>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto overflow-hidden p-0"
											align="start">
											<Calendar
												mode="single"
												selected={
													new Date(field.state.value)
												}
												captionLayout="dropdown"
												onDayBlur={field.handleBlur}
												onSelect={(date) => {
													const newDate = date
														? DateTime.fromJSDate(
																date as Date,
														  )
														: 'Pilih tanggal';
													field.handleChange(
														newDate.toLocaleString(
															DateTime.DATE_HUGE,
														) as unknown as string,
													);
													setOpen(false);
												}}
											/>
										</PopoverContent>
									</Popover>
									<ErrorMessage field={field} />
								</div>
							)}
						</form.Field>
					</div>
					<form.Field name="jam_posting">
						{(field) => (
							<div className="grid gap-3">
								<Label htmlFor={field.name}>Jam Posting</Label>
								<Select
									name={field.name}
									value={field.state.value}
									onValueChange={field.handleChange}>
									<SelectTrigger className="w-full cursor-pointer">
										<SelectValue
											placeholder="Pilih jam posting"
											id={field.name}
										/>
									</SelectTrigger>
									<SelectContent>
										{jam_posting.map((jam, index) => (
											<SelectItem
												className="cursor-pointer"
												key={index}
												value={jam}>
												{jam} WIB
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<ErrorMessage field={field} />
							</div>
						)}
					</form.Field>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Batal</Button>
						</DialogClose>
						<Button
							variant={'secondary'}
							onClick={(e) => {
								e.preventDefault();
								form.reset();
							}}>
							Reset
						</Button>
						<form.Subscribe
							selector={(state) => [
								state.canSubmit,
								state.isSubmitting,
							]}>
							{([canSubmit, isSubmitting]) => (
								<DialogClose
									className={buttonVariants()}
									type="submit"
									disabled={!canSubmit}>
									{isSubmitting
										? 'Menambahkan...'
										: 'Tambahkan'}
								</DialogClose>
							)}
						</form.Subscribe>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
