import { Box, Button, List, Typography, ListItem, Link } from '@mui/material'
import { WordData } from '../types/dictionaryTypes'
import { useEffect, useState } from 'react'
import Meanings from './Meanings'

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

	console.log(word)

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '1rem',
					gap: '1.5rem',
				}}>
				<Box>
					<Typography
						variant='h1'
						sx={theme => ({
							fontSize: '2.6rem',
							fontWeight: 600,
							wordBreak: 'break-all',
							[theme.breakpoints.up('xs')]: {
								fontSize: '4rem',
								fontWeight: 600,
							},
						})}>
						{word?.word}
					</Typography>
					<Typography
						sx={theme => ({
							fontSize: '1.15rem',
							color: '#ff6040',
							[theme.breakpoints.up('xs')]: {
								fontSize: '1.3rem',
							},
						})}>
						{word?.phonetic}
					</Typography>
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
			{word?.meanings.map((meaning, index) => (
				<Meanings key={index} meaning={meaning}></Meanings>
			))}

			<Box>
				<Box sx={{ height: '1px', width: '100%', backgroundColor: '#ebebeb', margin: '2rem 0' }}></Box>
				<Typography sx={{ fontSize: '1rem', color: '#a1a1a1' }}>Source:</Typography>
				<List sx={{ padding: '0' }}>
					{word?.sourceUrls.map(source => (
						<ListItem key={source}>
							<Link
								underline='always'
								href={source}
								target='_blank'
								rel='noopener noreferrer'
								sx={{
									wordBreak: 'break-all',
								}}>
								{source}
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	)
}

export default DictionaryViewer
