import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteForm() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant={'destructive'}
					className="w-full">
					<Trash2 />
					Hapus
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Aksi ini tidak dapat dikembalikan. Item ini akan dihapus
						secara permanen.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive">
						<Trash2 />
						Lanjutkan
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
