
const fixDate = (date) => {
    //Convert the date to local date and replace erelvant chars.
    const fixed = new Date(date).toLocaleDateString('he-IL', {timeZone:'Asia/Jerusalem'}).replace(/\D/g,'/')
    return fixed
}

export {fixDate}