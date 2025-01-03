function netflix(source, args) {
  function netflix(source) {
    var ReplaceMap = {
      adBreaks: [],
      adState: null,
      currentAdBreak: 'undefined',
    };
    Object.defineProperty = new Proxy(Object.defineProperty, {
      apply: (target, thisArg, ArgsList) => {
        var Original = Reflect.apply(target, thisArg, ArgsList);
        if (ArgsList[1] == 'getAdBreaks' || ArgsList[1] == 'getAdsDisplayStringParams') {
          return (Original[ArgsList[1]] = function () {});
        } else if (ArgsList[1] == 'adBreaks' || ArgsList[1] == 'currentAdBreak' || typeof Original['adBreaks'] !== 'undefined') {
          for (var [key, value] of Object.entries(Original)) {
            if (typeof ReplaceMap[key] !== 'undefined' && ReplaceMap[key] !== 'undefined') {
              Original[key] = ReplaceMap[key];
            } else if (typeof ReplaceMap[key] !== 'undefined' && ReplaceMap[key] === 'undefined') {
              Original[key] = undefined;
            }
          }
          return Original;
        } else {
          return Original;
        }
      },
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    netflix.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function ytShorts(source, args) {
  function ytShorts(source) {
    window.JSON.parse = new Proxy(JSON.parse, {
      apply(r, e, t) {
        const n = Reflect.apply(r, e, t);
        if (!location.pathname.startsWith('/shorts/')) {
          return n;
        }
        const a = n?.entries;
        return (
          a &&
            Array.isArray(a) &&
            (n.entries = n.entries.filter((r) => {
              if (!r?.command?.reelWatchEndpoint?.adClientParams?.isAd) return r;
            })),
          n
        );
      },
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    ytShorts.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebook(source, args) {
  function facebook(source) {
    var e = new MutationObserver(function () {
        var m = document.querySelectorAll("div[id^='mount_']");
        {
          var e;
          e =
            0 < m.length
              ? document.querySelectorAll('div[role="feed"] > div[data-pagelet^="FeedUnit"] > div[class]:not([style*="height"])')
              : document.querySelectorAll('[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]');
        }
        e.forEach(function (e) {
          function n(e, n) {
            for (
              0 < m.length
                ? '0' == (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span > span > span[data-content]')).length &&
                  (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span[aria-label]'))
                : (h = e.querySelectorAll('.userContentWrapper h5 + div[data-testid] a [class] [class]')),
                socheck = 0;
              socheck < h.length;
              socheck++
            )
              h[socheck].innerText.contains(n) && ((p = ['1']), (d = ['1']), (u = ['1']), (i = r = l = 1), (socheck = h.length));
          }

          function t(e, n, t, c, a) {
            for (
              0 < m.length
                ? '0' == (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span > span > span[data-content]')).length &&
                  (h = e.querySelectorAll('div[role="article"] span[dir="auto"] div[role="button"][tabindex]'))
                : (h = e.querySelectorAll('.userContentWrapper h5 + div[data-testid] > span a > [class] [class]')),
                '0' == h.length && (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span[aria-label]')),
                socheck = 0;
              socheck < h.length;
              socheck++
            ) {
              (spancheck = 0),
                1 < h.length
                  ? ((spancheck = h[socheck].querySelectorAll('span')[0]), 0 == spancheck && (spancheck = h[socheck].querySelectorAll('b')[0]))
                  : ((spancheck = h[0].querySelectorAll('span')[socheck]), 0 == spancheck && (spancheck = h[0].querySelectorAll('b')[socheck]));
              var o = h[0];
              if (0 != spancheck && spancheck) {
                if (2 == spancheck.children.length && 0 < m.length)
                  for (spancheck = spancheck.querySelectorAll('span:not([style])'), spcheck = 0; spcheck < spancheck.length; spcheck++)
                    spancheck[spcheck].innerText.contains(n)
                      ? (s = 1)
                      : !spancheck[spcheck].innerText.contains(t) ||
                          0 != spancheck[spcheck].offsetTop ||
                          spancheck[spcheck].innerText.contains(n) ||
                          spancheck[spcheck].innerText.contains(c) ||
                          spancheck[spcheck].innerText.contains(a)
                        ? !spancheck[spcheck].innerText.contains(c) ||
                          0 != spancheck[spcheck].offsetTop ||
                          spancheck[spcheck].innerText.contains(t) ||
                          spancheck[spcheck].innerText.contains(n) ||
                          spancheck[spcheck].innerText.contains(a)
                          ? !spancheck[spcheck].innerText.contains(a) ||
                            0 != spancheck[spcheck].offsetTop ||
                            spancheck[spcheck].innerText.contains(t) ||
                            spancheck[spcheck].innerText.contains(c) ||
                            spancheck[spcheck].innerText.contains(n) ||
                            ((u = ['1']), (i = 1))
                          : ((d = ['1']), (r = 1))
                        : ((p = ['1']), (l = 1));
                0 == m.length &&
                  ((!((spancheck.innerText.contains(n) && 0 == spancheck.offsetTop) || (h[0].innerText.contains(n) && 0 == h[0].offsetTop)) ||
                    (spancheck.innerText.contains(t) && !h[0].innerText.contains(t)) ||
                    (spancheck.innerText.contains(c) && !h[0].innerText.contains(c)) ||
                    (spancheck.innerText.contains(a) && !h[0].innerText.contains(a))) &&
                  (!o.innerText.contains(n) || 0 != o.offsetTop || o.innerText.contains(t) || o.innerText.contains(c) || o.innerText.contains(a))
                    ? !spancheck.innerText.contains(t) ||
                      0 != spancheck.offsetTop ||
                      spancheck.innerText.contains(n) ||
                      spancheck.innerText.contains(c) ||
                      spancheck.innerText.contains(a)
                      ? !spancheck.innerText.contains(c) ||
                        0 != spancheck.offsetTop ||
                        spancheck.innerText.contains(t) ||
                        spancheck.innerText.contains(n) ||
                        spancheck.innerText.contains(a)
                        ? !spancheck.innerText.contains(a) ||
                          0 != spancheck.offsetTop ||
                          spancheck.innerText.contains(t) ||
                          spancheck.innerText.contains(c) ||
                          spancheck.innerText.contains(n) ||
                          ((u = ['1']), (i = 1))
                        : ((d = ['1']), (r = 1))
                      : ((p = ['1']), (l = 1))
                    : (s = 1));
              }
            }
          }

          function c(e, n, t, c, a) {
            u =
              0 < m.length
                ? ((h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + n + ']')),
                  (p = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + t + ']')),
                  (d = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + c + ']')),
                  e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + a + ']'))
                : ((h = e.querySelectorAll('.userContentWrapper h5 + div[data-testid] a [data-content=' + n + ']')),
                  (p = e.querySelectorAll('.userContentWrapper h5 + div[data-testid] a [data-content=' + t + ']')),
                  (d = e.querySelectorAll('.userContentWrapper h5 + div[data-testid] a [data-content=' + c + ']')),
                  e.querySelectorAll('.userContentWrapper h5 + div[data-testid] a [data-content=' + a + ']'));
          }
          var s = 0,
            l = 0,
            r = 0,
            i = 0,
            h = 0,
            p = 0,
            d = 0,
            u = 0,
            a = e.querySelectorAll("div[style='width: 100%'] > a[href*='oculus.com/quest'] > div"),
            o = document.querySelector('[lang]'),
            k = document.querySelectorAll("link[rel='preload'][href*='/l/']");
          o = o ? document.querySelector('[lang]').lang : 'en';
          var y,
            g = e.querySelectorAll('a[ajaxify*="ad_id"] > span'),
            f = e.querySelectorAll('a[href*="ads/about"]'),
            S = e.querySelectorAll('a[href*="https://www.facebook.com/business/help"]');
          if (
            'display: none !important;' != e.getAttribute('style') &&
            !e.classList.contains('hidden_elem') &&
            (0 < g.length || 0 < f.length || 0 < S.length
              ? ((T += 1),
                0 < m.length
                  ? ('' == (y = e.querySelectorAll('a[href]')[0].innerText) && (y = e.querySelectorAll('a[href]')[1].innerText),
                    '' == y && (y = e.querySelectorAll('a[href]')[0].querySelectorAll('a[aria-label]')[0].getAttribute('aria-label')))
                  : (y = e.querySelectorAll('a[href]')[2].innerText),
                (e.style = 'display:none!important;'))
              : 0 < a.length
                ? ((T += 1), (y = 'Facebook'), (e.style = 'display:none!important;'))
                : 'af' == o
                  ? n(e, 'Geborg')
                  : 'de' == o || 'nl' == o
                    ? c(e, 'G', 'e', 's', 'n')
                    : 'am' == o
                      ? n(e, 'የተከፈለበት ማስታወቂያ')
                      : 'ar' == o
                        ? n(e, 'مُموَّل')
                        : 'as' == o
                          ? n(e, 'পৃষ্ঠপোষকতা কৰা')
                          : 'az' == o
                            ? n(e, 'Sponsor dəstəkli')
                            : 'co' == o
                              ? n(e, 'Spunsurizatu')
                              : 'bs' == o || 'sl' == o || 'cs' == o
                                ? c(e, 'S', 'p', 'z', 'n')
                                : 'da' == o ||
                                    'en' == o ||
                                    'et' == o ||
                                    'fy' == o ||
                                    'it' == o ||
                                    'ku' == o ||
                                    'nb' == o ||
                                    'nn' == o ||
                                    'pl' == o ||
                                    'sq' == o ||
                                    'sv' == o ||
                                    'zz' == o
                                  ? 0 < m.length
                                    ? k[0].href.contains('en_UD')
                                      ? n(e, 'pəɹosuodS')
                                      : k[0].href.contains('ja_KS')
                                        ? n(e, '広告')
                                        : k[0].href.contains('tz_MA')
                                          ? n(e, 'ⵉⴷⵍ')
                                          : k[0].href.contains('sy_SY')
                                            ? n(e, 'ܒܘܕܩܐ ܡܡܘܘܢܐ')
                                            : k[0].href.contains('cb_IQ')
                                              ? n(e, 'پاڵپشتیکراو')
                                              : k[0].href.contains('ar_AR')
                                                ? n(e, 'مُموَّل')
                                                : k[0].href.contains('sz_PL')
                                                  ? n(e, 'Szpōnzorowane')
                                                  : k[0].href.contains('eo_EO')
                                                    ? n(e, 'Reklamo')
                                                    : k[0].href.contains('es_LA')
                                                      ? c(e, 'P', 'u', 'c', 'd')
                                                      : (c(e, 'S', 'p', 's', 'n'),
                                                        '0' == h.length && t(e, 'S', 'p', 's', 'n'),
                                                        '0' == h.length && n(e, 'Sponsored'))
                                    : document.querySelector('body').className.includes('Locale_en_UD')
                                      ? n(e, 'pəɹosuodS')
                                      : document.querySelector('body').className.includes('ja_KS')
                                        ? n(e, '広告')
                                        : document.querySelector('body').className.includes('tz_MA')
                                          ? n(e, 'ⵉⴷⵍ')
                                          : document.querySelector('body').className.includes('sy_SY')
                                            ? n(e, 'ܒܘܕܩܐ ܡܡܘܘܢܐ')
                                            : document.querySelector('body').className.includes('cb_IQ')
                                              ? n(e, 'پاڵپشتیکراو')
                                              : document.querySelector('body').className.includes('ar_AR')
                                                ? n(e, 'مُموَّل')
                                                : document.querySelector('body').className.includes('sz_PL')
                                                  ? n(e, 'Szpōnzorowane')
                                                  : document.querySelector('body').className.includes('eo_EO')
                                                    ? n(e, 'Reklamo')
                                                    : document.querySelector('body').className.includes('es_LA')
                                                      ? c(e, 'P', 'u', 'c', 'd')
                                                      : (c(e, 'S', 'p', 's', 'n'), '0' == h.length && t(e, 'S', 'p', 's', 'n'))
                                  : 'be' == o
                                    ? n(e, 'Рэклама')
                                    : 'bg' == o
                                      ? n(e, 'Спонсорирано')
                                      : 'mk' == o
                                        ? n(e, 'Спонзорирано')
                                        : 'br' == o
                                          ? n(e, 'Paeroniet')
                                          : 'ca' == o
                                            ? n(e, 'Patrocinat')
                                            : 'gl' == o || 'pt' == o
                                              ? (n(e, 'Patrocinado'), '0' == l && c(e, 'P', 'a', 'c', 'o'))
                                              : 'bn' == o
                                                ? n(e, 'সৌজন্যে')
                                                : 'cb' == o
                                                  ? n(e, 'پاڵپشتیکراو')
                                                  : 'cx' == o
                                                    ? c(e, 'G', 'i', 's', 'n')
                                                    : 'cy' == o
                                                      ? n(e, 'Noddwyd')
                                                      : 'el' == o
                                                        ? n(e, 'Χορηγούμενη')
                                                        : 'eo' == o
                                                          ? n(e, 'Reklamo')
                                                          : 'es' == o
                                                            ? c(e, 'P', 'u', 'c', 'd')
                                                            : 'eu' == o
                                                              ? n(e, 'Babestua')
                                                              : 'fa' == o
                                                                ? n(e, 'دارای پشتیبانی مالی')
                                                                : 'ff' == o
                                                                  ? n(e, 'Yoɓanaama')
                                                                  : 'fi' == o
                                                                    ? n(e, 'Sponsoroitu')
                                                                    : 'fo' == o
                                                                      ? n(e, 'Stuðlað')
                                                                      : 'fr' == o
                                                                        ? 0 < m.length
                                                                          ? k[0].href.contains('fr_FR')
                                                                            ? c(e, 'S', 'p', 's', 'n')
                                                                            : c(e, 'C', 'o', 'm', 'n')
                                                                          : document.querySelector('body').className.includes('Locale_fr_FR')
                                                                            ? c(e, 'S', 'p', 's', 'n')
                                                                            : c(e, 'C', 'o', 'm', 'n')
                                                                        : 'ga' == o
                                                                          ? n(e, 'Urraithe')
                                                                          : 'gn' == o
                                                                            ? n(e, 'Oñepatrosinapyre')
                                                                            : 'gu' == o
                                                                              ? n(e, 'પ્રાયોજિત')
                                                                              : 'ha' == o
                                                                                ? n(e, 'Daukar Nauyi')
                                                                                : 'he' == o
                                                                                  ? n(e, 'ממומן')
                                                                                  : 'hr' == o
                                                                                    ? n(e, 'Plaćeni oglas')
                                                                                    : 'ht' == o
                                                                                      ? n(e, 'Peye')
                                                                                      : 'ne' == o || 'mr' == o || 'hi' == o
                                                                                        ? n(e, 'प्रायोजित')
                                                                                        : 'hu' == o
                                                                                          ? c(e, 'H', 'i', 'r', 'd')
                                                                                          : 'hy' == o
                                                                                            ? n(e, 'Գովազդային')
                                                                                            : 'id' == o
                                                                                              ? c(e, 'B', 'e', 'p', 'n')
                                                                                              : 'is' == o
                                                                                                ? n(e, 'Kostað')
                                                                                                : 'ja' == o
                                                                                                  ? n(e, '広告')
                                                                                                  : 'ms' == o
                                                                                                    ? n(e, 'Ditaja')
                                                                                                    : 'jv' == o
                                                                                                      ? n(e, 'Disponsori')
                                                                                                      : 'ka' == o
                                                                                                        ? n(e, 'რეკლამა')
                                                                                                        : 'kk' == o
                                                                                                          ? n(e, 'Демеушілік көрсеткен')
                                                                                                          : 'km' == o
                                                                                                            ? n(e, 'បានឧបត្ថម្ភ')
                                                                                                            : 'kn' == o
                                                                                                              ? n(e, 'ಪ್ರಾಯೋಜಿತ')
                                                                                                              : 'ko' == o
                                                                                                                ? n(e, 'Sponsored')
                                                                                                                : 'ky' == o
                                                                                                                  ? n(e, 'Демөөрчүлөнгөн')
                                                                                                                  : 'lo' == o
                                                                                                                    ? n(e, 'ຜູ້ສະໜັບສະໜູນ')
                                                                                                                    : 'lt' == o
                                                                                                                      ? n(e, 'Remiama')
                                                                                                                      : 'lv' == o
                                                                                                                        ? n(e, 'Apmaksāta reklāma')
                                                                                                                        : 'mg' == o
                                                                                                                          ? n(e, 'Misy Mpiantoka')
                                                                                                                          : 'ml' == o
                                                                                                                            ? n(e, 'സ്പോൺസർ ചെയ്തത്')
                                                                                                                            : 'mn' == o
                                                                                                                              ? n(e, 'Ивээн тэтгэсэн')
                                                                                                                              : 'mt' == o
                                                                                                                                ? n(e, 'Sponsorjat')
                                                                                                                                : 'my' == o
                                                                                                                                  ? (n(e, 'ပံ့ပိုးထားသည်'),
                                                                                                                                    '0' == l &&
                                                                                                                                      n(e, 'အခပေးကြော်ငြာ'))
                                                                                                                                  : 'or' == o
                                                                                                                                    ? n(e, 'ପ୍ରଯୋଜିତ')
                                                                                                                                    : 'pa' == o
                                                                                                                                      ? n(e, 'ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ')
                                                                                                                                      : 'ps' == o
                                                                                                                                        ? n(e, 'تمويل شوي')
                                                                                                                                        : 'ro' == o
                                                                                                                                          ? n(e, 'Sponsorizat')
                                                                                                                                          : 'ru' == o ||
                                                                                                                                              'uk' == o
                                                                                                                                            ? n(e, 'Реклама')
                                                                                                                                            : 'rw' == o
                                                                                                                                              ? n(
                                                                                                                                                  e,
                                                                                                                                                  'Icyamamaza ndasukirwaho',
                                                                                                                                                )
                                                                                                                                              : 'sc' == o
                                                                                                                                                ? n(
                                                                                                                                                    e,
                                                                                                                                                    'Patronadu de',
                                                                                                                                                  )
                                                                                                                                                : 'si' == o
                                                                                                                                                  ? n(
                                                                                                                                                      e,
                                                                                                                                                      'අනුග්රාහක',
                                                                                                                                                    )
                                                                                                                                                  : 'sk' == o
                                                                                                                                                    ? n(
                                                                                                                                                        e,
                                                                                                                                                        'Sponzorované',
                                                                                                                                                      )
                                                                                                                                                    : 'sn' == o
                                                                                                                                                      ? n(
                                                                                                                                                          e,
                                                                                                                                                          'Zvabhadharirwa',
                                                                                                                                                        )
                                                                                                                                                      : 'so' ==
                                                                                                                                                          o
                                                                                                                                                        ? n(
                                                                                                                                                            e,
                                                                                                                                                            'La maalgeliyey',
                                                                                                                                                          )
                                                                                                                                                        : 'sr' ==
                                                                                                                                                            o
                                                                                                                                                          ? n(
                                                                                                                                                              e,
                                                                                                                                                              'Спонзорисано',
                                                                                                                                                            )
                                                                                                                                                          : 'sw' ==
                                                                                                                                                              o
                                                                                                                                                            ? n(
                                                                                                                                                                e,
                                                                                                                                                                'Imedhaminiwa',
                                                                                                                                                              )
                                                                                                                                                            : 'sy' ==
                                                                                                                                                                o
                                                                                                                                                              ? n(
                                                                                                                                                                  e,
                                                                                                                                                                  'ܒܘܕܩܐ ܡܡܘܘܢܐ',
                                                                                                                                                                )
                                                                                                                                                              : 'sz' ==
                                                                                                                                                                  o
                                                                                                                                                                ? n(
                                                                                                                                                                    e,
                                                                                                                                                                    'Szpōnzorowane',
                                                                                                                                                                  )
                                                                                                                                                                : 'ta' ==
                                                                                                                                                                    o
                                                                                                                                                                  ? n(
                                                                                                                                                                      e,
                                                                                                                                                                      'விளம்பரம்',
                                                                                                                                                                    )
                                                                                                                                                                  : 'te' ==
                                                                                                                                                                      o
                                                                                                                                                                    ? n(
                                                                                                                                                                        e,
                                                                                                                                                                        'ప్రాయోజితం చేయబడింది',
                                                                                                                                                                      )
                                                                                                                                                                    : 'tg' ==
                                                                                                                                                                        o
                                                                                                                                                                      ? n(
                                                                                                                                                                          e,
                                                                                                                                                                          'Бо сарпарастӣ',
                                                                                                                                                                        )
                                                                                                                                                                      : 'th' ==
                                                                                                                                                                          o
                                                                                                                                                                        ? n(
                                                                                                                                                                            e,
                                                                                                                                                                            'ได้รับการสนับสนุน',
                                                                                                                                                                          )
                                                                                                                                                                        : 'tl' ==
                                                                                                                                                                            o
                                                                                                                                                                          ? n(
                                                                                                                                                                              e,
                                                                                                                                                                              'May Sponsor',
                                                                                                                                                                            )
                                                                                                                                                                          : 'tr' ==
                                                                                                                                                                              o
                                                                                                                                                                            ? n(
                                                                                                                                                                                e,
                                                                                                                                                                                'Sponsorlu',
                                                                                                                                                                              )
                                                                                                                                                                            : 'tt' ==
                                                                                                                                                                                o
                                                                                                                                                                              ? n(
                                                                                                                                                                                  e,
                                                                                                                                                                                  'Хәйрияче',
                                                                                                                                                                                )
                                                                                                                                                                              : 'tz' ==
                                                                                                                                                                                  o
                                                                                                                                                                                ? n(
                                                                                                                                                                                    e,
                                                                                                                                                                                    'ⵉⴷⵍ',
                                                                                                                                                                                  )
                                                                                                                                                                                : 'ur' ==
                                                                                                                                                                                    o
                                                                                                                                                                                  ? n(
                                                                                                                                                                                      e,
                                                                                                                                                                                      'سپانسرڈ',
                                                                                                                                                                                    )
                                                                                                                                                                                  : 'uz' ==
                                                                                                                                                                                      o
                                                                                                                                                                                    ? n(
                                                                                                                                                                                        e,
                                                                                                                                                                                        'Reklama',
                                                                                                                                                                                      )
                                                                                                                                                                                    : 'vi' ==
                                                                                                                                                                                        o
                                                                                                                                                                                      ? n(
                                                                                                                                                                                          e,
                                                                                                                                                                                          'Được tài trợ',
                                                                                                                                                                                        )
                                                                                                                                                                                      : 'zh-Hans' ==
                                                                                                                                                                                          o
                                                                                                                                                                                        ? n(
                                                                                                                                                                                            e,
                                                                                                                                                                                            '赞助内容',
                                                                                                                                                                                          )
                                                                                                                                                                                        : 'zh-Hant' ==
                                                                                                                                                                                            o &&
                                                                                                                                                                                          n(
                                                                                                                                                                                            e,
                                                                                                                                                                                            '贊助',
                                                                                                                                                                                          ),
            0 < h.length && 0 < p.length && 0 < d.length && 0 < u.length)
          ) {
            for (cont = 0; cont < h.length; cont++) 0 < h[cont].offsetHeight && ((cont = h.length), (s = 1));
            for (cont1 = 0; cont1 < p.length; cont1++) 0 < p[cont1].offsetHeight && ((cont1 = p.length), (l = 1));
            for (cont2 = 0; cont2 < d.length; cont2++) 0 < d[cont2].offsetHeight && ((cont2 = d.length), (r = 1));
            for (cont3 = 0; cont3 < u.length; cont3++) 0 < u[cont3].offsetHeight && ((cont3 = u.length), (i = 1));
            1 == s &&
              1 == l &&
              1 == r &&
              1 == i &&
              ((0 < m.length && '' != (y = e.querySelectorAll('a[href]')[1].innerText)) || (y = e.querySelectorAll('a[href]')[2].innerText),
              (T += 1),
              (e.style = 'display:none!important;'));
          }
        });
      }),
      T = 0;
    e.observe(document, {
      childList: !0,
      subtree: !0,
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebook.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookSponsored(source, args) {
  function facebookSponsored(source) {
    var b = 0,
      d = [];
    new MutationObserver(function () {
      document
        .querySelectorAll(
          'div[data-pagelet^="FeedUnit"]:not([style*="display: none"]), div[role="feed"] > div:not([style*="display: none"]), div[role="feed"] > span:not([style*="display: none"]), #ssrb_feed_start + div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div span > h3 ~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3 ~ div > div[class]:not([style*="display: none"]), div[role="main"] div[class] > #ssrb_feed_start ~ div > h3 ~ div > div[class]:not([style*="display: none"]), div[role="main"] div > h3 ~ div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div > div > div[class]:not([style*="display: none"]), div[role="main"] div > h2 ~ div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div > div > div[class] > div:not([class], [id]) div:not([class], [id]):not([style*="display: none"]), div[role="main"] div > h3 ~ div > div[class] > div:not([class], [id]) div:not([class], [id], [dir], [data-0], [style]), div[role="main"] div > h2 ~ div > div[class] > div > div:not([style*="display: none"]), div[role="main"] h3[dir="auto"] + div > div[class]:not([style*="display: none"]), div[role="main"] div > h2 ~ div > div[class] > div > div:not([style*="display: none"]) > div:not([style*="display: none"]), div[role="main"] div > h2 ~ div > div > div > div:not([style*="display: none"]) > div:not([style*="display: none"]), div[role="main"] div > h3 ~ div > div > div > div:not([style*="display: none"]) > div:not([style*="display: none"])',
        )
        .forEach(function (e) {
          Object.keys(e).forEach(function (a) {
            if (a.includes?.('__reactEvents') || a.includes?.('__reactProps')) {
              a = e[a];
              try {
                if (
                  a.children?.props?.category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.category?.includes('SPONSORED') ||
                  a.children?.props?.feedEdge?.category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.feedEdge?.category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.feed_story_category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_category?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_cat?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category_sensitive?.cat?.includes('SPONSORED') ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsored_data?.brs_filter_setting ||
                  a.children?.props?.children?.props?.children?.props?.children?.props?.feedUnit?.lbl_sp_data?.ad_id ||
                  a.children?.props?.children?.props?.minGapType?.includes('SPONSORED')
                ) {
                  b++, (e.style = 'display: none !important;');
                  var f = e.querySelector('a[href][aria-label]:not([aria-hidden])');
                  f && d.push(['Ad blocked based on property [' + b + '] -> ' + f.ariaLabel]);
                }
              } catch (a) {}
            }
          });
        });
    }).observe(document, {
      childList: !0,
      subtree: !0,
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookSponsored.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookVideos(source, args) {
  function facebookVideos(source) {
    new MutationObserver(function () {
      window.location.href.includes('/watch') &&
        document
          .querySelectorAll(
            '#watch_feed div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"]) div[class^="_"] > div[class*=" "]',
          )
          .forEach(function (b) {
            Object.keys(b).forEach(function (a) {
              if (a.includes('__reactFiber')) {
                a = b[a];
                try {
                  var c, d, e, f;
                  if (null == (c = a) ? 0 : null == (d = c['return']) ? 0 : null == (e = d.memoizedProps) ? 0 : null == (f = e.story) ? 0 : f.sponsored_data) {
                    var g = b.closest('#watch_feed div[class*=" "] div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"])');
                    g.style = 'display: none !important;';
                  }
                } catch (h) {}
              }
            });
          });
    }).observe(document, {
      childList: !0,
      subtree: !0,
      attributeFilter: ['style'],
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookVideos.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookMarketplaceItem(source, args) {
  function facebookMarketplaceItem(source) {
    if (location.href.includes('marketplace/item')) {
      var b = 0,
        d = [];
      new MutationObserver(function () {
        document
          .querySelectorAll(
            "div[aria-label='Marketplace listing viewer'] > div div + div + span:not([style*='display: none']), #ssrb_feed_start + div > div div + div + span:not([style*='display: none'])",
          )
          .forEach(function (e) {
            Object.keys(e).forEach(function (a) {
              if (a.includes('__reactEvents') || a.includes('__reactProps')) {
                a = e[a];
                try {
                  if (a.children?.props?.children?.props?.adId) {
                    b++, (e.style = 'display: none !important;');
                    var f = e.querySelector('a[href][aria-label]:not([aria-hidden])');
                    f && d.push(['Ad blocked based on property [' + b + '] -> ' + f.ariaLabel]);
                  }
                } catch (a) {}
              }
            });
          });
      }).observe(document, {
        childList: !0,
        subtree: !0,
      });
    }
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookMarketplaceItem.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookMarketplace(source, args) {
  function facebookMarketplace(source) {
    var e, o;
    0 < window.location.href.indexOf('marketplace') &&
      ((e = new MutationObserver(function () {
        document.querySelectorAll('div[role="main"] div[class][style^="max-width:"] div[class][style^="max-width:"]').forEach(function (e) {
          var l,
            t = e.querySelectorAll('a[href*="ads/about"]');
          'display: none !important;' == e.getAttribute('style') ||
            e.classList.contains('hidden_elem') ||
            (0 < t.length &&
              ((o += 1),
              '' == (l = e.querySelectorAll('a[href]')[0].innerText) && (l = e.querySelectorAll('a[href]')[1].innerText),
              '' == l && (l = e.querySelectorAll('a[href]')[0].querySelectorAll('a[aria-label]')[0]?.getAttribute('aria-label')),
              (e.style = 'display:none!important;')));
        });
      })),
      (o = 0),
      e.observe(document, {
        childList: !0,
        subtree: !0,
      }));
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookMarketplace.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookMarketplaceHide(source, args) {
  function facebookMarketplaceHide(source) {
    new MutationObserver(function () {
      document
        .querySelectorAll('div[role="main"] div[class][style^="max-width:"] div[class][style*="max-width:"]:not([style*="display: none"])')
        .forEach(function (c) {
          Object.keys(c).forEach(function (a) {
            if (a.includes('__reactEvents') || a.includes('__reactProps')) {
              a = c[a];
              try {
                a.children?.props?.adSurface?.startsWith('Marketplace') && (c.style = 'display: none !important;');
              } catch (a) {}
            }
          });
        });
    }).observe(document, {
      childList: !0,
      subtree: !0,
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookMarketplaceHide.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookMarketplaceUpsell(source, args) {
  function facebookMarketplaceUpsell(source) {
    if (window.location.href.includes('/marketplace/')) {
      new MutationObserver(function () {
        document.querySelectorAll('div[data-testid="marketplace_home_feed"] div[class][data-testid^="MarketplaceUpsell-"] > div > div').forEach(function (e) {
          var t = e.outerHTML;
          t && void 0 !== t && !0 === t.includes('/ads/about/') && (e.style = 'display:none!important;');
        });
      }).observe(document, {
        childList: !0,
        subtree: !0,
      });
    }
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookMarketplaceUpsell.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

function facebookReels(source, args) {
  function facebookReels(source) {
    var e = new MutationObserver(function () {
        document.querySelectorAll('[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]').forEach(function (e) {
          function t(e, t) {
            for (s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [class] [class]'), socheck = 0; socheck < s.length; socheck++)
              s[socheck].innerText.contains(t) && ((c = ['1']), (d = ['1']), (i = ['1']), (r = l = a = 1), (socheck = s.length));
          }

          function o(e, t, o, n, a) {
            (s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + t + ']')),
              (c = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + o + ']')),
              (d = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + n + ']')),
              (i = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + a + ']')),
              0 == s.length &&
                ((s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + t + ']')),
                (c = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + o + ']')),
                (d = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + n + ']')),
                (i = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + a + ']')));
          }
          var n = 0,
            a = 0,
            l = 0,
            r = 0,
            s = 0,
            c = 0,
            d = 0,
            i = 0,
            u = e.querySelectorAll("div[style='width: 100%'] > a[href*='oculus.com/quest'] > div"),
            h = document.querySelector('[lang]').lang,
            g = e.querySelectorAll('a[ajaxify*="ad_id"] > span'),
            p = e.querySelectorAll('a[href*="ads/about"]');
          if ('display: none !important;' != e.getAttribute('style') && !e.classList.contains('hidden_elem')) {
            if (0 < g.length || 0 < p.length) {
              f += 1;
              var y = e.querySelectorAll('a[href]')[2].innerText;
              e.style = 'display:none!important;';
            } else if (0 < u.length) {
              f += 1;
              y = 'Facebook';
              e.style = 'display:none!important;';
            } else
              'af' == h
                ? t(e, 'Geborg')
                : 'de' == h || 'nl' == h
                  ? o(e, 'G', 'e', 's', 'n')
                  : 'am' == h
                    ? t(e, 'የተከፈለበት ማስታወቂያ')
                    : 'ar' == h
                      ? t(e, 'مُموَّل')
                      : 'as' == h
                        ? t(e, 'পৃষ্ঠপোষকতা কৰা')
                        : 'az' == h
                          ? t(e, 'Sponsor dəstəkli')
                          : 'co' == h
                            ? t(e, 'Spunsurizatu')
                            : 'bs' == h || 'sl' == h || 'cs' == h
                              ? o(e, 'S', 'p', 'z', 'n')
                              : 'da' == h ||
                                  'en' == h ||
                                  'et' == h ||
                                  'fy' == h ||
                                  'it' == h ||
                                  'ku' == h ||
                                  'nb' == h ||
                                  'nn' == h ||
                                  'pl' == h ||
                                  'sq' == h ||
                                  'sv' == h ||
                                  'zz' == h
                                ? document.querySelector('body').className.includes('Locale_en_UD')
                                  ? t(e, 'pəɹosuodS')
                                  : o(e, 'S', 'p', 's', 'n')
                                : 'be' == h
                                  ? t(e, 'Рэклама')
                                  : 'bg' == h
                                    ? t(e, 'Спонсорирано')
                                    : 'mk' == h
                                      ? t(e, 'Спонзорирано')
                                      : 'br' == h
                                        ? t(e, 'Paeroniet')
                                        : 'ca' == h
                                          ? t(e, 'Patrocinat')
                                          : 'gl' == h || 'pt' == h
                                            ? t(e, 'Patrocinado')
                                            : 'bn' == h
                                              ? t(e, 'সৌজন্যে')
                                              : 'cb' == h
                                                ? t(e, 'پاڵپشتیکراو')
                                                : 'cx' == h
                                                  ? o(e, 'G', 'i', 's', 'n')
                                                  : 'cy' == h
                                                    ? t(e, 'Noddwyd')
                                                    : 'el' == h
                                                      ? t(e, 'Χορηγούμενη')
                                                      : 'eo' == h
                                                        ? t(e, 'Reklamo')
                                                        : 'es' == h
                                                          ? o(e, 'P', 'u', 'c', 'd')
                                                          : 'eu' == h
                                                            ? t(e, 'Babestua')
                                                            : 'fa' == h
                                                              ? t(e, 'دارای پشتیبانی مالی')
                                                              : 'ff' == h
                                                                ? t(e, 'Yoɓanaama')
                                                                : 'fi' == h
                                                                  ? t(e, 'Sponsoroitu')
                                                                  : 'fo' == h
                                                                    ? t(e, 'Stuðlað')
                                                                    : 'fr' == h
                                                                      ? document.querySelector('body').className.includes('Locale_fr_FR')
                                                                        ? o(e, 'S', 'p', 's', 'n')
                                                                        : o(e, 'C', 'o', 'm', 'n')
                                                                      : 'ga' == h
                                                                        ? t(e, 'Urraithe')
                                                                        : 'gn' == h
                                                                          ? t(e, 'Oñepatrosinapyre')
                                                                          : 'gu' == h
                                                                            ? t(e, 'પ્રાયોજિત')
                                                                            : 'ha' == h
                                                                              ? t(e, 'Daukar Nauyi')
                                                                              : 'he' == h
                                                                                ? t(e, 'ממומן')
                                                                                : 'hr' == h
                                                                                  ? t(e, 'Plaćeni oglas')
                                                                                  : 'ht' == h
                                                                                    ? t(e, 'Peye')
                                                                                    : 'ne' == h || 'mr' == h || 'hi' == h
                                                                                      ? t(e, 'प्रायोजित')
                                                                                      : 'hu' == h
                                                                                        ? o(e, 'H', 'i', 'r', 'd')
                                                                                        : 'hy' == h
                                                                                          ? t(e, 'Գովազդային')
                                                                                          : 'id' == h
                                                                                            ? o(e, 'B', 'e', 'p', 'n')
                                                                                            : 'is' == h
                                                                                              ? t(e, 'Kostað')
                                                                                              : 'ja' == h
                                                                                                ? t(e, '広告')
                                                                                                : 'ms' == h
                                                                                                  ? t(e, 'Ditaja')
                                                                                                  : 'jv' == h
                                                                                                    ? t(e, 'Disponsori')
                                                                                                    : 'ka' == h
                                                                                                      ? t(e, 'რეკლამა')
                                                                                                      : 'kk' == h
                                                                                                        ? t(e, 'Демеушілік көрсеткен')
                                                                                                        : 'km' == h
                                                                                                          ? t(e, 'បានឧបត្ថម្ភ')
                                                                                                          : 'kn' == h
                                                                                                            ? t(e, 'ಪ್ರಾಯೋಜಿತ')
                                                                                                            : 'ko' == h
                                                                                                              ? t(e, 'Sponsored')
                                                                                                              : 'ky' == h
                                                                                                                ? t(e, 'Демөөрчүлөнгөн')
                                                                                                                : 'lo' == h
                                                                                                                  ? t(e, 'ຜູ້ສະໜັບສະໜູນ')
                                                                                                                  : 'lt' == h
                                                                                                                    ? t(e, 'Remiama')
                                                                                                                    : 'lv' == h
                                                                                                                      ? t(e, 'Apmaksāta reklāma')
                                                                                                                      : 'mg' == h
                                                                                                                        ? t(e, 'Misy Mpiantoka')
                                                                                                                        : 'ml' == h
                                                                                                                          ? t(e, 'സ്പോൺസർ ചെയ്തത്')
                                                                                                                          : 'mn' == h
                                                                                                                            ? t(e, 'Ивээн тэтгэсэн')
                                                                                                                            : 'mt' == h
                                                                                                                              ? t(e, 'Sponsorjat')
                                                                                                                              : 'my' == h
                                                                                                                                ? t(e, 'ပံ့ပိုးထားသည်')
                                                                                                                                : 'or' == h
                                                                                                                                  ? t(e, 'ପ୍ରଯୋଜିତ')
                                                                                                                                  : 'pa' == h
                                                                                                                                    ? t(e, 'ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ')
                                                                                                                                    : 'ps' == h
                                                                                                                                      ? t(e, 'تمويل شوي')
                                                                                                                                      : 'ro' == h
                                                                                                                                        ? t(e, 'Sponsorizat')
                                                                                                                                        : 'ru' == h || 'uk' == h
                                                                                                                                          ? t(e, 'Реклама')
                                                                                                                                          : 'rw' == h
                                                                                                                                            ? t(
                                                                                                                                                e,
                                                                                                                                                'Icyamamaza ndasukirwaho',
                                                                                                                                              )
                                                                                                                                            : 'sc' == h
                                                                                                                                              ? t(
                                                                                                                                                  e,
                                                                                                                                                  'Patronadu de',
                                                                                                                                                )
                                                                                                                                              : 'si' == h
                                                                                                                                                ? t(
                                                                                                                                                    e,
                                                                                                                                                    'අනුග්‍රාහක',
                                                                                                                                                  )
                                                                                                                                                : 'sk' == h
                                                                                                                                                  ? t(
                                                                                                                                                      e,
                                                                                                                                                      'Sponzorované',
                                                                                                                                                    )
                                                                                                                                                  : 'sn' == h
                                                                                                                                                    ? t(
                                                                                                                                                        e,
                                                                                                                                                        'Zvabhadharirwa',
                                                                                                                                                      )
                                                                                                                                                    : 'so' == h
                                                                                                                                                      ? t(
                                                                                                                                                          e,
                                                                                                                                                          'La maalgeliyey',
                                                                                                                                                        )
                                                                                                                                                      : 'sr' ==
                                                                                                                                                          h
                                                                                                                                                        ? t(
                                                                                                                                                            e,
                                                                                                                                                            'Спонзорисано',
                                                                                                                                                          )
                                                                                                                                                        : 'sw' ==
                                                                                                                                                            h
                                                                                                                                                          ? t(
                                                                                                                                                              e,
                                                                                                                                                              'Imedhaminiwa',
                                                                                                                                                            )
                                                                                                                                                          : 'sy' ==
                                                                                                                                                              h
                                                                                                                                                            ? t(
                                                                                                                                                                e,
                                                                                                                                                                'ܒܘܕܩܐ ܡܡܘܘܢܐ',
                                                                                                                                                              )
                                                                                                                                                            : 'sz' ==
                                                                                                                                                                h
                                                                                                                                                              ? t(
                                                                                                                                                                  e,
                                                                                                                                                                  'Szpōnzorowane',
                                                                                                                                                                )
                                                                                                                                                              : 'ta' ==
                                                                                                                                                                  h
                                                                                                                                                                ? t(
                                                                                                                                                                    e,
                                                                                                                                                                    'விளம்பரம்',
                                                                                                                                                                  )
                                                                                                                                                                : 'te' ==
                                                                                                                                                                    h
                                                                                                                                                                  ? t(
                                                                                                                                                                      e,
                                                                                                                                                                      'ప్రాయోజితం చేయబడింది',
                                                                                                                                                                    )
                                                                                                                                                                  : 'tg' ==
                                                                                                                                                                      h
                                                                                                                                                                    ? t(
                                                                                                                                                                        e,
                                                                                                                                                                        'Бо сарпарастӣ',
                                                                                                                                                                      )
                                                                                                                                                                    : 'th' ==
                                                                                                                                                                        h
                                                                                                                                                                      ? t(
                                                                                                                                                                          e,
                                                                                                                                                                          'ได้รับการสนับสนุน',
                                                                                                                                                                        )
                                                                                                                                                                      : 'tl' ==
                                                                                                                                                                          h
                                                                                                                                                                        ? t(
                                                                                                                                                                            e,
                                                                                                                                                                            'May Sponsor',
                                                                                                                                                                          )
                                                                                                                                                                        : 'tr' ==
                                                                                                                                                                            h
                                                                                                                                                                          ? t(
                                                                                                                                                                              e,
                                                                                                                                                                              'Sponsorlu',
                                                                                                                                                                            )
                                                                                                                                                                          : 'tt' ==
                                                                                                                                                                              h
                                                                                                                                                                            ? t(
                                                                                                                                                                                e,
                                                                                                                                                                                'Хәйрияче',
                                                                                                                                                                              )
                                                                                                                                                                            : 'tz' ==
                                                                                                                                                                                h
                                                                                                                                                                              ? t(
                                                                                                                                                                                  e,
                                                                                                                                                                                  'ⵉⴷⵍ',
                                                                                                                                                                                )
                                                                                                                                                                              : 'ur' ==
                                                                                                                                                                                  h
                                                                                                                                                                                ? t(
                                                                                                                                                                                    e,
                                                                                                                                                                                    'سپانسرڈ',
                                                                                                                                                                                  )
                                                                                                                                                                                : 'uz' ==
                                                                                                                                                                                    h
                                                                                                                                                                                  ? t(
                                                                                                                                                                                      e,
                                                                                                                                                                                      'Reklama',
                                                                                                                                                                                    )
                                                                                                                                                                                  : 'vi' ==
                                                                                                                                                                                      h
                                                                                                                                                                                    ? t(
                                                                                                                                                                                        e,
                                                                                                                                                                                        'Được tài trợ',
                                                                                                                                                                                      )
                                                                                                                                                                                    : 'zh-Hans' ==
                                                                                                                                                                                        h
                                                                                                                                                                                      ? t(
                                                                                                                                                                                          e,
                                                                                                                                                                                          '赞助内容',
                                                                                                                                                                                        )
                                                                                                                                                                                      : 'zh-Hant' ==
                                                                                                                                                                                          h &&
                                                                                                                                                                                        t(
                                                                                                                                                                                          e,
                                                                                                                                                                                          '贊助',
                                                                                                                                                                                        );
            if (0 < s.length && 0 < c.length && 0 < d.length && 0 < i.length) {
              for (cont = 0; cont < s.length; cont++) 0 < s[cont].offsetHeight && ((cont = s.length), (n = 1));
              for (cont1 = 0; cont1 < c.length; cont1++) 0 < c[cont1].offsetHeight && ((cont1 = c.length), (a = 1));
              for (cont2 = 0; cont2 < d.length; cont2++) 0 < d[cont2].offsetHeight && ((cont2 = d.length), (l = 1));
              for (cont3 = 0; cont3 < i.length; cont3++) 0 < i[cont3].offsetHeight && ((cont3 = i.length), (r = 1));
              if (1 == n && 1 == a && 1 == l && 1 == r) {
                y = e.querySelectorAll('a[href]')[2].innerText;
                (f += 1), (e.style = 'display:none!important;');
              }
            }
          }
        });
      }),
      f = 0;
    e.observe(document, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      attributes: !0,
    });
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletsdedupe) {
    window._scriptletsdedupe = {};
  }
  if (window._scriptletsdedupe[source.name]) {
    if (window._scriptletsdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletsdedupe[source.name] = [];
  }
  window._scriptletsdedupe[source.name].push(JSON.stringify(args));
  try {
    facebookReels.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

const scriptletsMap = {
  facebook: facebook,
  'ubo-facebook': facebook,
  'facebook-sponsored': facebookSponsored,
  'ubo-facebook-sponsored': facebookSponsored,
  'facebook-videos': facebookVideos,
  'ubo-facebook-videos': facebookVideos,
  'facebook-marketplace-item': facebookMarketplaceItem,
  'ubo-facebook-marketplace-item': facebookMarketplaceItem,
  'facebook-marketplace-hide': facebookMarketplaceHide,
  'ubo-facebook-marketplace-hide': facebookMarketplaceHide,
  'facebook-marketplace-upsell': facebookMarketplaceUpsell,
  'ubo-facebook-marketplace-upsell': facebookMarketplaceUpsell,
  'facebook-marketplace': facebookMarketplace,
  'ubo-facebook-marketplace': facebookMarketplace,
  'facebook-reels': facebookReels,
  'ubo-facebook-reels': facebookReels,
  netflix: netflix,
  'ubo-netflix': netflix,
  'yt-shorts': ytShorts,
  'ubo-yt-shorts': ytShorts,
};

var getUniqueScriptletFunction = (name) => scriptletsMap[name];

export { getUniqueScriptletFunction };
