import { AnyFieldApi } from '@tanstack/react-form';
import { clsx, type ClassValue } from 'clsx';
import { Settings } from 'luxon';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod/v4';

Settings.defaultLocale = 'id';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const jadwalPostingSchema = z.object({
	judul: z
		.string('Judul harus berupa string!')
		.nonempty('Judul tidak boleh kosong!'),
	tanggal_posting: z
		.string('Tanggal posting harus berupa string!')
		.refine((field) => field != 'Select date', {
			error: 'Tanggal posting harus diisi!',
			abort: true,
		}),
	jam_posting: z
		.string('Jam posting harus berupa string!')
		.nonempty('Jam posting tidak boleh kosong!'),
});

export function ErrorMessage({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<p className="text-destructive font-medium text-xs md:text-sm text-justify ml-1">
					{field.state.meta.errors
						.map((err: z.ZodError) => err.message)
						.join(',')}
				</p>
			) : null}
			{field.state.meta.isValidating ? 'Validating...' : null}
		</>
	);
}

export function makeKeyword(
	judul: string,
	tanggal_posting: string,
	jam_posting: string,
) {
	const newTanggalPosting = tanggal_posting.split(',')[1];
	const newJamPosting = jam_posting.replace('.', ' ');
	return `${judul} ${newTanggalPosting} ${newJamPosting}`;
}
