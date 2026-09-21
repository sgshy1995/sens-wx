import dayjs from 'dayjs'
import { formatMoney } from './money'

export class BalanceOrder {
	id: string = ''
	orderNo: string = ''
	amount: number = 0
	isIncome: boolean = false
	dateKey: string = ''
	dateText: string = ''
	timeText: string = ''
	title: string = ''
	subtitle: string = ''
	amountText: string = ''

	initFromJSON (json: UTSJSONObject): void {
		this.id = json.getString('id') ?? ''
		this.orderNo = json.getString('order_no') ?? ''
		this.amount = Number(json.getString('payment_num') ?? '0')
		this.isIncome = this.amount >= 0
		this.title = resolveTitle(json, this.isIncome)

		let rawTime = json.getString('payment_time') ?? ''
		if (rawTime.length === 0) {
			rawTime = json.getString('order_time') ?? ''
		}
		if (rawTime.length === 0) {
			rawTime = json.getString('created_at') ?? ''
		}

		const time = dayjs(rawTime)
		if (time.isValid()) {
			this.dateKey = time.format('YYYY-MM-DD')
			this.dateText = time.format('M月D日')
			this.timeText = time.format('MM月DD日 HH:mm')
		} else {
			this.dateKey = rawTime.length >= 10 ? rawTime.substring(0, 10) : ''
			this.dateText = this.dateKey
			this.timeText = rawTime.length >= 16 ? rawTime.substring(0, 16).replace('T', ' ') : rawTime
		}

		this.subtitle = this.timeText + ' · ' + (this.isIncome ? '充值成功' : '交易成功')
		const absolute = Math.abs(this.amount)
		this.amountText = (this.isIncome ? '+¥' : '-¥') + formatMoney(absolute.toString(), 2)
	}
}

export class BalanceGroup {
	key: string = ''
	title: string = ''
	summaryText: string = ''
	orders: BalanceOrder[] = []
}

function resolveTitle (json: UTSJSONObject, isIncome: boolean): string {
	const reason = json.getString('created_reason') ?? ''
	if (!isIncome) {
		return reason.length > 0 ? reason : '余额消费'
	}
	const paymentType = json.getNumber('payment_type', 1)
	if (paymentType === 2) {
		return '支付宝充值'
	}
	if (paymentType === 3) {
		return 'Apple充值'
	}
	if (paymentType === 1) {
		return '微信充值'
	}
	return '余额充值'
}

export function buildBalanceGroups (
	orders: BalanceOrder[],
	type: string,
	range: string,
	customDate: string
): BalanceGroup[] {
	const groups: BalanceGroup[] = []
	for (let i = 0; i < orders.length; i++) {
		const order = orders[i]
		if (type === 'income' && !order.isIncome) {
			continue
		}
		if (type === 'expense' && order.isIncome) {
			continue
		}
		if (!matchRange(order, range, customDate)) {
			continue
		}
		let group: BalanceGroup | null = null
		for (let j = 0; j < groups.length; j++) {
			if (groups[j].key === order.dateKey) {
				group = groups[j]
				break
			}
		}
		if (group == null) {
			group = new BalanceGroup()
			group.key = order.dateKey
			group.title = groupTitle(order.dateKey)
			groups.push(group)
		}
		group.orders.push(order)
	}
	for (let i = 0; i < groups.length; i++) {
		let total = 0
		for (let j = 0; j < groups[i].orders.length; j++) {
			total += groups[i].orders[j].amount
		}
		groups[i].summaryText = (total >= 0 ? '收入 ¥' : '支出 ¥') + formatMoney(Math.abs(total).toString(), 2)
	}
	return groups
}

function matchRange (order: BalanceOrder, range: string, customDate: string): boolean {
	const now = dayjs()
	const date = dayjs(order.dateKey)
	if (!date.isValid()) {
		return true
	}
	if (range === 'today') {
		return date.isSame(now, 'day')
	}
	if (range === 'week') {
		return date.valueOf() >= now.startOf('week').valueOf() && date.valueOf() <= now.endOf('day').valueOf()
	}
	if (range === 'month') {
		return date.isSame(now, 'month')
	}
	if (range === 'custom') {
		return order.dateKey === customDate
	}
	return true
}

function groupTitle (dateKey: string): string {
	const now = dayjs()
	const date = dayjs(dateKey)
	if (date.isSame(now, 'day')) {
		return '今天 · ' + date.format('M月D日')
	}
	if (date.isSame(now.subtract(1, 'day'), 'day')) {
		return '昨天 · ' + date.format('M月D日')
	}
	if (date.isSame(now, 'year')) {
		return date.format('M月D日')
	}
	return date.format('YYYY年M月D日')
}
