import dayjs from 'dayjs'
import { formatMoney } from './money'

export function formatOrderAmount (value: string, isIncome: boolean): string {
	const amount = Math.abs(Number(value))
	return (isIncome ? '+¥' : '-¥') + formatMoney(amount.toString(), 2)
}

export function formatOrderTime (value: string): string {
	const time = dayjs(value)
	if (time.isValid()) {
		return time.format('YYYY-MM-DD HH:mm')
	}
	if (value.length >= 16) {
		return value.substring(0, 16).replace('T', ' ')
	}
	return value
}

export function paymentTypeText (type: number): string {
	if (type === 1) {
		return '微信支付'
	}
	if (type === 2) {
		return '支付宝支付'
	}
	if (type === 3) {
		return 'Apple支付'
	}
	return '余额支付'
}

export function findOrderByKey (
	items: Array<UTSJSONObject>,
	id: string,
	orderNo: string
): UTSJSONObject | null {
	for (let i = 0; i < items.length; i++) {
		const item = items[i]
		const itemId = item.getString('id') ?? ''
		const itemOrderNo = item.getString('order_no') ?? ''
		if ((id.length > 0 && itemId === id) || (orderNo.length > 0 && itemOrderNo === orderNo)) {
			return item
		}
	}
	return null
}

export function courseProductName (order: UTSJSONObject): string {
	const courseInfos = order.getArray<UTSJSONObject>('course_infos')
	if (courseInfos != null && courseInfos.length > 0) {
		return courseInfos[0].getString('title') ?? '康复课程'
	}
	return '康复课程'
}

export function equipmentProductName (order: UTSJSONObject): string {
	const equipments = order.getArray<UTSJSONObject>('equipment')
	if (equipments != null && equipments.length > 0) {
		const equipment = equipments[0]
		const title = equipment.getString('title') ?? '康复器材'
		const models = equipment.getArray<UTSJSONObject>('models')
		if (models != null && models.length > 0) {
			const modelName = models[0].getString('title') ?? models[0].getString('name') ?? ''
			if (modelName.length > 0) {
				return title + ' · ' + modelName
			}
		}
		return title
	}
	return '康复器材'
}
