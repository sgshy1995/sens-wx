import { resolveFileUrl } from './forum'

export class PainRecordMedia {
	key: string = ""
	localPath: string = ""
	thumbPath: string = ""
	url: string = ""
	mediaType: string = "image"
	uploading: boolean = false
	failed: boolean = false
}

export function isVideoFileKey (key: string): boolean {
	return hasSuffix(key, ".mp4")
		|| hasSuffix(key, ".mov")
		|| hasSuffix(key, ".m4v")
		|| hasSuffix(key, ".avi")
		|| hasSuffix(key, ".webm")
}

function hasSuffix (source: string, suffix: string): boolean {
	return source.length >= suffix.length && source.substring(source.length - suffix.length) === suffix
}

export function buildPainRecordMediaList (imageData: string): PainRecordMedia[] {
	const result: PainRecordMedia[] = []
	if (imageData.length === 0) {
		return result
	}
	let start = 0
	for (let i = 0; i <= imageData.length; i++) {
		if (i === imageData.length || imageData.charAt(i) === ",") {
			const key = imageData.substring(start, i).trim()
			if (key.length > 0) {
				const item = new PainRecordMedia()
				item.key = key
				item.url = resolveFileUrl(key)
				item.mediaType = isVideoFileKey(key) ? "video" : "image"
				result.push(item)
			}
			start = i + 1
		}
	}
	return result
}
