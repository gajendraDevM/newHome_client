 const limitDesc = (str, size=140) =>{

let more = str.length > size ? '....' : ''


    return str.slice(0, size)+ more;
}

export default limitDesc