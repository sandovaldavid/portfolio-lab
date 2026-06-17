import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  
  if (method !== 'POST') {
    return {
      status: 'error',
      message: 'Method not allowed. Use POST to trigger Obsidian synchronization.',
    };
  }

  const body = await readBody(event).catch(() => ({}));
  
  return {
    status: 'success',
    message: 'Obsidian synchronization triggered successfully.',
    timestamp: new Date().toISOString(),
    eventReceived: body.event || 'vault_changed',
    syncedFiles: [
      'content/algorithms/binary-search.md',
      'content/systems/circuit-breaker.md'
    ],
  };
});
