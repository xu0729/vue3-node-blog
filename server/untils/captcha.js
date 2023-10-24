const generateRandomCode = () =>{
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code
}


module.exports = {
    generateRandomCode,
}