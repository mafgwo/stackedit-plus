// Credit: https://github.com/github/time-elements/
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const pad = num => `0${num}`.slice(-2);

function strftime(time, formatString) {
  const day = time.getDay();
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, (_arg) => {
    let match;
    const modifier = _arg[1];
    switch (modifier) {
      case '%':
      default:
        return '%';
      case 'a':
        return weekdays[day].slice(0, 3);
      case 'A':
        return weekdays[day];
      case 'b':
        return months[month].slice(0, 3);
      case 'B':
        return months[month];
      case 'c':
        return time.toString();
      case 'd':
        return pad(date);
      case 'e':
        return date;
      case 'H':
        return pad(hour);
      case 'I':
        return pad(strftime(time, '%l'));
      case 'l':
        return hour === 0 || hour === 12 ? 12 : (hour + 12) % 12;
      case 'm':
        return pad(month + 1);
      case 'M':
        return pad(minute);
      case 'p':
        return hour > 11 ? 'PM' : 'AM';
      case 'P':
        return hour > 11 ? 'pm' : 'am';
      case 'S':
        return pad(second);
      case 'w':
        return day;
      case 'y':
        return pad(year % 100);
      case 'Y':
        return year;
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/);
        return match ? match[1] : '';
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /);
        return match ? match[1] : '';
    }
  });
}

class RelativeTime {
  constructor(date) {
    this.date = date;
  }

  toString() {
    const ago = this.timeElapsed();
    return ago || `${this.formatDate()}`;
  }

  timeElapsed() {
    const ms = new Date().getTime() - this.date.getTime();
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);
    if (ms < 0) {
      return '刚刚';
    } else if (sec < 45) {
      return '刚刚';
    } else if (sec < 90) {
      return '1分钟前';
    } else if (min < 45) {
      return `${min}分钟前`;
    } else if (min < 90) {
      return '1小时前';
    } else if (hr < 24) {
      return `${hr}小时前`;
    } else if (hr < 36) {
      return '1天前';
    } else if (day < 30) {
      return `${day}天前`;
    }
    return null;
  }

  formatDate() {
    return strftime(this.date, '%Y-%m-%d');
  }
}

export default {
  format(time) {
    return time && new RelativeTime(new Date(time)).toString();
  },
};
