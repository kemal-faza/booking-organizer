'use client';
import { Copy, CopyCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { teksBahanBooking } from '@/lib/utils';
import { JadwalBooking } from '@/lib/types';
import { useState } from 'react';

export default function CopyButton({ jadwal }: { jadwal: JadwalBooking }) {
	const [isCopied, setIsCopied] = useState(false);
	function handleCopy() {
		setIsCopied(true);
		navigator.clipboard.writeText(teksBahanBooking(jadwal));
	}

	return (
		<Button
			variant={'ghost'}
			onClick={handleCopy}>
			{isCopied ? (
				<CopyCheck
					size={20}
					className="cursor-pointer"
				/>
			) : (
				<Copy
					size={20}
					className="cursor-pointer"
				/>
			)}
		</Button>
	);
}
