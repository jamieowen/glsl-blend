var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FINE"] = 0] = "FINE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["SEVERE"] = 4] = "SEVERE";
    LogLevel[LogLevel["NONE"] = 5] = "NONE";
})(LogLevel || (LogLevel = {}));

const NULL_LOGGER = Object.freeze({
    level: LogLevel.NONE,
    fine() { },
    debug() { },
    info() { },
    warn() { },
    severe() { },
});
class ConsoleLogger {
    constructor(id, level = LogLevel.FINE) {
        this.id = id;
        this.level = level;
    }
    fine(...args) {
        this.level <= LogLevel.FINE && this.log("FINE", args);
    }
    debug(...args) {
        this.level <= LogLevel.DEBUG && this.log("DEBUG", args);
    }
    info(...args) {
        this.level <= LogLevel.INFO && this.log("INFO", args);
    }
    warn(...args) {
        this.level <= LogLevel.WARN && this.log("WARN", args);
    }
    severe(...args) {
        this.level <= LogLevel.SEVERE && this.log("SEVERE", args);
    }
    log(level, args) {
        console.log(`[${level}] ${this.id}:`, ...args);
    }
}

export { ConsoleLogger as C, NULL_LOGGER as N };
