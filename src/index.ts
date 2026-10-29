const page = document.querySelector<HTMLElement>('#page')
const cursor = document.querySelector<HTMLDivElement>('#cursor')
const tiles = document.querySelectorAll<HTMLElement>('.tile')

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

function enableCursorEffect() {
  if (!page || !cursor || !finePointer.matches) {
    cursor?.setAttribute('hidden', '')
    return
  }

  cursor.removeAttribute('hidden')

  requestIdleCallback(() => {
    if (!cursor) return
    cursor.dataset.ready = ''
  })

  tiles.forEach((tile) => {
    tile.addEventListener('mouseenter', () => {
      if (!cursor || !page) return
      const pageRect = page.getBoundingClientRect()
      const tileRect = tile.getBoundingClientRect()
      cursor.style.setProperty('--x', `${tileRect.left - pageRect.left + page.scrollLeft}px`)
      cursor.style.setProperty('--y', `${tileRect.top - pageRect.top + page.scrollTop}px`)
      cursor.style.setProperty('--w', `${tileRect.width}px`)
      cursor.style.setProperty('--h', `${tileRect.height}px`)
    })
  })

  page.addEventListener('mouseenter', () => {
    requestIdleCallback(() => {
      if (!cursor) return
      cursor.dataset.hover = ''
    })
  })

  page.addEventListener('mouseleave', () => {
    if (!cursor) return
    delete cursor.dataset.hover
  })
}

enableCursorEffect()
