var argv = require('yargs').argv;

module.exports = {
  plugins: {
    'istanbul': {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '**/vaadin-combo-box/src/*.html'
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 94
        }
      }
    },
    'random-output': true
  },
  registerHooks: function(context) {
    var saucelabsPlatforms = [
      'macOS 10.12/iphone@10.3',
      'Windows 10/microsoftedge@15',
      'Windows 10/internet explorer@11',
      'macOS 10.12/safari@11.0',
      'macOS 9.3.2/iphone@9.3'
    ];

    var cronPlatforms = [
      'Android/chrome',
      'macOS 10.12/ipad@10.3',
      'Windows 10/chrome@59',
      'Windows 10/firefox@54'
    ];

    if (argv.env === 'saucelabs') {
      context.options.plugins.sauce.browsers = saucelabsPlatforms;
    } else if (argv.env === 'saucelabs-cron') {
      context.options.plugins.sauce.browsers = cronPlatforms;
    }
  }
};
