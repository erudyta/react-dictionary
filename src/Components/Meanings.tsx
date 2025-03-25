import { Box, List, Typography, ListItem, styled } from '@mui/material'
import { Meaning } from '../types/dictionaryTypes'

interface Props {
	meaning: Meaning
}

const StyledListItem = styled(ListItem)({
	display: 'list-item', 
	listStyleType: 'disc',
	'::marker': {
		color: '#ff6040', 
		fontSize: '1.1em',
	},
})

const Meanings = ({ meaning }: Props) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', marginTop: '1.5rem' }}>
				<Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>{meaning.partOfSpeech}</Typography>
				<Box sx={{ height: '1px', width: '100%', backgroundColor: '#ebebeb' }}></Box>
			</Box>
			<Typography sx={{ fontSize: '1.1rem', color: '#a1a1a1' }}>Meanings</Typography>
			<List sx={{ padding: '0 0 0 4rem' }}>
				{meaning.definitions.map(definition => (
					<StyledListItem key={definition.definition}>{definition.definition}</StyledListItem>
				))}
			</List>
			{meaning.synonyms.length > 0 && (
				<Typography sx={{ fontSize: '1.1rem', color: '#a1a1a1' }}>
					Synonyms{' '}
					{meaning.synonyms.map(s => (
						<span key={s} style={{ marginLeft: '1rem', fontWeight: 600, color: '#ff6040' }}>{s} </span>
					))}
				</Typography>
			)}
		</Box>
	)
}

export default Meanings
