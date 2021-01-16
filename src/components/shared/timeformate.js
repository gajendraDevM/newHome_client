import moment from 'moment'

export default function Timeformate(time) {
    return moment(time).fromNow()
}
