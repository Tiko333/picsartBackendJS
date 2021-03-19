function MyEventEmitter() {
    this.eventMap = new Map();
    this.maxListeners = 10;
}

MyEventEmitter.prototype.on = function (eventName, listener) {
    if (!this.eventMap.has(eventName)) {
        this.eventMap.set(eventName, {
            listeners: [],
            isOnce: false
        });
    }

    this.eventMap.get(eventName).listeners.push(listener);
    if (this.eventMap.get(eventName).listeners.length > this.maxListeners) {
        console.warn(`Possible EventEmitter memory leak detected. ${this.eventMap.get(eventName).listeners.length} connection listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
    }
    return this;
}

MyEventEmitter.prototype.addListener = function (eventName, listener) {
    if (!this.eventMap.has(eventName)) {
        this.eventMap.set(eventName, {
            listeners: [],
            isOnce: false
        });
    }

    this.eventMap.get(eventName).listeners.push(listener);
    if (this.eventMap.get(eventName).listeners.length > this.maxListeners) {
        console.warn(`Possible EventEmitter memory leak detected. ${this.eventMap.get(eventName).listeners.length} connection listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
    }
}

MyEventEmitter.prototype.once = function (eventName, listener) {
    if (!this.eventMap.has(eventName)) {
        this.eventMap.set(eventName, {
            listeners: [],
            isOnce: true
        });
    }

    this.eventMap.get(eventName).listeners.push(listener);
    if (this.eventMap.get(eventName).listeners.length > this.maxListeners) {
        console.warn(`Possible EventEmitter memory leak detected. ${this.eventMap.get(eventName).listeners.length} connection listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
    }
    return this;
}

MyEventEmitter.prototype.removeListener = function (eventName, listener) {
    if (!this.eventMap.has(eventName)) {
        throw new Error(`event by name: '${eventName}' doesn't exits`);
    }

    const index = this.eventMap.get(eventName).listeners.indexOf(listener);
    this.eventMap.get(eventName).listeners.splice(index, 1);
    return this;
}

MyEventEmitter.prototype.removeAllListeners = function (eventName) {
    if (eventName) {
        if (eventName.length === 1) {
            if (!this.eventMap.has(eventName[0])) {
                throw new Error(`event by name: '${eventName}' doesn't exits`);
            }
        } else {
            eventName.forEach(event => {
                if (!this.eventMap.has(event)) {
                    throw new Error(`event by name: '${event}' doesn't exits`);
                }
            })
        }

        let iterableIterator = this.eventMap.entries();
        let next = iterableIterator.next();
        while (!next.done) {
            eventName.forEach(name => {
                if (next.value[0] === name) {
                    next.value[1].listeners = [];
                }
            })

            next = iterableIterator.next();
        }
    } else {
        let iterableIterator = this.eventMap.values();
        let next = iterableIterator.next();
        while (!next.done) {
            next.value.listeners = [];
            next = iterableIterator.next();
        }
    }

    return this;
}

MyEventEmitter.prototype.setMaxListeners = function (n) {
    this.maxListeners = n;
}

MyEventEmitter.prototype.listeners = function (eventName) {
    if (!this.eventMap.has(eventName)) {
        throw new Error(`event by name: '${eventName}' doesn't exits`);
    }

    return this.eventMap.get(eventName).listeners;
}

MyEventEmitter.prototype.listenerCount = function (eventEmitterName, eventName) {
    if (!eventEmitterName.eventMap.has(eventName)) {
        throw new Error(`event by name: '${eventName}' doesn't exits`);
    }

    return eventEmitterName.eventMap.get(eventName).listeners.length;
}

MyEventEmitter.prototype.emit = function (eventName, ...eventNames) {
    let result = false;
    eventNames.unshift(eventName);
    eventNames.forEach(event => {
        if (!this.eventMap.has(event)) {
            const msg = `event by name: '${event}' doesn't exits`;
            throw new Error(msg);
        }

        if (this.eventMap.get(event).listeners.length > 0) {
            let once = this.eventMap.get(event).isOnce;
            this.eventMap.get(event).listeners.forEach(callback => {
                callback()
            })
            if (once) {
                this.eventMap.get(event).listeners = [];
            }
            result = true;
        }
    });

    return result;
}