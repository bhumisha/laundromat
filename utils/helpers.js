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
  }
};