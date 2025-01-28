export default function logWithTime(message: string) {
	console.log(`[${new Date().toISOString()}] ${message}`);
}

