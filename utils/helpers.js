module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate() + 1}/${new Date(
      date
    ).getFullYear()}`;
  },

  next_step: word => {
    word = word.toLowerCase();
    switch (word) {
      case 'pick':
        word = 'Accepted'
        break;
      case 'accepted':
        word = 'Cleaning'
        break;
      case 'cleaning':
        word = 'Delivering'
        break;
      case 'delivering':
        word = 'Complete'
        break;
    }

    return word;
  },

  
  todays_date: () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }
};