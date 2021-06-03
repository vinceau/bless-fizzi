const announcementTimestamp = "Mon Jun 22 16:01:03 +0000 2020";

function getTimeRemaining(endtime) {
  const total = Math.abs(Date.parse(endtime) - Date.parse(new Date()));
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor((total / (1000 * 60 * 60 * 24)) % 365);
  const years = Math.floor(total / (1000 * 60 * 60 * 24 * 365));

  return {
    total,
    years,
    days,
    hours,
    minutes,
    seconds,
  };
}

function isAnniversary(result) {
  // Show anniversary notice for around 3 days
  return result.days <= 2;
}

function updateCountdown() {
  const result = getTimeRemaining(announcementTimestamp);
  const { years, days, hours, minutes, seconds } = result;
  let format = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  if (years > 0) {
    format = `${years} years, ` + format;
  }
  document.querySelector("#countdown").innerHTML = format;

  // Check if it's anniversary
  if (isAnniversary(result)) {
    startConfetti();
    showBalloons();
  } else {
    stopConfetti();
    hideBalloons();
  }
}

const interval = setInterval(updateCountdown, 1000);
