import { Button } from '../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';

export default function BookingButton() {
	return (
		<div className="absolute bottom-2 right-2">
			<Dialog>
				<DialogTrigger asChild>
					<Button>Booking</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Booking Postingan/Story</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
