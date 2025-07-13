'use client';
import { Copy, CopyCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function CopyButton({ teks }: { teks: string }) {
	const [isCopied, setIsCopied] = useState(false);
	function handleCopy() {
		setIsCopied(true);
		navigator.clipboard.writeText(teks);
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
