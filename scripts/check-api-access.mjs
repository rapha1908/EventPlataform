// Read-only checks. Never prints credentials, endpoint URLs or content.
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
function env(name) {
    const value = source.match(new RegExp(`^${name}\\s*=\\s*(.*)$`, 'm'))?.[1]?.trim() ?? '';
    return value.replace(/^(["'])(.*)\1$/, '$2');
}
const endpoint = env('VITE_API_URL');
const token = env('VITE_API_ACCESS_TOKEN');
if (!endpoint) throw new Error('VITE_API_URL is required.');
for (const authenticated of [false, true]) {
    if (authenticated && !token) continue;
    for (const stage of ['PUBLISHED', 'DRAFT']) {
        const query = `query AccessCheck { events(stage: ${stage}, first: 1) { id lessons(first: 1) { id teacher { id } } } }`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(authenticated ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify({ query }),
                signal: AbortSignal.timeout(15000),
            });
            const body = await response.json();
            console.log(JSON.stringify({ authenticated, stage, status: response.status,
                querySucceeded: response.ok && !body.errors && Array.isArray(body.data?.events),
                returnedEvent: !!body.data?.events?.length,
                errorCodes: body.errors?.map(error => error.extensions?.code ?? 'unspecified') ?? [],
            }));
        } catch {
            console.error(JSON.stringify({ authenticated, stage, requestFailed: true }));
            process.exitCode = 1;
        }
    }
}
console.log('These read checks do not establish write, management, or all model permissions. No mutations were sent.');
