const grid = document.querySelector<HTMLDivElement>('#grid')
const tiles = document.querySelectorAll<HTMLDivElement>('.tile')
const cursor = document.querySelector<HTMLDivElement>('#cursor')
requestIdleCallback(() => {
  if (!cursor) return
  cursor.dataset.ready = ''
})

tiles.forEach(tile => {
  tile.addEventListener('mouseenter', (e) => {
    const tile = e.currentTarget as HTMLElement
    if (cursor) {
      cursor.style.setProperty('--x', `${tile.offsetLeft}px`)
      cursor.style.setProperty('--y', `${tile.offsetTop}px`)
      cursor.style.setProperty('--w', `${tile.offsetWidth}px`)
      cursor.style.setProperty('--h', `${tile.offsetHeight}px`)
    }
  })
})

grid?.addEventListener('mouseenter', () => {
  requestIdleCallback(() => {
    if (!cursor) return
    cursor.dataset.hover = ''
  })
})
grid?.addEventListener('mouseleave', () => {
  if (!cursor) return
  delete cursor.dataset.hover
})
