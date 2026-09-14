import dayjs from 'dayjs'
import { API_BASE_URL, CDN_BASE_URL } from './config'

export function resolveFileUrl (path: string): string {
	if (path.startsWith("http") || path.startsWith("/")) {
		return path
	}
	if (path.startsWith("cdn/")) {
		return CDN_BASE_URL + "/" + path
	}
	return API_BASE_URL + "/" + path
}

export class ForumArticle {
	id: string = ""
	title: string = ""
	summary: string = ""
	cover: string = ""
	name: string = ""
	avatar: string = ""
	likeNum: number = 0
	commentNum: number = 0
	collectNum: number = 0
	viewNum: number = 0
	isEssence: number = 0
	timeText: string = ""
	isLiked: boolean = false
	isCollected: boolean = false
	tagName: string = ""

	initFromJSON (json: UTSJSONObject): void {
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const title = json.getString("title")
		if (title != null) {
			this.title = title
		}
		const summary = json.getString("summary")
		if (summary != null) {
			this.summary = summary
		}
		const cover = json.getString("cover")
		if (cover != null) {
			this.cover = cover
		}
		const name = json.getString("name")
		if (name != null) {
			this.name = name
		}
		const avatar = json.getString("avatar")
		if (avatar != null) {
			this.avatar = avatar
		}
		const likeNum = json.getNumber("like_num")
		if (likeNum != null) {
			this.likeNum = likeNum
		}
		const commentNum = json.getNumber("comment_num")
		if (commentNum != null) {
			this.commentNum = commentNum
		}
		const collectNum = json.getNumber("collect_num")
		if (collectNum != null) {
			this.collectNum = collectNum
		}
		const viewNum = json.getNumber("view_num")
		if (viewNum != null) {
			this.viewNum = viewNum
		}
		const isEssence = json.getNumber("is_essence")
		if (isEssence != null) {
			this.isEssence = isEssence
		}
		const isLiked = json.getBoolean("is_liked")
		if (isLiked != null) {
			this.isLiked = isLiked
		}
		const isCollected = json.getBoolean("is_collected")
		if (isCollected != null) {
			this.isCollected = isCollected
		}
		const tagName = json.getString("tag_name")
		if (tagName != null) {
			this.tagName = tagName
		}
		const createdAt = json.getString("created_at")
		if (createdAt != null && createdAt.length >= 16) {
			this.timeText = formatArticleTime(createdAt)
		}
	}
}

export class PrescriptionTag {
	id: string = ""
	title: string = ""
	parentId: string = ""
	level: number = 0
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
		const parentId = json.getString("parent_id")
		if (parentId != null) {
			this.parentId = parentId
		}
		const level = json.getNumber("level")
		if (level != null) {
			this.level = level
		}
		const status = json.getNumber("status")
		if (status != null) {
			this.status = status
		}
	}
}

export function lastTagName (fullName: string): string {
	const marker = ' - '
	let lastIndex = -1
	let i = 0
	while (i <= fullName.length - marker.length) {
		if (fullName.substring(i, i + marker.length) === marker) {
			lastIndex = i
			i += marker.length
		} else {
			i += 1
		}
	}
	if (lastIndex < 0) {
		return fullName
	}
	return fullName.substring(lastIndex + marker.length)
}

export function formatCount (count: number): string {
	if (count >= 10000) {
		return (count / 10000).toFixed(1) + " 万人正在关注"
	}
	return count.toString() + " 人正在关注"
}

export function formatArticleTime (createdAt: string): string {
	const created = dayjs(createdAt)
	if (!created.isValid()) {
		return createdAt.substring(0, 16).replace("T", " ")
	}
	const now = dayjs()
	let diffMin = now.diff(created, "minute")
	if (diffMin < 0) {
		diffMin = 0
	}
	if (diffMin <= 1) {
		return "刚刚"
	}
	const sameDay = now.isSame(created, "day")
	if (sameDay && diffMin < 60) {
		return diffMin.toString() + "分钟前"
	}
	if (sameDay && diffMin < 720) {
		return Math.floor(diffMin / 60).toString() + "小时前"
	}
	const dayDiff = now.startOf("day").diff(created.startOf("day"), "day")
	if (dayDiff == 1) {
		return "昨天 " + created.format("HH:mm")
	}
	if (now.isSame(created, "year")) {
		return created.format("MM-DD HH:mm")
	}
	return created.format("YYYY-MM-DD HH:mm")
}

export class ForumArticleDetail {
	id: string = ""
	title: string = ""
	content: string = ""
	cover: string = ""
	name: string = ""
	avatar: string = ""
	likeNum: number = 0
	commentNum: number = 0
	collectNum: number = 0
	viewNum: number = 0
	isLiked: boolean = false
	isCollected: boolean = false
	tagName: string = ""
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
		const content = json.getString("content")
		if (content != null) {
			this.content = content
		}
		const cover = json.getString("cover")
		if (cover != null) {
			this.cover = cover
		}
		const name = json.getString("name")
		if (name != null) {
			this.name = name
		}
		const avatar = json.getString("avatar")
		if (avatar != null) {
			this.avatar = avatar
		}
		const likeNum = json.getNumber("like_num")
		if (likeNum != null) {
			this.likeNum = likeNum
		}
		const commentNum = json.getNumber("comment_num")
		if (commentNum != null) {
			this.commentNum = commentNum
		}
		const collectNum = json.getNumber("collect_num")
		if (collectNum != null) {
			this.collectNum = collectNum
		}
		const viewNum = json.getNumber("view_num")
		if (viewNum != null) {
			this.viewNum = viewNum
		}
		const isLiked = json.getBoolean("is_liked")
		if (isLiked != null) {
			this.isLiked = isLiked
		}
		const isCollected = json.getBoolean("is_collected")
		if (isCollected != null) {
			this.isCollected = isCollected
		}
		const tagName = json.getString("tag_name")
		if (tagName != null) {
			this.tagName = tagName
		}
		let timeValue = ""
		const publishTime = json.getString("publish_time")
		if (publishTime != null && publishTime.length > 0) {
			timeValue = publishTime
		} else {
			const createdAt = json.getString("created_at")
			if (createdAt != null) {
				timeValue = createdAt
			}
		}
		if (timeValue.length >= 16) {
			this.timeText = formatArticleTime(timeValue)
		}
	}
}

export class ForumCommentItem {
	id: string = ""
	content: string = ""
	name: string = ""
	avatar: string = ""
	toName: string = ""
	timeText: string = ""
	floor: number = 0

	initFromJSON (json: UTSJSONObject, floorNumber: number): void {
		this.floor = floorNumber
		const id = json.getString("id")
		if (id != null) {
			this.id = id
		}
		const content = json.getString("content")
		if (content != null) {
			this.content = content
		}
		const name = json.getString("name")
		if (name != null) {
			this.name = name
		}
		const avatar = json.getString("avatar")
		if (avatar != null) {
			this.avatar = avatar
		}
		const toName = json.getString("to_name")
		if (toName != null) {
			this.toName = toName
		}
		const createdAt = json.getString("created_at")
		if (createdAt != null && createdAt.length >= 16) {
			this.timeText = formatArticleTime(createdAt)
		}
	}
}
