import log from 'gelf-pro';

log.setConfig({
  fields: { facility: 'example', owner: 'Tom (a cat)' }, // optional; default fields for all messages
  filter: [], // optional; filters to discard a message
  transform: [], // optional; transformers for a message
  broadcast: [], // optional; listeners of a message
  levels: {}, // optional; default: see the levels section below
  aliases: {}, // optional; default: see the aliases section below
  adapterName: 'udp', // optional; currently supported "udp", "tcp" and "tcp-tls"; default: udp
  adapterOptions: {
    // this object is passed to the adapter.connect() method
    // common
    host: '127.0.0.1', // optional; default: 127.0.0.1
    port: 12201, // optional; default: 12201
    // ... and so on

    // tcp adapter example
    family: 4, // tcp only; optional; version of IP stack; default: 4
    timeout: 1000, // tcp only; optional; default: 10000 (10 sec)

    // udp adapter example
    protocol: 'udp4', // udp only; optional; udp adapter: udp4, udp6; default: udp4
  },
});

export default log;
