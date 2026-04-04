import * as dns from 'dns';
import * as net from 'net';

const host = 'ep-royal-bonus-aiaiyglb-pooler.c-4.us-east-1.aws.neon.tech';
const port = 5432;

console.log(`Checking DNS for ${host}...`);
dns.lookup(host, (err, address, family) => {
  if (err) {
    console.error('DNS lookup failed:', err);
    return;
  }
  console.log(`DNS lookup successful: ${address} (IPv${family})`);

  console.log(`Checking TCP connection to ${address}:${port}...`);
  const socket = new net.Socket();
  const timeout = 10000;
  socket.setTimeout(timeout);

  socket.on('connect', () => {
    console.log('TCP connection successful!');
    socket.destroy();
  });

  socket.on('timeout', () => {
    console.error('TCP connection timed out');
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('TCP connection error:', err);
  });

  socket.connect(port, address);
});
