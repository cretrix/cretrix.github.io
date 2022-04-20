document.addEventListener('DOMContentLoaded', () => {
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

  let button = document.querySelector("#explore");
  let os = getMobileOS()
  if (button) {
    button.onclick = () => {
      doScrolling("#projects", os === 'Iphone' ? 300 : os === "iOS" ? 1000 : 50);
    };
  }

  let nav = document.querySelector('nav')
  nav.addEventListener('click', (e) => {
    let from = e.target;
    if (!from.className || !/btn--/i.test(from.className)) return;
    let scrollId = from.className.substring(5)
    doScrolling(`#${scrollId}`, os === 'Iphone' ? 300 : os === "iOS" ? 1000 : 50)
  })

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
  let dirBtn = document.querySelector('#directions')
  dirBtn.onclick = () => {
    window.location.href = `https://www.google.com/maps/place/36+Keri+St,+Yerevan+0033/@40.1996368,44.4848545,17z/data=!3m1!4b1!4m5!3m4!1s0x406abd6ea53a8d9b:0xfd561ab6d2b429c7!8m2!3d40.1996368!4d44.4870432`
  }
  let textareaElem = document.querySelector('textarea');
  const counterElem = document.querySelector('.counter');
  textareaElem.addEventListener('input', function (e) {
    let countInput = textareaElem.value.length;
    counterElem.innerHTML = `${countInput}/300`;
  });

  const targets = document.querySelectorAll('.skeleton img');
  const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        img.setAttribute('src', src);
        img.onload = () => {
          img.parentNode.classList.remove('skeleton', 'mobile-skeleton', 'hero-skeleton', 'desktop-skeleton', 'unique-skeleton', 'sitespecs-skeleton', 'ams-skeleton', 'icon-skeleton')
        }
        observer.disconnect();
      });
    });
    io.observe(target)
  };
  targets.forEach(lazyLoad);


  let target = document.querySelector('.paragraph-skeleton')
  let heading = target.querySelector('h3')
  let desc = target.querySelector('p')

  setTimeout(() => {
    heading.classList.add('loaded')
    desc.classList.add('loaded')
    target.classList.remove('paragraph-skeleton')
    heading.parentNode.classList.remove('skeleton-heading')
    desc.parentNode.classList.remove('skeleton-desc')
    document.querySelector('.bottom').classList.add('background')
  }, 500);

})




