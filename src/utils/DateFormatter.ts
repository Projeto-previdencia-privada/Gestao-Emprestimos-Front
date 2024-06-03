function formatDate(date: string) {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8)

    return `${day}/${month}/${year}`
}

export default formatDate;