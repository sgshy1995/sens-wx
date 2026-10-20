import dayjs from 'dayjs'

export class PurchasedPlan {
	id: string = ''
	courseId: string = ''
	courseTitle: string = ''
	stageId: string = ''
	stageTitle: string = ''
	price: string = '0'
	orderNo: string = ''
	paymentType: number = 0
	unlockedAt: string = ''
	purchaseDateText: string = ''
	validityText: string = '永久有效'
	status: number = 1

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString('id')
		if (id != null) {
			this.id = id
		}
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
		const paymentType = json.getNumber('payment_type')
		if (paymentType != null) {
			this.paymentType = paymentType
		}
		const unlockedAt = json.getString('unlocked_at')
		if (unlockedAt != null) {
			this.unlockedAt = unlockedAt
			const date = dayjs(unlockedAt)
			this.purchaseDateText = date.isValid() ? date.format('YYYY.MM.DD') : unlockedAt.substring(0, 10)
		}
		const validityText = json.getString('validity_text')
		if (validityText != null && validityText.length > 0) {
			this.validityText = validityText
		}
		const status = json.getNumber('status')
		if (status != null) {
			this.status = status
		}
	}

	displayTitle (): string {
		return this.stageTitle.length > 0 ? this.stageTitle : this.courseTitle
	}
}
