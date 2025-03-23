import { Box } from '@mui/material'
import { WordData } from '../types/dictionaryTypes'

interface Props {
	word: WordData | null
}

const DictionaryViewer = ({ word }: Props) => {
	console.log(word)
	return <Box></Box>
}

export default DictionaryViewer
