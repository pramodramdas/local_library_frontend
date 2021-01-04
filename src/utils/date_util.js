
export const dateStringToFormatOne = (d) => {
    d = new Date(d)
    return d.getTime() > 0 ? `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`:""
}