export function formatDate(str) {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let month_str = month;
    if (month < 10) {
        month_str = `0${month}`
    }

    let date_str = d;
    if (d < 10) {
        date_str = `0${d}`
    }
    return `${year}-${month_str}-${date_str} ${hour}:${minutes}`
}