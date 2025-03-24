import { Box, Button, Typography } from '@mui/material'
import { WordData } from '../types/dictionaryTypes'
import { useEffect, useState } from 'react'

interface Props {
	word: WordData | null
}

const DictionaryViewer = ({ word }: Props) => {
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		return () => {
			if (audio) {
				audio.pause()
				audio.currentTime = 0
			}
			setIsPlaying(false)
		}
	}, [audio])

	useEffect(() => {
		if (word) {
			if (word.phonetics[0].audio) {
				const newAudio = new Audio(word.phonetics[0].audio)
				newAudio.onended = () => setIsPlaying(false)
				setAudio(newAudio)
			} else {
				setAudio(null)
			}
		} else {
			setAudio(null)
		}

		return () => {
			setAudio(null)
			setIsPlaying(false)
		}
	}, [word])

	const toggleAudio = (): void => {
		if (!audio) return

		if (isPlaying) {
			audio.currentTime = 0
			audio.pause()
		} else {
			audio.play()
		}
		setIsPlaying(!isPlaying)
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
				<Box>
					<Typography sx={{ fontSize: '4rem', fontWeight: 600 }}>{word?.word}</Typography>
					<Typography sx={{ fontSize: '1.3rem', color: '#ff6040' }}>{word?.phonetic}</Typography>
				</Box>
				{audio && (
					<Button
						onClick={toggleAudio}
						sx={{ height: '64px', width: '64px', backgroundColor: '#ff6040', padding: '0', borderRadius: '50%' }}>
						{isPlaying ? (
							<i style={{ fontSize: '40px', color: '#802f1f' }} className='bx bx-stop-circle'></i>
						) : (
							<i style={{ fontSize: '40px', color: '#802f1f' }} className='bx bx-play-circle'></i>
						)}
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default DictionaryViewer
