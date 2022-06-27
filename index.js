/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const createEmployeeRecord = (array) => {
    const fName = array[0]
    const famName = array[1]
    const titleName = array[2]
    const pph = array[3]
    const tie = []
    const toe = []

    const result = {firstName: fName, 
        familyName: famName, 
        title: titleName, 
        payPerHour: pph, 
        timeInEvents: tie, 
        timeOutEvents: toe
    }

    return result

} 

const createEmployeeRecords = (arrayOfArrays) => {
    const newArray = []
    arrayOfArrays.map((array) => {
        newArray.push(createEmployeeRecord(array))
    }  )
    return newArray
}

const createTimeInEvent = function(time){
    let timeArray = time.split('')
    let dateExtracted = timeArray.slice(0,10).join('')
    let hourExtracted = parseInt(timeArray.slice(11,timeArray.length).join(''))
    this.timeInEvents.push({
        type: "TimeIn",
        hour: hourExtracted,
        date: dateExtracted
    })

    return this   
}



const createTimeOutEvent = function (time) {
    const timeArray = time.split('')
    const dateExtracted = timeArray.slice(0,10).join('')
    const hourExtracted = parseInt(timeArray.slice(11,timeArray.length).join(''))
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: hourExtracted,
        date: dateExtracted
    })

    return this   
}

const hoursWorkedOnDate = function (dateParam) {
    const timeInObject = this.timeInEvents.find(function(time){
        return time.date === dateParam
    })
    const timeOutObject = this.timeOutEvents.find(function(time){
        return time.date === dateParam
    })
    return timeOutObject.hour/100 - timeInObject.hour/100
}

const wagesEarnedOnDate = function (dateParam){
    let hours = hoursWorkedOnDate.apply(this, [dateParam])
    return hours * this.payPerHour
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll =function (arrayOfEmpObject) {
    const amount = arrayOfEmpObject.reduce(function (sum, empObject) {
        return sum += allWagesFor.apply(empObject)
    }, 0)
    return amount
}

const findEmployeeByFirstName = function (array, firstName) {
    return array.find(function(record){
      return record.firstName === firstName
    })
  }

