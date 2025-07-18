import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Jadwal Posting Organizer',
	description: 'Pengelolaan Jadwal Posting',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased relative min-h-screen flex justify-center`}>
				{children}
			</body>
		</html>
	);
}
