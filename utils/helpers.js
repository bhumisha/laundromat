module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  next_step: word => {
    switch (word) {
      case 'Pick':
        word = 'Accept Order'
        break;
      case 'Accepted':
        word = 'Cleaning'
        break;
      case 'Cleaning':
        word = 'Delivering'
        break;
      case 'Delivering':
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