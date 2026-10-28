export class PrescriptionFilterTag {
	id: string = ""
	title: string = ""
	priority: number = 0
	status: number = 1

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const priority = json.getNumber("priority")
		if (priority != null) {
			this.priority = priority
		}
		const status = json.getNumber("status")
		if (status != null) {
			this.status = status
		}
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
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const dictionaryId = json.getString("dictionary_id")
		if (dictionaryId != null) {
			this.dictionaryId = dictionaryId
		}
		const name = json.getString("name")
		if (name != null) {
			this.name = name
		}
		const value = json.getString("value")
		if (value != null) {
			this.value = value
		}
		const priority = json.getNumber("priority")
		if (priority != null) {
			this.priority = priority
		}
		const status = json.getNumber("status")
		if (status != null) {
			this.status = status
		}
	}
}

export class PrescriptionFilterDictionary {
	id: string = ""
	prescriptionTagId: string = ""
	code: string = ""
	name: string = ""
	priority: number = 0
	status: number = 1
	isStageDictionary: boolean = false
	isNormalDictionary: boolean = false
	isStageOnly: boolean = false
	items: PrescriptionFilterItem[] = []

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const prescriptionTagId = json.getString("prescription_tag_id")
		if (prescriptionTagId != null) {
			this.prescriptionTagId = prescriptionTagId
		}
		const code = json.getString("code")
		if (code != null) {
			this.code = code
		}
		const name = json.getString("name")
		if (name != null) {
			this.name = name
		}
		const priority = json.getNumber("priority")
		if (priority != null) {
			this.priority = priority
		}
		const status = json.getNumber("status")
		if (status != null) {
			this.status = status
		}
		const isStageDictionary = json.getBoolean("is_stage_dictionary")
		if (isStageDictionary != null) {
			this.isStageDictionary = isStageDictionary
		}
		const isNormalDictionary = json.getBoolean("is_normal_dictionary")
		if (isNormalDictionary != null) {
			this.isNormalDictionary = isNormalDictionary
		}
		const isStageOnly = json.getBoolean("is_stage_only")
		if (isStageOnly != null) {
			this.isStageOnly = isStageOnly
		}
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

export class PrescriptionFilterResult {
	courseId: string = ""
	courseTitle: string = ""
	courseRemark: string = ""
	stageCount: number = 0
	stageId: string = ""
	stageTitle: string = ""
	stageRemark: string = ""
	tagName: string = ""
	dictionaryNames: string[] = []
	price: string = "0"
	originalPrice: string = "0"
	unlocked: boolean = false

	initFromJSON (json: UTSJSONObject): void {
		const courseId = json.getString("course_id")
		if (courseId != null) {
			this.courseId = courseId
		}
		const courseTitle = json.getString("course_title")
		if (courseTitle != null) {
			this.courseTitle = courseTitle
		}
		const courseRemark = json.getString("course_remark")
		if (courseRemark != null) {
			this.courseRemark = courseRemark
		}
		const stageCount = json.getNumber("stage_count")
		if (stageCount != null) {
			this.stageCount = stageCount
		}
		const stageId = json.getString("stage_id")
		if (stageId != null) {
			this.stageId = stageId
		}
		const stageTitle = json.getString("stage_title")
		if (stageTitle != null) {
			this.stageTitle = stageTitle
		}
		const stageRemark = json.getString("stage_remark")
		if (stageRemark != null) {
			this.stageRemark = stageRemark
		}
		const tagName = json.getString("tag_name")
		if (tagName != null) {
			this.tagName = tagName
		}
		const dictionaryNames = json.getArray<string>("dictionary_names")
		if (dictionaryNames != null) {
			this.dictionaryNames = dictionaryNames
		}
		const price = json.getString("price")
		if (price != null) {
			this.price = price
		}
		const originalPrice = json.getString("original_price")
		if (originalPrice != null) {
			this.originalPrice = originalPrice
		}
		const unlocked = json.getBoolean("unlocked")
		if (unlocked != null) {
			this.unlocked = unlocked
		}
	}
}
