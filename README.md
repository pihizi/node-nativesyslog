node-syslog
===========

This module is a simple logger for NodeJS to use /dev/log.

Synopsis
========

    var syslog = require('node-syslog')
    var logger = new syslog.Syslog('test')
    logger.log(syslog.LOG_USER + syslog.LOG_ERR, 'Test message ' + Math.random())

API
===

Logging
-------

### Syslog(ident, sock = '/dev/log')

Initializes the Syslog logger object with an ident string.

### syslog.log(priority, message)

Writes a message to syslog. Priority values can be calculated by adding one facility and one severity constant.

Facility constants
------------------

All constants in the syslog.h file are supported.

* LOG_AUTH
* LOG_AUTHPRIV
* LOG_CRON
* LOG_DAEMON
* LOG_FTP
* LOG_KERN
* LOG_LOCAL0
* LOG_LOCAL1
* LOG_LOCAL2
* LOG_LOCAL3
* LOG_LOCAL4
* LOG_LOCAL5
* LOG_LOCAL6
* LOG_LOCAL7
* LOG_LPR
* LOG_MAIL
* LOG_NEWS
* LOG_SYSLOG
* LOG_UUCP

Severity constants
------------------

* LOG_EMERG
* LOG_ALERT
* LOG_CRIT
* LOG_ERR
* LOG_WARNING
* LOG_NOTICE
* LOG_INFO
* LOG_DEBUG
