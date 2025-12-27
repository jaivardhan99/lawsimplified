import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');

console.log('--- Checking frontend/.env format ---');

if (!existsSync(envPath)) {
    console.log('ERROR: .env file NOT FOUND');
    process.exit(1);
}

try {
    const buffer = readFileSync(envPath);
    console.log(`File size: ${buffer.length} bytes`);

    // Check for UTF-16 BOM
    if (buffer.length > 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
        console.log('CRITICAL: File appears to be UTF-16 encoded (PowerShell default). Vite cannot read this.');
        console.log('FIX: Delete the file and create it again using a code editor, or save as UTF-8.');
        process.exit(0);
    }
    if (buffer.includes(0x00)) {
        console.log('CRITICAL: File contains null bytes. Likely UTF-16 or binary garbage.');
        process.exit(0);
    }

    const content = Buffer.from(buffer).toString('utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        console.log(`Line ${idx + 1} starts with: ${JSON.stringify(trimmed.substring(0, 10))}`);

        if (trimmed.startsWith('$env')) {
            console.log(' -> ERROR: PowerShell syntax detected');
        } else if (!trimmed.startsWith('VITE_') && trimmed.includes('=')) {
            console.log(' -> WARNING: No VITE_ prefix');
        }
    });

} catch (err) {
    console.error('Error:', err.message);
}
