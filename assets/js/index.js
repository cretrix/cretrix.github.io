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
  document.querySelectorAll('.form-input').forEach(el => {
    el.childNodes[1].addEventListener('input', _ => {
      let name = document.querySelector('form input[type="text"]')
      let email = document.querySelector('form input[type="email"]')
      let textarea = document.querySelector('form textarea')
      if (name.value.length > 6 && email.value.length > 6 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && textarea.value.length > 4) {
        document.querySelector('.send input').disabled = false;
      } else {
        document.querySelector('.send input').disabled = true;
      }
    })
  })


  function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "flex";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
  function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  let form = document.querySelector('#contact form')
  form.addEventListener('submit', e => {
    e.preventDefault()
    e.target.querySelector('.send').classList.add('fadeout')
    let sendContainer = document.querySelector('.fadeout')
    sendContainer.addEventListener("animationend", function () {
      sendContainer.style.display = 'none'
      sendContainer.classList.remove('fadeout');
      //api call to backend to do
      sendContainer.classList.add('success')
      let successContainer = document.querySelector('.send-message')
      fadeIn(successContainer)
      setTimeout(() => {
        fadeOut(successContainer)
      }, 2000);
      setTimeout(() => {
        fadeIn(sendContainer)
      }, 3000);
    }, false);
  })
})




