import { writeFileSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');
const content = `VITE_FIREBASE_API_KEY=AIzaSyBDqy_Fyc__m45_hEBUhf1U4lfOOepy6mc
VITE_FIREBASE_AUTH_DOMAIN=indianlawsimplified-fcc47.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=indianlawsimplified-fcc47
VITE_FIREBASE_STORAGE_BUCKET=indianlawsimplified-fcc47.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=643041679067
VITE_FIREBASE_APP_ID=1:643041679067:web:b853af2ffb8cd3aa505efe
VITE_FIREBASE_MEASUREMENT_ID=G-6SZRTC652W
`;

try {
    writeFileSync(envPath, content, 'utf-8');
    console.log('✅ Successfully wrote frontend/.env with UTF-8 encoding.');
} catch (err) {
    console.error('❌ Failed to write .env:', err.message);
}
