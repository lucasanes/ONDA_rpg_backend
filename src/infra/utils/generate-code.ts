export default function generateCode() {
  let code = '';

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 6; i++) {
    if (code.length % 2 == 0) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
      code += Math.floor(Math.random() * 10);
    }
  }

  return code;
}
