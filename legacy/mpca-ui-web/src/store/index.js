import { proxy }from 'valtio'
const state = proxy({
    page: 'intro', 
    backgroundColor: '#EFBD48',
})
export default state