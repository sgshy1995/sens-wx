import dayjs from 'dayjs'

export class RehabChatStage {
	id: string = ""
	title: string = ""
	sort: number = 0
	price: string = "0"
	discountPrice: string = ""
	unlockPrice: string = "0"
	dictionaryItemName: string = ""
	totalStageCount: number = 0

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const sort = json.getNumber("sort")
		if (sort != null) {
			this.sort = sort
		}
		const price = json.getString("price")
		if (price != null) {
			this.price = price
		}
		const discountPrice = json.getString("discount_price")
		if (discountPrice != null) {
			this.discountPrice = discountPrice
		}
		const unlockPrice = json.getString("unlock_price")
		if (unlockPrice != null) {
			this.unlockPrice = unlockPrice
		}
		const dictionaryItemName = json.getString("dictionary_item_name")
		if (dictionaryItemName != null) {
			this.dictionaryItemName = dictionaryItemName
		}
		const totalStageCount = json.getNumber("total_stage_count")
		if (totalStageCount != null) {
			this.totalStageCount = totalStageCount
		}
	}
}

export class RehabChatCourse {
	id: string = ""
	title: string = ""
	remark: string = ""
	tagName: string = ""
	stageDictionaryName: string = ""
	stageTitle: string = ""
	stageIndexText: string = ""
	unlockPrice: string = "0"
	unlockButtonText: string = "立即解锁"
	dictionaryText: string = ""

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const remark = json.getString("remark")
		if (remark != null) {
			this.remark = remark
		}
		const tagName = json.getString("tag_name")
		if (tagName != null) {
			this.tagName = tagName
		}
		const stageDictionaryName = json.getString("stage_dictionary_name")
		if (stageDictionaryName != null) {
			this.stageDictionaryName = stageDictionaryName
		}
		const unlockPrice = json.getString("unlock_price")
		if (unlockPrice != null) {
			this.unlockPrice = unlockPrice
		}
		const unlockButtonText = json.getString("unlock_button_text")
		if (unlockButtonText != null) {
			this.unlockButtonText = unlockButtonText
		}
		const items = json.getArray<UTSJSONObject>("dictionary_items")
		if (items != null) {
			let text = ""
			for (let i = 0; i < items.length; i++) {
				const name = items[i].getString("name") ?? ""
				if (name.length > 0) {
					if (text.length > 0) {
						text += " · "
					}
					text += name
				}
			}
			this.dictionaryText = text
		}
		const stageJson = json.getJSON("stage")
		if (stageJson != null) {
			const stage = new RehabChatStage()
			stage.initFromJSON(stageJson)
			this.stageTitle = stage.title
			this.unlockPrice = stage.unlockPrice
			if (stage.totalStageCount > 0) {
				this.stageIndexText = "第 " + (stage.sort + 1).toString() + " / " + stage.totalStageCount.toString() + " 阶段"
			} else {
				this.stageIndexText = stage.dictionaryItemName
			}
			if (this.unlockPrice.length > 0) {
				this.unlockButtonText = "¥" + this.unlockPrice + " 立即解锁"
			}
		}
	}
}

export class RehabChatMessage {
	id: string = ""
	role: string = ""
	content: string = ""
	messageType: string = "text"
	matchStatus: string = ""
	createdAt: string = ""
	timeText: string = ""
	course: RehabChatCourse | null = null
	pending: boolean = false
	visible: boolean = true
	streaming: boolean = false

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const role = json.getString("role")
		if (role != null) {
			this.role = role
		}
		const content = json.getString("content")
		if (content != null) {
			this.content = content
		}
		const messageType = json.getString("message_type")
		if (messageType != null) {
			this.messageType = messageType
		}
		const matchStatus = json.getString("match_status")
		if (matchStatus != null) {
			this.matchStatus = matchStatus
		}
		const createdAt = json.getString("created_at")
		if (createdAt != null) {
			this.createdAt = createdAt
			this.timeText = formatChatTime(createdAt)
		}
		const matchResult = json.getJSON("match_result")
		if (matchResult != null) {
			const courseJson = matchResult.getJSON("course")
			if (courseJson != null) {
				const course = new RehabChatCourse()
				course.initFromJSON(courseJson)
				this.course = course
			}
		}
	}
}

export class RehabChatTopic {
	id: string = ""
	title: string = ""
	messageCount: number = 0
	lastMessageAt: string = ""
	timeText: string = ""

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const messageCount = json.getNumber("message_count")
		if (messageCount != null) {
			this.messageCount = messageCount
		}
		const lastMessageAt = json.getString("last_message_at")
		if (lastMessageAt != null && lastMessageAt.length > 0) {
			this.lastMessageAt = lastMessageAt
			this.timeText = formatChatTime(lastMessageAt)
		} else {
			const createdAt = json.getString("created_at")
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
	if (now.isSame(created, "day")) {
		return created.format("HH:mm")
	}
	if (now.isSame(created, "year")) {
		return created.format("MM-DD HH:mm")
	}
	return created.format("YYYY-MM-DD HH:mm")
}
