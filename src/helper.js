export default function helper(stream, callback = () => {}) {
  let data = '';

  stream.once('error', (error) => {
    stream.removeAllListeners();
    callback(error);
  });

  stream.on('data', (chunk) => {
    if (typeof chunk === 'string') {
      data += chunk;
    } else {
      data = chunk;
    }
  });

  stream.once('end', () => {
    stream.removeAllListeners();
    stream.data(data);
    callback();
  });
}
