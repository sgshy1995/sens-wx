import dayjs from 'dayjs'

export class RehabChatPlan {
	prescriptionTagId: string = ''
	tagName: string = ''
	planSignature: string = ''
	videoCount: number = 0
	imageCount: number = 0
	textCount: number = 0
	totalCount: number = 0
	price: string = ''
	originalPrice: string = ''
	isDiscount: boolean = false
	dictionaryItemIds: string[] = []
	selectedLabels: string[] = []

	initFromJSON (json: UTSJSONObject): void {
		this.prescriptionTagId = json.getString('prescription_tag_id') ?? this.prescriptionTagId
		this.tagName = json.getString('tag_name') ?? this.tagName
		this.planSignature = json.getString('plan_signature') ?? this.planSignature
		this.videoCount = json.getNumber('video_count') ?? this.videoCount
		this.imageCount = json.getNumber('image_count') ?? this.imageCount
		this.textCount = json.getNumber('text_count') ?? this.textCount
		this.totalCount = json.getNumber('total_count') ?? this.totalCount
		this.price = json.getString('price') ?? this.price
		this.originalPrice = json.getString('original_price') ?? this.originalPrice
		this.isDiscount = json.getBoolean('is_discount') ?? this.isDiscount
		const conditions = json.getArray<UTSJSONObject>('conditions')
		if (conditions != null) {
			const itemIds: string[] = []
			const labels: string[] = []
			for (let i = 0; i < conditions.length; i++) {
				itemIds.push(conditions[i].getString('dictionary_item_id') ?? '')
				const itemName = conditions[i].getString('item_name') ?? ''
				if (itemName.length > 0) {
					const dictionaryName = conditions[i].getString('dictionary_name') ?? ''
					labels.push(dictionaryName.length > 0 ? dictionaryName + '：' + itemName : itemName)
				}
			}
			this.dictionaryItemIds = itemIds
			this.selectedLabels = labels
		}
	}

	resourceSummary (): string {
		return this.videoCount.toString() + ' 视频 · ' + this.imageCount.toString() + ' 图片 · ' + this.textCount.toString() + ' 文字'
	}
}

export class RehabChatMessage {
	id: string = ''
	role: string = ''
	content: string = ''
	messageType: string = 'text'
	matchStatus: string = ''
	createdAt: string = ''
	timeText: string = ''
	plan: RehabChatPlan | null = null
	pending: boolean = false
	visible: boolean = true
	streaming: boolean = false

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString('id') ?? this.id
		this.role = json.getString('role') ?? this.role
		this.content = json.getString('content') ?? this.content
		this.messageType = json.getString('message_type') ?? this.messageType
		this.matchStatus = json.getString('match_status') ?? this.matchStatus
		const createdAt = json.getString('created_at')
		if (createdAt != null) {
			this.createdAt = createdAt
			this.timeText = formatChatTime(createdAt)
		}
		const matchResult = json.getJSON('match_result')
		if (matchResult != null) {
			const planJson = matchResult.getJSON('plan')
			if (planJson != null) {
				const plan = new RehabChatPlan()
				plan.initFromJSON(planJson)
				this.plan = plan
			}
		}
	}
}

export class RehabChatTopic {
	id: string = ''
	title: string = ''
	messageCount: number = 0
	lastMessageAt: string = ''
	timeText: string = ''

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString('id') ?? this.id
		this.title = json.getString('title') ?? this.title
		this.messageCount = json.getNumber('message_count') ?? this.messageCount
		const lastMessageAt = json.getString('last_message_at')
		if (lastMessageAt != null && lastMessageAt.length > 0) {
			this.lastMessageAt = lastMessageAt
			this.timeText = formatChatTime(lastMessageAt)
		} else {
			const createdAt = json.getString('created_at')
			if (createdAt != null) {
				this.lastMessageAt = createdAt
				this.timeText = formatChatTime(createdAt)
			}
		}
	}
}

export function formatChatTime (createdAt: string): string {
	const created = dayjs(createdAt)
	if (!created.isValid()) {
		return createdAt.substring(11, 16)
	}
	const now = dayjs()
	if (now.isSame(created, 'day')) {
		return created.format('HH:mm')
	}
	if (now.isSame(created, 'year')) {
		return created.format('MM-DD HH:mm')
	}
	return created.format('YYYY-MM-DD HH:mm')
}
