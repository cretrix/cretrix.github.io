document.addEventListener('DOMContentLoaded', () => {
  let button = document.querySelector("#explore");
  button.onclick = () => {
    let os = getMobileOS()
    doScrolling("#projects", os === 'Iphone' ? 300 : os === "iOS" ? 1000 : 50);
  };

  const getMobileOS = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      return "Android"
    }
    if (/iPhone/.test(ua)) {
      return "Iphone"
    }
    else if (/iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return "iOS"
    }
    return "Other"
  }

  function getElementY(query) {
    return (
      window.pageYOffset +
      document.querySelector(query).getBoundingClientRect().top
    );
  }

  function doScrolling(element, duration) {
    var startingY = window.pageYOffset;
    var elementY = getElementY(element);
    var targetY =
      document.body.scrollHeight - elementY < window.innerHeight
        ? document.body.scrollHeight - window.innerHeight
        : elementY;
    var diff = targetY - startingY;
    var easing = function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    var start;

    if (!diff) return;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var time = timestamp - start;
      var percent = Math.min(time / duration, 1);
      percent = easing(percent);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    window.location.href = `https://www.google.com/maps/dir/${latitude},${longitude}/36+Keri+St,+Yerevan+0033/@${latitude},${longitude},14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x406abd6ea53a8d9b:0xfd561ab6d2b429c7!2m2!1d44.4870432!2d40.1996368`;
  }
  let dirBtn = document.querySelector('#directions')
  dirBtn.onclick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
})