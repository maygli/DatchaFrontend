export function useDragNDropDialog() {
  document.addEventListener("mousedown", e => {
    processMouseDown(e)
  })
  document.addEventListener("touchstart", e => {
    processTouchStart(e)
  })
  document.addEventListener("mousemove", e => {
    processMouseMove(e)
  })
  document.addEventListener("touchmove", e => {
    processTouchMove(e)
  })
  document.addEventListener("mouseup", () => {
    processMouseUp()
  })
  document.addEventListener("touchend", () => {
    processMouseUp()
  })
}

const d = {}

function isMovable(targ) {
  return targ.classList?.contains(".vss-movable")
}

function startDrag(target, clientX, clientY) {
  const closestDialog = target.closest(".v-overlay__content")
  const title = closestDialog?.querySelector(".v-card-title")
  if (closestDialog != null && isMovable(closestDialog) && isMovable(target)) {
    d.el = closestDialog // movable element
    d.handle = title // enable dlg to be moved down beyond bottom
    d.mouseStartX = clientX
    d.mouseStartY = clientY
    d.elStartX = d.el.getBoundingClientRect().left
    d.elStartY = d.el.getBoundingClientRect().top
    d.el.style.position = "fixed"
    d.el.style.margin = 0
    d.oldTransition = d.el.style.transition
    d.el.style.transition = "none"
  }
}

function moveDrag(clientX, clientY) {
  if (d.el === undefined) return
  d.el.style.left = Math.min(
    Math.max(d.elStartX + clientX - d.mouseStartX, 0),
    window.innerWidth - d.el.getBoundingClientRect().width
  ) + "px"
  d.el.style.top = Math.min(
    Math.max(d.elStartY + clientY - d.mouseStartY, 0),
    window.innerHeight - d.handle.getBoundingClientRect().height
  ) + "px"
}

function processMouseDown(e) {
  if (e.button === 0) {
    startDrag(e.target, e.clientX, e.clientY)
  }
}

function processTouchStart(e) {
  if (e.touches && e.touches.length > 0) {
    startDrag(e.touches.item(0).target, e.touches.item(0).clientX, e.touches.item(0).clientY)
  }
}

function processMouseMove(e) {
  moveDrag(e.clientX, e.clientY)
}

function processTouchMove(e) {
  if (e.touches && e.touches.length > 0) {
    moveDrag(e.touches.item(0).clientX, e.touches.item(0).clientY)
  }
}

function processMouseUp() {
  if (!d.el) return
  d.el.style.transition = d.oldTransition
  d.el = undefined
}

