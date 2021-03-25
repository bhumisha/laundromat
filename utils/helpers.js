module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate() + 1}/${new Date(
      date
    ).getFullYear()}`;
  },


  next_step: word => {
    switch (word) {
      case 'Pending':
        word = 'danger'
        break;
      case 'Accepted':
        word = 'warning'
        break;
      case 'Cleaning':
        word = 'info'
        break;
      case 'Delivering':
        word = 'success'
        break;
        case 'Complete':
        word = 'light'
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