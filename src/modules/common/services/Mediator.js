
let Mediator = {
    channels:{},
    subscribe: function(channel, func, context) {
        if(!this.channels[channel])
            this.channels[channel] = [];

        this.channels[channel].push({context: context, callback: func});
        return this;
    },
    publish: function(channel) {
        if(this.channels[channel])
        {
            let args = Array.prototype.slice(arguments, 1);
            this.channels[channel].forEach(
                subscription => subscription.callback.apply(subscription.context, args)
            );
        }

        return this;
    }

};

export default Mediator;