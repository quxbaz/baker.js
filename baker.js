/**
 * baker.js
 *   Written by David Yeung
 *
 * A cookie manager that simplifies creating, replacing, deleting, and reading
 * cookies.
 *
 * FUNCTIONS
 * --------------------------------------------
 *
 * baker.setCookie(name, value, duration, unit)
 *
 *   Creates a new cookie, or sets an existing one if the name given refers to
 *   an existing cookie.
 *
 *   Example: baker.setCookie('age_of_consent', 18, 7, 'days');
 *   
 *   name
 *     The name of the cookie.
 *
 *   value
 *     The value of the cookie.
 *
 *   duration [type=int, default=7]
 *     Amount of time before the cookie expires.
 *
 *   unit [type=string, default='day']
 *     The unit of time to use for the duration. Acceptable values are 'day',
 *     'hour', 'minute', and 'second'.
 *
 *   Notes
 *     unit is not yet implemented. Duration can only be set to a number of
 *     days.
 *
 * --------------------------------------------
 *
 * baker.getCookie(name)
 *
 *   Gets a cookie value by name.
 *
 * baker.deleteCookie(name)
 *
 *   Sets a cookie to expire.
 *
 * --------------------------------------------
 *
 * baker.setManyCookies(cookies, duration, unit)
 *
 *   Creates or sets multiple cookies.
 *
 *   Example:
 *     var cookies = {'age': 12, 'visitor_number': 99};
 *     baker.setManyCookies(cookies, 31, 'days');
 *
 *   cookies [type=object]
 *     A object of name-value pairs.
 *
 *   duration, unit
 *     See baker.setCookie()
 *
 * --------------------------------------------
 *
 * baker.getAllCookies()
 *
 *   Gets all cookies in the form of an object.
 *
 *   return [type=object]
 *     A set of name-value pairs.
 *
 * --------------------------------------------
 *
 * baker.clearCookies()
 *
 *   Sets all cookies to expire.
 *
 * --------------------------------------------
 *
 * Dependencies
 *   jQuery (we're only using it for the .ready() event handler)
 */

var baker = {};

$(document).ready(function() {

  // Creates a new cookie or possibly changes an existing one.
  // todo
  //   implement unit (allow duration to be days, hours, minutes, or secs)
  baker.setCookie = function(name, value, duration, unit) {

    duration = duration == undefined ? 7 : duration;
    unit = unit == undefined ? 'day' : unit;
    
    var d = new Date();
    d.setDate(d.getDate() + duration);
    document.cookie = name + "=" + escape(value)
      + ';expires=' + d.toUTCString()
      + ';path=/';
  }

  // Sets multiple cookies. 'cookies' is an object composed of name-value pairs.
  baker.setManyCookies = function(cookies, duration, unit) {
    for (var key in cookies) {
      baker.setCookie(key, cookies[key], duration, unit);
    }
  }

  // Gets a specific cookie.
  baker.getCookie = function(name) {
    var pairs = document.cookie.split('; ');
    for (var i=0; i < pairs.length; i++) {
      var name_val = pairs[i].split('=');
      if (name_val[0] == name) {
        return unescape(name_val[1]);
      }
    }
    return "";
  }

  // Gets all cookies as a JavaScript object.
  baker.getAllCookies = function() {
    var cookies = {};
    var pairs = '';
    if (document.cookie != '') {
      pairs = document.cookie.split('; ');
    }
    for (var i=0; i < pairs.length; i++) {
      var name_val = pairs[i].split('=');
      cookies[name_val[0]] = unescape(name_val[1]);
    }
    return cookies;
  }

  // Sets a cookie to expire.
  baker.deleteCookie = function(names) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    document.cookie = name + "="
      + ';expires=' + d.toUTCString()
      + ';path=/';
  }

  // Sets all cookies to expire.
  baker.clearCookies = function() {
    cookies = baker.getAllCookies();
    for (var key in cookies) {
      baker.deleteCookie(key);
    }
  }

  // Debug method that logs the names and values of all cookies.
  baker.printCookies = function(newlines) {
    if (newlines) {
      var cookies = baker.getAllCookies();
      for (var key in cookies) {
        console.log(key + "=" + cookies[key]);
      }
    }
    else { console.log(document.cookie); }
  }

});
