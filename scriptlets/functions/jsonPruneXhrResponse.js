function jsonPruneXhrResponse(source, args) {
  function jsonPruneXhrResponse(source, propsToRemove, obligatoryProps) {
    var propsToMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var stack = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    if (typeof Proxy === 'undefined') {
      return;
    }
    var shouldLog = !propsToRemove && !obligatoryProps;
    var prunePaths = getPrunePath(propsToRemove);
    var requiredPaths = getPrunePath(obligatoryProps);
    var nativeParse = window.JSON.parse;
    var nativeStringify = window.JSON.stringify;
    var nativeOpen = window.XMLHttpRequest.prototype.open;
    var nativeSend = window.XMLHttpRequest.prototype.send;
    var setRequestHeaderWrapper = function setRequestHeaderWrapper(setRequestHeader, thisArgument, argsList) {
      thisArgument.collectedHeaders.push(argsList);
      return Reflect.apply(setRequestHeader, thisArgument, argsList);
    };
    var setRequestHeaderHandler = {
      apply: setRequestHeaderWrapper,
    };
    var xhrData;
    var openWrapper = function openWrapper(target, thisArg, args) {
      xhrData = getXhrData.apply(null, args);
      if (matchRequestProps(source, propsToMatch, xhrData) || shouldLog) {
        thisArg.xhrShouldBePruned = true;
        thisArg.headersReceived = !!thisArg.headersReceived;
      }
      if (thisArg.xhrShouldBePruned && !thisArg.headersReceived) {
        thisArg.headersReceived = true;
        thisArg.collectedHeaders = [];
        thisArg.setRequestHeader = new Proxy(thisArg.setRequestHeader, setRequestHeaderHandler);
      }
      return Reflect.apply(target, thisArg, args);
    };
    var sendWrapper = function sendWrapper(target, thisArg, args) {
      var stackTrace = new Error().stack || '';
      if (!thisArg.xhrShouldBePruned || (stack && !matchStackTrace(stack, stackTrace))) {
        return Reflect.apply(target, thisArg, args);
      }
      var forgedRequest = new XMLHttpRequest();
      forgedRequest.addEventListener('readystatechange', function () {
        if (forgedRequest.readyState !== 4) {
          return;
        }
        var readyState = forgedRequest.readyState,
          response = forgedRequest.response,
          responseText = forgedRequest.responseText,
          responseURL = forgedRequest.responseURL,
          responseXML = forgedRequest.responseXML,
          status = forgedRequest.status,
          statusText = forgedRequest.statusText;
        var content = responseText || response;
        if (typeof content !== 'string' && typeof content !== 'object') {
          return;
        }
        var modifiedContent;
        if (typeof content === 'string') {
          try {
            var jsonContent = nativeParse(content);
            if (shouldLog) {
              logMessage(
                source,
                ''
                  .concat(window.location.hostname, '\n')
                  .concat(nativeStringify(jsonContent, null, 2), '\nStack trace:\n')
                  .concat(stackTrace),
                true,
              );
              logMessage(source, jsonContent, true, false);
              modifiedContent = content;
            } else {
              modifiedContent = jsonPruner(source, jsonContent, prunePaths, requiredPaths, (stack = ''), {
                nativeStringify: nativeStringify,
              });
              try {
                var responseType = thisArg.responseType;
                switch (responseType) {
                  case '':
                  case 'text':
                    modifiedContent = nativeStringify(modifiedContent);
                    break;

                  case 'arraybuffer':
                    modifiedContent = new TextEncoder().encode(nativeStringify(modifiedContent)).buffer;
                    break;

                  case 'blob':
                    modifiedContent = new Blob([nativeStringify(modifiedContent)]);
                    break;

                  default:
                    break;
                }
              } catch (error) {
                var message = "Response body cannot be converted to reponse type: '".concat(content, "'");
                logMessage(source, message);
                modifiedContent = content;
              }
            }
          } catch (error) {
            var _message = "Response body cannot be converted to json: '".concat(content, "'");
            logMessage(source, _message);
            modifiedContent = content;
          }
        }
        Object.defineProperties(thisArg, {
          readyState: {
            value: readyState,
            writable: false,
          },
          responseURL: {
            value: responseURL,
            writable: false,
          },
          responseXML: {
            value: responseXML,
            writable: false,
          },
          status: {
            value: status,
            writable: false,
          },
          statusText: {
            value: statusText,
            writable: false,
          },
          response: {
            value: modifiedContent,
            writable: false,
          },
          responseText: {
            value: modifiedContent,
            writable: false,
          },
        });
        setTimeout(function () {
          var stateEvent = new Event('readystatechange');
          thisArg.dispatchEvent(stateEvent);
          var loadEvent = new Event('load');
          thisArg.dispatchEvent(loadEvent);
          var loadEndEvent = new Event('loadend');
          thisArg.dispatchEvent(loadEndEvent);
        }, 1);
        hit(source);
      });
      nativeOpen.apply(forgedRequest, [xhrData.method, xhrData.url, Boolean(xhrData.async)]);
      thisArg.collectedHeaders.forEach(function (header) {
        forgedRequest.setRequestHeader(header[0], header[1]);
      });
      thisArg.collectedHeaders = [];
      try {
        nativeSend.call(forgedRequest, args);
      } catch (_unused) {
        return Reflect.apply(target, thisArg, args);
      }
      return undefined;
    };
    var openHandler = {
      apply: openWrapper,
    };
    var sendHandler = {
      apply: sendWrapper,
    };
    XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, openHandler);
    XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, sendHandler);
  }
  function hit(source) {
    if (source.verbose !== true) {
      return;
    }
    try {
      var log = console.log.bind(console);
      var trace = console.trace.bind(console);
      var prefix = '';
      if (source.domainName) {
        prefix += ''.concat(source.domainName);
      }
      prefix += "#%#//scriptlet('".concat(source.name, "', '").concat(source.args.join(', '), "')");
      log(''.concat(prefix, ' trace start'));
      if (trace) {
        trace();
      }
      log(''.concat(prefix, ' trace end'));
    } catch (e) {}
    if (typeof window.__debug === 'function') {
      window.__debug(source);
    }
  }
  function logMessage(source, message) {
    var forced = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var convertMessageToString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var name = source.name,
      verbose = source.verbose;
    if (!forced && !verbose) {
      return;
    }
    var nativeConsole = console.log;
    if (!convertMessageToString) {
      nativeConsole(''.concat(name, ':'), message);
      return;
    }
    nativeConsole(''.concat(name, ': ').concat(message));
  }
  function toRegExp() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var DEFAULT_VALUE = '.?';
    var FORWARD_SLASH = '/';
    if (input === '') {
      return new RegExp(DEFAULT_VALUE);
    }
    var delimiterIndex = input.lastIndexOf(FORWARD_SLASH);
    var flagsPart = input.substring(delimiterIndex + 1);
    var regExpPart = input.substring(0, delimiterIndex + 1);
    var isValidRegExpFlag = function isValidRegExpFlag(flag) {
      if (!flag) {
        return false;
      }
      try {
        new RegExp('', flag);
        return true;
      } catch (ex) {
        return false;
      }
    };
    var getRegExpFlags = function getRegExpFlags(regExpStr, flagsStr) {
      if (regExpStr.startsWith(FORWARD_SLASH) && regExpStr.endsWith(FORWARD_SLASH) && !regExpStr.endsWith('\\/') && isValidRegExpFlag(flagsStr)) {
        return flagsStr;
      }
      return '';
    };
    var flags = getRegExpFlags(regExpPart, flagsPart);
    if ((input.startsWith(FORWARD_SLASH) && input.endsWith(FORWARD_SLASH)) || flags) {
      var regExpInput = flags ? regExpPart : input;
      return new RegExp(regExpInput.slice(1, -1), flags);
    }
    var escaped = input
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped);
  }
  function jsonPruner(source, root, prunePaths, requiredPaths, stack, nativeObjects) {
    var nativeStringify = nativeObjects.nativeStringify;
    if (prunePaths.length === 0 && requiredPaths.length === 0) {
      logMessage(
        source,
        ''
          .concat(window.location.hostname, '\n')
          .concat(nativeStringify(root, null, 2), '\nStack trace:\n')
          .concat(new Error().stack),
        true,
      );
      if (root && typeof root === 'object') {
        logMessage(source, root, true, false);
      }
      return root;
    }
    try {
      if (isPruningNeeded(source, root, prunePaths, requiredPaths, stack, nativeObjects) === false) {
        return root;
      }
      prunePaths.forEach(function (path) {
        var ownerObjArr = getWildcardPropertyInChain(root, path, true);
        ownerObjArr.forEach(function (ownerObj) {
          if (ownerObj !== undefined && ownerObj.base) {
            delete ownerObj.base[ownerObj.prop];
            hit(source);
          }
        });
      });
    } catch (e) {
      logMessage(source, e);
    }
    return root;
  }
  function getPrunePath(props) {
    var validPropsString = typeof props === 'string' && props !== undefined && props !== '';
    return validPropsString ? props.split(/ +/) : [];
  }
  function objectToString(obj) {
    if (!obj || typeof obj !== 'object') {
      return String(obj);
    }
    if (isEmptyObject(obj)) {
      return '{}';
    }
    return Object.entries(obj)
      .map(function (pair) {
        var key = pair[0];
        var value = pair[1];
        var recordValueStr = value;
        if (value instanceof Object) {
          recordValueStr = '{ '.concat(objectToString(value), ' }');
        }
        return ''.concat(key, ':"').concat(recordValueStr, '"');
      })
      .join(' ');
  }
  function matchRequestProps(source, propsToMatch, requestData) {
    if (propsToMatch === '' || propsToMatch === '*') {
      return true;
    }
    var isMatched;
    var parsedData = parseMatchProps(propsToMatch);
    if (!isValidParsedData(parsedData)) {
      logMessage(source, 'Invalid parameter: '.concat(propsToMatch));
      isMatched = false;
    } else {
      var matchData = getMatchPropsData(parsedData);
      var matchKeys = Object.keys(matchData);
      isMatched = matchKeys.every(function (matchKey) {
        var matchValue = matchData[matchKey];
        var dataValue = requestData[matchKey];
        return (
          Object.prototype.hasOwnProperty.call(requestData, matchKey) &&
          typeof dataValue === 'string' &&
          (matchValue === null || matchValue === void 0 ? void 0 : matchValue.test(dataValue))
        );
      });
    }
    return isMatched;
  }
  function getXhrData(method, url, async, user, password) {
    return {
      method: method,
      url: url,
      async: async,
      user: user,
      password: password,
    };
  }
  function isPruningNeeded(source, root, prunePaths, requiredPaths, stack, nativeObjects) {
    if (!root) {
      return false;
    }
    var nativeStringify = nativeObjects.nativeStringify;
    var shouldProcess;
    if (prunePaths.length === 0 && requiredPaths.length > 0) {
      var rootString = nativeStringify(root);
      var matchRegex = toRegExp(requiredPaths.join(''));
      var shouldLog = matchRegex.test(rootString);
      if (shouldLog) {
        logMessage(
          source,
          ''
            .concat(window.location.hostname, '\n')
            .concat(nativeStringify(root, null, 2), '\nStack trace:\n')
            .concat(new Error().stack),
          true,
        );
        if (root && typeof root === 'object') {
          logMessage(source, root, true, false);
        }
        shouldProcess = false;
        return shouldProcess;
      }
    }
    if (stack && !matchStackTrace(stack, new Error().stack || '')) {
      shouldProcess = false;
      return shouldProcess;
    }
    var wildcardSymbols = ['.*.', '*.', '.*', '.[].', '[].', '.[]'];
    var _loop = function _loop() {
      var requiredPath = requiredPaths[i];
      var lastNestedPropName = requiredPath.split('.').pop();
      var hasWildcard = wildcardSymbols.some(function (symbol) {
        return requiredPath.includes(symbol);
      });
      var details = getWildcardPropertyInChain(root, requiredPath, hasWildcard);
      if (!details.length) {
        shouldProcess = false;
        return {
          v: shouldProcess,
        };
      }
      shouldProcess = !hasWildcard;
      for (var j = 0; j < details.length; j += 1) {
        var hasRequiredProp = typeof lastNestedPropName === 'string' && details[j].base[lastNestedPropName] !== undefined;
        if (hasWildcard) {
          shouldProcess = hasRequiredProp || shouldProcess;
        } else {
          shouldProcess = hasRequiredProp && shouldProcess;
        }
      }
    };
    for (var i = 0; i < requiredPaths.length; i += 1) {
      var _ret = _loop();
      if (typeof _ret === 'object') return _ret.v;
    }
    return shouldProcess;
  }
  function matchStackTrace(stackMatch, stackTrace) {
    if (!stackMatch || stackMatch === '') {
      return true;
    }
    if (shouldAbortInlineOrInjectedScript(stackMatch, stackTrace)) {
      return true;
    }
    var stackRegexp = toRegExp(stackMatch);
    var refinedStackTrace = stackTrace
      .split('\n')
      .slice(2)
      .map(function (line) {
        return line.trim();
      })
      .join('\n');
    return getNativeRegexpTest().call(stackRegexp, refinedStackTrace);
  }
  function getMatchPropsData(data) {
    var matchData = {};
    var dataKeys = Object.keys(data);
    dataKeys.forEach(function (key) {
      matchData[key] = toRegExp(data[key]);
    });
    return matchData;
  }
  function getRequestProps() {
    return ['url', 'method', 'headers', 'body', 'credentials', 'cache', 'redirect', 'referrer', 'referrerPolicy', 'integrity', 'keepalive', 'signal', 'mode'];
  }
  function isValidParsedData(data) {
    return Object.values(data).every(function (value) {
      return isValidStrPattern(value);
    });
  }
  function parseMatchProps(propsToMatchStr) {
    var PROPS_DIVIDER = ' ';
    var PAIRS_MARKER = ':';
    var isRequestProp = function isRequestProp(prop) {
      return getRequestProps().includes(prop);
    };
    var propsObj = {};
    var props = propsToMatchStr.split(PROPS_DIVIDER);
    props.forEach(function (prop) {
      var dividerInd = prop.indexOf(PAIRS_MARKER);
      var key = prop.slice(0, dividerInd);
      if (isRequestProp(key)) {
        var value = prop.slice(dividerInd + 1);
        propsObj[key] = value;
      } else {
        propsObj.url = prop;
      }
    });
    return propsObj;
  }
  function isValidStrPattern(input) {
    var FORWARD_SLASH = '/';
    var str = escapeRegExp(input);
    if (input[0] === FORWARD_SLASH && input[input.length - 1] === FORWARD_SLASH) {
      str = input.slice(1, -1);
    }
    var isValid;
    try {
      isValid = new RegExp(str);
      isValid = true;
    } catch (e) {
      isValid = false;
    }
    return isValid;
  }
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && !obj.prototype;
  }
  function getWildcardPropertyInChain(base, chain) {
    var lookThrough = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var output = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var pos = chain.indexOf('.');
    if (pos === -1) {
      if (chain === '*' || chain === '[]') {
        for (var key in base) {
          if (Object.prototype.hasOwnProperty.call(base, key)) {
            output.push({
              base: base,
              prop: key,
            });
          }
        }
      } else {
        output.push({
          base: base,
          prop: chain,
        });
      }
      return output;
    }
    var prop = chain.slice(0, pos);
    var shouldLookThrough = (prop === '[]' && Array.isArray(base)) || (prop === '*' && base instanceof Object);
    if (shouldLookThrough) {
      var nextProp = chain.slice(pos + 1);
      var baseKeys = Object.keys(base);
      baseKeys.forEach(function (key) {
        var item = base[key];
        getWildcardPropertyInChain(item, nextProp, lookThrough, output);
      });
    }
    if (Array.isArray(base)) {
      base.forEach(function (key) {
        var nextBase = key;
        if (nextBase !== undefined) {
          getWildcardPropertyInChain(nextBase, chain, lookThrough, output);
        }
      });
    }
    var nextBase = base[prop];
    chain = chain.slice(pos + 1);
    if (nextBase !== undefined) {
      getWildcardPropertyInChain(nextBase, chain, lookThrough, output);
    }
    return output;
  }
  function shouldAbortInlineOrInjectedScript(stackMatch, stackTrace) {
    var INLINE_SCRIPT_STRING = 'inlineScript';
    var INJECTED_SCRIPT_STRING = 'injectedScript';
    var INJECTED_SCRIPT_MARKER = '<anonymous>';
    var isInlineScript = function isInlineScript(match) {
      return match.includes(INLINE_SCRIPT_STRING);
    };
    var isInjectedScript = function isInjectedScript(match) {
      return match.includes(INJECTED_SCRIPT_STRING);
    };
    if (!(isInlineScript(stackMatch) || isInjectedScript(stackMatch))) {
      return false;
    }
    var documentURL = window.location.href;
    var pos = documentURL.indexOf('#');
    if (pos !== -1) {
      documentURL = documentURL.slice(0, pos);
    }
    var stackSteps = stackTrace
      .split('\n')
      .slice(2)
      .map(function (line) {
        return line.trim();
      });
    var stackLines = stackSteps.map(function (line) {
      var stack;
      var getStackTraceURL = /(.*?@)?(\S+)(:\d+):\d+\)?$/.exec(line);
      if (getStackTraceURL) {
        var _stackURL, _stackURL2;
        var stackURL = getStackTraceURL[2];
        if ((_stackURL = stackURL) !== null && _stackURL !== void 0 && _stackURL.startsWith('(')) {
          stackURL = stackURL.slice(1);
        }
        if ((_stackURL2 = stackURL) !== null && _stackURL2 !== void 0 && _stackURL2.startsWith(INJECTED_SCRIPT_MARKER)) {
          var _stackFunction;
          stackURL = INJECTED_SCRIPT_STRING;
          var stackFunction = getStackTraceURL[1] !== undefined ? getStackTraceURL[1].slice(0, -1) : line.slice(0, getStackTraceURL.index).trim();
          if ((_stackFunction = stackFunction) !== null && _stackFunction !== void 0 && _stackFunction.startsWith('at')) {
            stackFunction = stackFunction.slice(2).trim();
          }
          stack = ''.concat(stackFunction, ' ').concat(stackURL).trim();
        } else {
          stack = stackURL;
        }
      } else {
        stack = line;
      }
      return stack;
    });
    if (stackLines) {
      for (var index = 0; index < stackLines.length; index += 1) {
        if (isInlineScript(stackMatch) && documentURL === stackLines[index]) {
          return true;
        }
        if (isInjectedScript(stackMatch) && stackLines[index].startsWith(INJECTED_SCRIPT_STRING)) {
          return true;
        }
      }
    }
    return false;
  }
  function getNativeRegexpTest() {
    var descriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, 'test');
    var nativeRegexTest = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
    if (descriptor && typeof descriptor.value === 'function') {
      return nativeRegexTest;
    }
    throw new Error('RegExp.prototype.test is not a function');
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletdedupe) {
    window._scriptletdedupe = {};
  }
  if (window._scriptletdedupe[source.name]) {
    if (window._scriptletdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletdedupe[source.name] = [];
  }
  window._scriptletdedupe[source.name].push(JSON.stringify(args));
  try {
    jsonPruneXhrResponse.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

export default jsonPruneXhrResponse;
