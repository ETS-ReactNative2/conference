export function getUrl () {
  const random = Math.floor((Math.random() * 100))
  return `https://randomuser.me/api/portraits/men/${random}.jpg`
}
