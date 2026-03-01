let activeHide: (() => void) | undefined

export function useCardTooltip(triggerRef: Ref<HTMLElement | undefined>) {
	const tooltipId = useId()
	const visible = ref(false)
	const bubbleRef = ref<HTMLElement>()
	const bubbleStyle = ref<Record<string, string>>({})

	let hoverTimeout: ReturnType<typeof setTimeout> | undefined
	let dismissed = false

	function show() {
		if (activeHide && activeHide !== hide) activeHide()
		activeHide = hide
		visible.value = true
		document.body.classList.add('tooltip-open')
	}

	function hide() {
		if (activeHide === hide) activeHide = undefined
		visible.value = false
		if (!activeHide) document.body.classList.remove('tooltip-open')
	}

	function updatePosition() {
		if (!triggerRef.value) return
		const rect = triggerRef.value.getBoundingClientRect()
		bubbleStyle.value = {
			top: `${rect.bottom + 8 + window.scrollY}px`,
			left: `${rect.left + rect.width / 2 + window.scrollX}px`,
		}
	}

	function onMouseEnter() {
		if (dismissed) return
		clearTimeout(hoverTimeout)
		hoverTimeout = setTimeout(() => {
			updatePosition()
			show()
		}, 100)
	}

	function cancelHide() {
		clearTimeout(hoverTimeout)
	}

	function onMouseLeave() {
		dismissed = false
		clearTimeout(hoverTimeout)
		hoverTimeout = setTimeout(() => {
			hide()
		}, 100)
	}

	function onFocus() {
		if (!triggerRef.value?.matches(':focus-visible')) return
		clearTimeout(hoverTimeout)
		updatePosition()
		show()
	}

	function onBlur() {
		hide()
	}

	function toggle(e: MouseEvent) {
		if (visible.value) {
			hide()
		} else {
			e.stopPropagation()
			updatePosition()
			show()
		}
	}

	function onDocumentClick() {
		if (!visible.value) return
		dismissed = true
		clearTimeout(hoverTimeout)
		hide()
	}

	onMounted(() => {
		document.addEventListener('click', onDocumentClick)
	})

	onUnmounted(() => {
		document.removeEventListener('click', onDocumentClick)
		clearTimeout(hoverTimeout)
	})

	return {
		visible,
		tooltipId,
		bubbleRef,
		bubbleStyle,
		onMouseEnter,
		onMouseLeave,
		cancelHide,
		onFocus,
		onBlur,
		toggle,
	}
}
