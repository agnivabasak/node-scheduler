const schedule = require('node-schedule');
//node-schedule is used instead of cron as the task at hand is more tiem oriented tha interval oriented
const printText = require('./handlers/printText');

const testDateFormat= (jobDets)=>{
    const date = new Date(jobDets.dateTime)
    //to check if the date provided by the user is a valid date for js to parse
    Date.prototype.isValid = function () {
        return this.getTime() === this.getTime(); //Nan is never equal to Nan
    };

    if(!date.isValid()){
        return false;
    }
    return true;
};

//tests date format for all the events at once
const testDateFormats = (jobsDets)=>{
    for(let i=0;i<jobsDets.length;i++){
        if(!testDateFormat(jobsDets[i])){
            return false;
        }
    }
    return true;
}

//schedules an event to take place to trigger the printText function
const scheduleEvent = (jobDets)=>{
    const date = new Date(jobDets.dateTime)
    console.log("\nEvent scheduled at " + date +"\n")
    const job = schedule.scheduleJob(date,()=>{
            printText(jobDets.text)
    })
}

module.exports = {

    //function to schedule an event
    initScheduler: (jobDets)=>{
        if(!testDateFormat(jobDets)){
            throw new Error("IDF") //invalid date format error
            return;
        }
        scheduleEvent(jobDets)
    },

    initSchedulers: (jobsDets)=>{
        //the execution is stopped if even one of them has an error
        if(!testDateFormats(jobsDets)){
            throw new Error("IDF") //invalid date format error
            return;
        }

        for(let i=0;i<jobsDets.length;i++){
            scheduleEvent(jobsDets[i])
        }
    }
}