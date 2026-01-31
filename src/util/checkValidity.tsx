function checkPassword(password: string): string {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
    password,
  )
    ? ""
    : "Your password needs to be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
}
function checkUsername(username: string): string {
  return username.length > 5 && username.length <= 15
    ? ""
    : "Username must be at least 5 characters long!";
}

export default {
  checkUsername,
  checkPassword,
};
