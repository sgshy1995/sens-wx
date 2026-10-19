export class RehabPlanSection {
	id: string = ""
	resourceType: string = ""
	resourceId: string = ""
	resourceTitle: string = ""
	resourceContent: string = ""
	resourceCover: string = ""
	resourceRemark: string = ""
	extraType: number = 0
	extraText: string = ""
	sort: number = 0

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const resourceType = json.getString("resource_type")
		if (resourceType != null) {
			this.resourceType = resourceType
		}
		const resourceId = json.getString("resource_id")
		if (resourceId != null) {
			this.resourceId = resourceId
		}
		const resourceTitle = json.getString("resource_title")
		if (resourceTitle != null) {
			this.resourceTitle = resourceTitle
		}
		const resourceContent = json.getString("resource_content")
		if (resourceContent != null) {
			this.resourceContent = resourceContent
		}
		const resourceCover = json.getString("resource_cover")
		if (resourceCover != null) {
			this.resourceCover = resourceCover
		}
		const resourceRemark = json.getString("resource_remark")
		if (resourceRemark != null) {
			this.resourceRemark = resourceRemark
		}
		const extraType = json.getNumber("extra_type")
		if (extraType != null) {
			this.extraType = extraType
		}
		const extraText = json.getString("extra_text")
		if (extraText != null) {
			this.extraText = extraText
		}
		const sort = json.getNumber("sort")
		if (sort != null) {
			this.sort = sort
		}
	}

	isVideo (): boolean {
		return this.resourceType === "video"
	}

	isImage (): boolean {
		return this.resourceType === "image"
	}

	typeLabel (): string {
		if (this.resourceType === "video") {
			return "视频"
		}
		if (this.resourceType === "image") {
			return "图片"
		}
		return "图文"
	}

	extraTextValue (): string {
		if (this.extraType === 1) {
			return this.resourceRemark
		}
		if (this.extraType === 2) {
			return this.extraText
		}
		return ""
	}
}

export class RehabPlanDetail {
	id: string = ""
	courseId: string = ""
	title: string = ""
	remark: string = ""
	price: string = "0"
	discountPrice: string = ""
	dictionaryItemName: string = ""
	sort: number = 0
	sections: RehabPlanSection[] = []

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const courseId = json.getString("course_id")
		if (courseId != null) {
			this.courseId = courseId
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const remark = json.getString("remark")
		if (remark != null) {
			this.remark = remark
		}
		const price = json.getString("price")
		if (price != null) {
			this.price = price
		}
		const discountPrice = json.getString("discount_price")
		if (discountPrice != null) {
			this.discountPrice = discountPrice
		}
		const dictionaryItemName = json.getString("dictionary_item_name")
		if (dictionaryItemName != null) {
			this.dictionaryItemName = dictionaryItemName
		}
		const sort = json.getNumber("sort")
		if (sort != null) {
			this.sort = sort
		}
		const list = json.getArray<UTSJSONObject>("sections")
		if (list != null) {
			const parsed: RehabPlanSection[] = []
			for (let i = 0; i < list.length; i++) {
				const section = new RehabPlanSection()
				section.initFromJSON(list[i])
				parsed.push(section)
			}
			this.sections = parsed
		}
	}

	videoCount (): number {
		let count = 0
		for (let i = 0; i < this.sections.length; i++) {
			if (this.sections[i].isVideo()) {
				count = count + 1
			}
		}
		return count
	}

	mediaCount (): number {
		let count = 0
		for (let i = 0; i < this.sections.length; i++) {
			if (!this.sections[i].isVideo()) {
				count = count + 1
			}
		}
		return count
	}

	firstVideo (): RehabPlanSection | null {
		for (let i = 0; i < this.sections.length; i++) {
			if (this.sections[i].isVideo()) {
				return this.sections[i]
			}
		}
		return null
	}
}

export class RehabMediaItem {
	type: string = ""
	url: string = ""
	cover: string = ""
	title: string = ""
	remark: string = ""
}
