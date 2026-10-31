import dayjs from 'dayjs'

export class SupportChatCourseCard {
	courseId: string = ''
	courseTitle: string = ''
	stageId: string = ''
	stageTitle: string = ''
	price: string = '0'
	orderNo: string = ''
	unlockedAt: string = ''

	initFromJSON (json: UTSJSONObject): void {
		const courseId = json.getString('course_id')
		if (courseId != null) {
			this.courseId = courseId
		}
		const courseTitle = json.getString('course_title')
		if (courseTitle != null) {
			this.courseTitle = courseTitle
		}
		const stageId = json.getString('stage_id')
		if (stageId != null) {
			this.stageId = stageId
		}
		const stageTitle = json.getString('stage_title')
		if (stageTitle != null) {
			this.stageTitle = stageTitle
		}
		const price = json.getString('price')
		if (price != null) {
			this.price = price
		}
		const orderNo = json.getString('order_no')
		if (orderNo != null) {
			this.orderNo = orderNo
		}
		const unlockedAt = json.getString('unlocked_at')
		if (unlockedAt != null) {
			this.unlockedAt = unlockedAt
		}
	}
}

export class SupportChatMessage {
	id: string = ''
	conversationId: string = ''
	senderId: string = ''
	senderRole: string = ''
	messageType: string = 'text'
	content: string = ''
	mediaUrl: string = ''
	thumbnailUrl: string = ''
	mediaSize: number = 0
	mediaDuration: number = 0
	course: SupportChatCourseCard | null = null
	order: SupportChatServiceOrderCard | null = null
	createdAt: string = ''
	timeText: string = ''
	pending: boolean = false
	failed: boolean = false

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString('id')
		if (id != null) {
			this.id = id
		}
		const conversationId = json.getString('conversation_id')
		if (conversationId != null) {
			this.conversationId = conversationId
		}
		const senderId = json.getString('sender_id')
		if (senderId != null) {
			this.senderId = senderId
		}
		const senderRole = json.getString('sender_role')
		if (senderRole != null) {
			this.senderRole = senderRole
		}
		const messageType = json.getString('message_type')
		if (messageType != null) {
			this.messageType = messageType
		}
		const content = json.getString('content')
		if (content != null) {
			this.content = content
		}
		const mediaUrl = json.getString('media_url')
		if (mediaUrl != null) {
			this.mediaUrl = mediaUrl
		}
		const thumbnailUrl = json.getString('thumbnail_url')
		if (thumbnailUrl != null) {
			this.thumbnailUrl = thumbnailUrl
		}
		const mediaSize = json.getNumber('media_size')
		if (mediaSize != null) {
			this.mediaSize = mediaSize
		}
		const mediaDuration = json.getNumber('media_duration')
		if (mediaDuration != null) {
			this.mediaDuration = mediaDuration
		}
		const courseJson = json.getJSON('course')
		if (courseJson != null) {
			const card = new SupportChatCourseCard()
			card.initFromJSON(courseJson)
			this.course = card
		}
		const orderJson = json.getJSON('order')
		if (orderJson != null) {
			const card = new SupportChatServiceOrderCard()
			card.initFromJSON(orderJson)
			this.order = card
		}
		const createdAt = json.getString('created_at')
		if (createdAt != null) {
			this.createdAt = createdAt
			this.timeText = formatSupportChatTime(createdAt)
		}
	}
}

export class SupportChatServiceOrderCard {
	kind: string = ''
	recordSource: string = ''
	id: string = ''
	orderNo: string = ''
	paymentNo: string = ''
	amount: string = '0.00'
	amountText: string = '¥0.00'
	title: string = ''
	subtitle: string = ''
	paymentType: number = 0
	paymentTypeText: string = ''
	status: string = ''
	statusText: string = ''
	refundStatus: string = 'NONE'
	refundedAt: string = ''
	occurredAt: string = ''
	createdReason: string = ''
	courseId: string = ''
	stageId: string = ''

	initFromJSON (json: UTSJSONObject): void {
		this.kind = json.getString('kind') ?? ''
		this.recordSource = json.getString('record_source') ?? ''
		this.id = json.getString('id') ?? ''
		this.orderNo = json.getString('order_no') ?? ''
		this.paymentNo = json.getString('payment_no') ?? ''
		this.amount = json.getString('amount') ?? '0.00'
		this.amountText = json.getString('amount_text') ?? '¥0.00'
		this.title = json.getString('title') ?? ''
		this.subtitle = json.getString('subtitle') ?? ''
		this.paymentType = json.getNumber('payment_type', 0)
		this.paymentTypeText = json.getString('payment_type_text') ?? ''
		const statusText = json.getString('status')
		const statusNumber = json.getNumber('status', -1)
		this.status = statusText ?? (statusNumber >= 0 ? statusNumber.toString() : '')
		this.statusText = json.getString('status_text') ?? ''
		this.refundStatus = json.getString('refund_status') ?? 'NONE'
		this.refundedAt = json.getString('refunded_at') ?? ''
		this.occurredAt = json.getString('occurred_at') ?? ''
		this.createdReason = json.getString('created_reason') ?? ''
		this.courseId = json.getString('course_id') ?? ''
		this.stageId = json.getString('stage_id') ?? ''
	}
}

export class SupportChatServiceOrderOption {
	kind: string = ''
	recordSource: string = ''
	id: string = ''
	orderNo: string = ''
	paymentNo: string = ''
	amount: string = '0.00'
	amountText: string = '¥0.00'
	title: string = ''
	subtitle: string = ''
	paymentType: number = 0
	paymentTypeText: string = ''
	status: string = ''
	statusText: string = ''
	refundStatus: string = 'NONE'
	refundedAt: string = ''
	occurredAt: string = ''
	occurredText: string = ''
	createdReason: string = ''

	initFromJSON (json: UTSJSONObject): void {
		this.kind = json.getString('kind') ?? ''
		this.recordSource = json.getString('record_source') ?? ''
		this.id = json.getString('id') ?? ''
		this.orderNo = json.getString('order_no') ?? ''
		this.paymentNo = json.getString('payment_no') ?? ''
		this.amount = json.getString('amount') ?? '0.00'
		this.amountText = json.getString('amount_text') ?? '¥0.00'
		this.title = json.getString('title') ?? ''
		this.subtitle = json.getString('subtitle') ?? ''
		this.paymentType = json.getNumber('payment_type', 0)
		this.paymentTypeText = json.getString('payment_type_text') ?? ''
		const statusText = json.getString('status')
		const statusNumber = json.getNumber('status', -1)
		this.status = statusText ?? (statusNumber >= 0 ? statusNumber.toString() : '')
		this.statusText = json.getString('status_text') ?? ''
		this.refundStatus = json.getString('refund_status') ?? 'NONE'
		this.refundedAt = json.getString('refunded_at') ?? ''
		this.occurredAt = json.getString('occurred_at') ?? ''
		this.createdReason = json.getString('created_reason') ?? ''
		if (this.occurredAt.length > 0) {
			this.occurredText = formatSupportChatTime(this.occurredAt)
		}
	}

	toCard (): SupportChatServiceOrderCard {
		const card = new SupportChatServiceOrderCard()
		card.kind = this.kind
		card.recordSource = this.recordSource
		card.id = this.id
		card.orderNo = this.orderNo
		card.paymentNo = this.paymentNo
		card.amount = this.amount
		card.amountText = this.amountText
		card.title = this.title
		card.subtitle = this.subtitle
		card.paymentType = this.paymentType
		card.paymentTypeText = this.paymentTypeText
		card.status = this.status
		card.statusText = this.statusText
		card.refundStatus = this.refundStatus
		card.refundedAt = this.refundedAt
		card.occurredAt = this.occurredAt
		card.createdReason = this.createdReason
		return card
	}
}

export class SupportChatCourseOption {
	courseId: string = ''
	courseTitle: string = ''
	stageId: string = ''
	stageTitle: string = ''
	price: string = '0'
	orderNo: string = ''
	unlockedAt: string = ''
	unlockedText: string = ''

	initFromJSON (json: UTSJSONObject): void {
		const courseId = json.getString('course_id')
		if (courseId != null) {
			this.courseId = courseId
		}
		const courseTitle = json.getString('course_title')
		if (courseTitle != null) {
			this.courseTitle = courseTitle
		}
		const stageId = json.getString('stage_id')
		if (stageId != null) {
			this.stageId = stageId
		}
		const stageTitle = json.getString('stage_title')
		if (stageTitle != null) {
			this.stageTitle = stageTitle
		}
		const price = json.getString('price')
		if (price != null) {
			this.price = price
		}
		const orderNo = json.getString('order_no')
		if (orderNo != null) {
			this.orderNo = orderNo
		}
		const unlockedAt = json.getString('unlocked_at')
		if (unlockedAt != null) {
			this.unlockedAt = unlockedAt
			this.unlockedText = formatSupportChatTime(unlockedAt)
		}
	}

	toCard (): SupportChatCourseCard {
		const card = new SupportChatCourseCard()
		card.courseId = this.courseId
		card.courseTitle = this.courseTitle
		card.stageId = this.stageId
		card.stageTitle = this.stageTitle
		card.price = this.price
		card.orderNo = this.orderNo
		card.unlockedAt = this.unlockedAt
		return card
	}
}

export function formatSupportChatTime (value: string): string {
	const date = dayjs(value)
	if (!date.isValid()) {
		return value.length >= 16 ? value.substring(0, 16).replace('T', ' ') : value
	}
	const now = dayjs()
	const dayDiff = now.startOf('day').diff(date.startOf('day'), 'day')
	if (dayDiff === 0) {
		return date.format('HH:mm')
	}
	if (dayDiff === 1) {
		return '昨天 ' + date.format('HH:mm')
	}
	if (dayDiff === 2) {
		return '前天 ' + date.format('HH:mm')
	}
	if (date.isSame(now, 'month')) {
		return date.format('M月D日 HH:mm')
	}
	if (date.isSame(now, 'year')) {
		return date.format('M月D日 HH:mm')
	}
	return date.format('YYYY年M月D日 HH:mm')
}

export function shouldShowSupportChatTime (current: string, previous: string): boolean {
	if (previous.length === 0) {
		return true
	}
	const currentDate = dayjs(current)
	const previousDate = dayjs(previous)
	if (!currentDate.isValid() || !previousDate.isValid()) {
		return true
	}
	if (!currentDate.isSame(previousDate, 'day')) {
		return true
	}
	return currentDate.diff(previousDate, 'minute') >= 5
}
