const announcementTimestamp = "Mon Jun 22 16:01:03 +0000 2020";

function getTimeRemaining(endtime) {
  const total = Math.abs(Date.parse(endtime) - Date.parse(new Date()));
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function updateCountdown() {
  const result = getTimeRemaining(announcementTimestamp);
  const { days, hours, minutes, seconds } = result;
  const format = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  document.querySelector("#countdown").innerHTML = format;
}

const interval = setInterval(updateCountdown, 1000);
