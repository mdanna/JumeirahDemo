const users = {
  list: [{
    email: 'avery.donovan@gmail.com',
    firstName: 'Avery',
    lastName: 'Donovan',
    role: 'contractor',
    photo: 'photo1.png'
  }, {
    email: 'linda.brown@hotmail.com',
    firstName: 'Linda',
    lastName: 'Brown',
    role: 'contractor',
    photo: 'photo2.png'
  }, {
    email: 'tim.connor@jumeirah.com',
    firstName: 'Tim',
    lastName: 'Connor',
    role: 'administrator',
    photo: 'photo3.png'
  }],
  
  findUser(email){
    return users.list.find((a) => a.email === email);
  }
};