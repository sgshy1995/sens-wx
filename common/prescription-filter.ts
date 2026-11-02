export class PrescriptionFilterTag {
	id: string = ""
	title: string = ""
	priority: number = 0
	status: number = 1

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString("id") ?? this.id
		this.title = json.getString("title") ?? this.title
		this.priority = json.getNumber("priority") ?? this.priority
		this.status = json.getNumber("status") ?? this.status
	}
}

export class PrescriptionFilterLabel {
	text: string = ""
}

export class PrescriptionFilterItem {
	id: string = ""
	dictionaryId: string = ""
	name: string = ""
	value: string = ""
	priority: number = 0
	status: number = 1

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString("id") ?? this.id
		this.dictionaryId = json.getString("dictionary_id") ?? this.dictionaryId
		this.name = json.getString("name") ?? this.name
		this.value = json.getString("value") ?? this.value
		this.priority = json.getNumber("priority") ?? this.priority
		this.status = json.getNumber("status") ?? this.status
	}
}

export class PrescriptionFilterDictionary {
	id: string = ""
	prescriptionTagId: string = ""
	code: string = ""
	name: string = ""
	filterMode: string = "decrease"
	dataWeight: number = 0
	priority: number = 0
	status: number = 1
	items: PrescriptionFilterItem[] = []

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString("id") ?? this.id
		this.prescriptionTagId = json.getString("prescription_tag_id") ?? this.prescriptionTagId
		this.code = json.getString("code") ?? this.code
		this.name = json.getString("name") ?? this.name
		this.filterMode = json.getString("filter_mode") ?? this.filterMode
		this.dataWeight = json.getNumber("data_weight") ?? this.dataWeight
		this.priority = json.getNumber("priority") ?? this.priority
		this.status = json.getNumber("status") ?? this.status
		const itemList = json.getArray<UTSJSONObject>("items")
		if (itemList != null) {
			const parsed: PrescriptionFilterItem[] = []
			for (let i = 0; i < itemList.length; i++) {
				const item = new PrescriptionFilterItem()
				item.initFromJSON(itemList[i])
				parsed.push(item)
			}
			this.items = parsed
		}
	}
}

export class PrescriptionFilterCondition {
	dictionaryId: string = ""
	dictionaryItemId: string = ""
	dictionaryName: string = ""
	itemName: string = ""
	filterMode: string = ""
	dataWeight: number = 0
	itemPriority: number = 0

	initFromJSON (json: UTSJSONObject): void {
		this.dictionaryId = json.getString("dictionary_id") ?? this.dictionaryId
		this.dictionaryItemId = json.getString("dictionary_item_id") ?? this.dictionaryItemId
		this.dictionaryName = json.getString("dictionary_name") ?? this.dictionaryName
		this.itemName = json.getString("item_name") ?? this.itemName
		this.filterMode = json.getString("filter_mode") ?? this.filterMode
		this.dataWeight = json.getNumber("data_weight") ?? this.dataWeight
		this.itemPriority = json.getNumber("item_priority") ?? this.itemPriority
	}
}

export class PrescriptionPlanPreview {
	prescriptionTagId: string = ""
	tagName: string = ""
	planSignature: string = ""
	videoCount: number = 0
	imageCount: number = 0
	textCount: number = 0
	totalCount: number = 0
	price: string = ""
	originalPrice: string = ""
	isDiscount: boolean = false
	payable: boolean = false
	conditions: PrescriptionFilterCondition[] = []

	initFromJSON (json: UTSJSONObject): void {
		this.prescriptionTagId = json.getString("prescription_tag_id") ?? this.prescriptionTagId
		this.tagName = json.getString("tag_name") ?? this.tagName
		this.planSignature = json.getString("plan_signature") ?? this.planSignature
		this.videoCount = json.getNumber("video_count") ?? this.videoCount
		this.imageCount = json.getNumber("image_count") ?? this.imageCount
		this.textCount = json.getNumber("text_count") ?? this.textCount
		this.totalCount = json.getNumber("total_count") ?? this.totalCount
		this.price = json.getString("price") ?? this.price
		this.originalPrice = json.getString("original_price") ?? this.originalPrice
		this.isDiscount = json.getBoolean("is_discount") ?? this.isDiscount
		this.payable = json.getBoolean("payable") ?? this.payable
		const list = json.getArray<UTSJSONObject>("conditions")
		if (list != null) {
			const parsed: PrescriptionFilterCondition[] = []
			for (let i = 0; i < list.length; i++) {
				const condition = new PrescriptionFilterCondition()
				condition.initFromJSON(list[i])
				parsed.push(condition)
			}
			this.conditions = parsed
		}
	}
}
