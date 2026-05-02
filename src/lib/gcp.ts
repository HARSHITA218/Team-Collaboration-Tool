/* eslint-disable @typescript-eslint/no-explicit-any */
let storageInstance: any = null;
let loggerInstance: any = null;

function getStorage() {
  if (!process.env.GOOGLE_CLOUD_PROJECT_ID) return null;
  if (!storageInstance) {
    const { Storage } = require('@google-cloud/storage');
    storageInstance = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });
  }
  return storageInstance;
}

function getLogger() {
  if (!process.env.GOOGLE_CLOUD_PROJECT_ID) return null;
  if (!loggerInstance) {
    const { Logging } = require('@google-cloud/logging');
    const logging = new Logging({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });
    loggerInstance = logging.log('syncspace-app-log');
  }
  return loggerInstance;
}

export function getBucket() {
  const storage = getStorage();
  if (!storage) return null;
  return storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME || 'team-collab-storage');
}

export async function logEvent(text: string, severity: 'INFO' | 'WARNING' | 'ERROR' = 'INFO') {
  const logger = getLogger();
  if (!logger) {
    // Fallback to console when GCP is not configured (local dev)
    console.log(`[GCP-LOG ${severity}] ${text}`);
    return;
  }
  const metadata = { resource: { type: 'global' }, severity };
  const entry = logger.entry(metadata, text);
  await logger.write(entry);
}
