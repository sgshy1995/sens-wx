import dayjs from 'dayjs'

export class PurchasedPlan {
	id: string = ''
	planOrderId: string = ''
	tagName: string = ''
	title: string = ''
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
		this.planOrderId = json.getString('id') ?? this.planOrderId
		this.tagName = json.getString('tag_name') ?? this.tagName
		this.title = json.getString('title') ?? this.title
		this.price = json.getString('amount') ?? this.price
		const orderNo = json.getString('order_no')
		if (orderNo != null) {
			this.orderNo = orderNo
		}
		const paymentType = json.getNumber('payment_type')
		if (paymentType != null) {
			this.paymentType = paymentType
		}
		const unlockedAt = json.getString('paid_at')
		if (unlockedAt != null) {
			this.unlockedAt = unlockedAt
			const date = dayjs(unlockedAt)
			this.purchaseDateText = date.isValid() ? date.format('YYYY.MM.DD') : unlockedAt.substring(0, 10)
		}
		const validityText = json.getString('validity_text')
		if (validityText != null && validityText.length > 0) {
			this.validityText = validityText
		}
		this.status = json.getString('status') === 'PAID' ? 1 : 0
	}

	displayTitle (): string {
		return this.title.length > 0 ? this.title : this.tagName + '专属康复方案'
	}
}
