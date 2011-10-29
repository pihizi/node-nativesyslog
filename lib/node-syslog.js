var dgram = require('dgram');

this.version = [1, 0, 0]

this.LOG_AUTH = 4*8
this.LOG_AUTHPRIV = 10*8
this.LOG_CRON = 9*8
this.LOG_DAEMON = 3*8
this.LOG_FTP = 11*8
this.LOG_KERN = 0
this.LOG_LOCAL0 = 16*8
this.LOG_LOCAL1 = 17*8
this.LOG_LOCAL2 = 18*8
this.LOG_LOCAL3 = 19*8
this.LOG_LOCAL4 = 20*8
this.LOG_LOCAL5 = 21*8
this.LOG_LOCAL6 = 22*8
this.LOG_LOCAL7 = 23*8
this.LOG_LPR = 6*8
this.LOG_MAIL = 2*8
this.LOG_NEWS = 7*8
this.LOG_SYSLOG = 5*8
this.LOG_USER = 1*8
this.LOG_UUCP = 8*8

this.LOG_EMERG = 0
this.LOG_ALERT = 1
this.LOG_CRIT = 2
this.LOG_ERR = 3
this.LOG_WARNING = 4
this.LOG_NOTICE = 5
this.LOG_INFO = 6
this.LOG_DEBUG = 7

this.Syslog = function(ident, sock) {
	if (!sock) {
		sock = '/dev/log'
	}
	this.socket = dgram.createSocket("unix_dgram");
	this.ident = ident
	this.sock = sock
}

this.Syslog.prototype.log = function (priority, message) {
	var ts = new Date()
	var pri = parseInt(priority)
	if (pri < 0 || pri > 8*23+7) {
		throw "Invalid syslog priority value: " + priority
	}
	var month = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Aug',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec'
	}[ts.getMonth() + 1]
	var day = ts.getDate();
	var hours = ts.getHours()
	var minutes = ts.getMinutes()
	var seconds = ts.getSeconds()
	var msg = new Buffer('<' + pri + '>' + month + ' ' + (day < 10?' ':'') + day + ' ' + (hours < 10?'0':'') +
		hours +	':'  + (minutes < 10?'0':'') + minutes + ':' + (seconds < 10?'0':'') + seconds + ' ' +
		this.ident + ': ' + message)
	this.socket.send(msg, 0, msg.length, this.sock,
		function (err) {
			if (err) {
				throw err;
			}
		}
	)
}
