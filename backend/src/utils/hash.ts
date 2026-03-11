import bcrypt from 'bcrypt';
export const hashpassword = async (password:string) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
export const comparepassword = async (password:string,hashedpassword:string)=>{
    const isMatch = await bcrypt.compare(password,hashedpassword);
    return isMatch;
};