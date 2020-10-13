import Vue from 'vue'
import moment from "moment"

Vue.filter('title', function (value, replacer = '_') {
  if (!value) return ''
  value = value.toString()

  const arr = value.split(replacer)
  const capitalized_array = []
  arr.forEach((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalized_array.push(capitalized)
  })
  return capitalized_array.join(' ')
})


Vue.filter('formatDate', (value) => {
  return moment(value).format('MMMM Do YYYY')
})

Vue.filter('formatDateTime', (value) => {
  return moment(String(value)).format("MM/DD/YYYY hh:mm");
})