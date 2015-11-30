'use strict';
var args = require('yargs').argv;
var chalk = require('chalk');
var wct = require('web-component-tester').test;
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var htmlExtract = require('gulp-html-extract');

function cleanDone(done) {
  return function(error) {
    if (error) {
      // Pretty error for gulp.
      error = new Error(chalk.red(error.message || error));
      error.showStack = false;
    }
    done(error);
  };
}

function localAddress() {
  var ip, tun, ifaces = require('os').networkInterfaces();
  Object.keys(ifaces).forEach(function(ifname) {
    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' == iface.family && !iface.internal) {
        if (!ip) {
          ip = iface.address;
        }
        if (/tun/.test(ifname)) {
          tun = iface.address;
        }
      }
    });
  });
  return tun || ip;
}

function test(options, done) {
  wct(options, cleanDone(done));
}

function testSauce(browsers, done) {
  test(
    {
      browserOptions: {
        name: localAddress() + ' / ' + new Date(),
        build: 'vaadin-combo-box'
      },
      plugins: {
        sauce: {
          username: args.sauceUsername,
          accessKey: args.sauceAccessKey,
          browsers: browsers
        }
      },
      extraScripts: args.dom === 'shadow' ? ['test/enable-shadow-dom.js'] : [],
      root: '.',
      webserver: {
        port: 2000,
        hostname: localAddress()
      }
    }, done);
}

gulp.task('test:desktop', function(done) {
  testSauce([
    'Windows 10/chrome@45',
    'Windows 10/firefox@41',
    'Windows 10/microsoftedge@20',
    'Windows 10/internet explorer@11',
    'OS X 10.11/safari@9.0'], done);
});

gulp.task('test:mobile', function(done) {
  testSauce([
    'OS X 10.11/iphone@9.0',
    'OS X 10.11/ipad@9.0',
    'Linux/android@5.1'], done);
});

gulp.task('lint:js', function() {
  return gulp.src([
        '*.js',
        'test/*.js'
      ])
      .pipe(jshint())
      .pipe(jshint.reporter())
      .pipe(jshint.reporter('fail'))
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
});

gulp.task('lint:html', function() {
  return gulp.src([
        '*.html',
        'demo/*.html',
        'test/*.html'
      ])
      .pipe(htmlExtract({
        sel: 'script, code-example code'
      }))
      .pipe(jshint())
      .pipe(jshint.reporter())
      .pipe(jshint.reporter('fail'))
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
});

gulp.task('test:shadow', function(done) {
  args.dom = 'shadow';

  testSauce([
    'Windows 10/chrome@45'], done);
});
