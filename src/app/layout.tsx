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
			<body className={`w-screen antialiased`}>{children}</body>
		</html>
	);
}
