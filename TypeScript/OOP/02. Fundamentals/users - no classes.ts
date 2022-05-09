const userOne = {
  firstName: 'Peter',
  lastName: 'Capaldi',
  username: 'rockstar',
  email: 'peter.capaldi@gmail.com',
};

const userTwo = {
  firstName: 'John',
  lastName: 'Hurt',
  username: 'wardoctor',
  email: 'john.hurt@gmail.com',
};

const displayUser = (user: any) => {
  console.log(user.username);
  console.log(user.email);
  console.log();
};

displayUser(userOne);
displayUser(userTwo);

displayUser({
  firstName: 'David',
  lastName: 'Tennant',
  username: 'timeywimey',
  email: 'david.tennant@gmail.com',
});
