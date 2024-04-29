export default {
  get: (id, arr) => (id ? arr.filter(item => item.id == id)[0] : arr),
  validate: data => (data ? true : false), // TODO: implement validation
}
