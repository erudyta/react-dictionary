interface Phonetic {
	text: string
	audio?: string
}

interface Definition {
	definition: string
	example?: string
	synonyms: string[]
	antonyms: string[]
}

export interface Meaning {
	partOfSpeech: string
	definitions: Definition[],
	synonyms: string[]
	antonyms: string[]
}

export interface WordData {
	word: string
	phonetic?: string
	phonetics: Phonetic[]
	origin?: string
	meanings: Meaning[]
	sourceUrls: string[]
}
