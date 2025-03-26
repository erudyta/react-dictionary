import { FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'



interface Props {
	darkMode: boolean
	font: string
	setFont: (e: string) => void
}

const FontPicker = ({ darkMode, font, setFont }: Props) => {
	const fonts: string[] = ['Roboto, sans-serif', 'Andada Pro, serif', 'PT Serif, serif']
	const color: string = darkMode ? '#d4d4d4' : 'black '

	return (
		<FormControl
			sx={{
				width: '180px',

				'& label': { color: color },
				'& label.Mui-focused': { color: color },
				'& .MuiInput-underline:before': { borderBottomColor: color },
				'& .MuiInput-underline:hover:before': { borderBottomColor: color },
				'& .MuiInput-underline:after': { borderBottomColor: color },
				'& .MuiSelect-icon': { color: color },
				'& .css-1toxriw-MuiList-root-MuiMenu-list': { backgroundColor: color },
			}}
			variant='standard'>
			<InputLabel>Font Picker</InputLabel>
			<Select
				sx={{ color: color }}
				value={font}
				onChange={(e: SelectChangeEvent) => setFont(e.target.value)}
				MenuProps={{
					PaperProps: {
						sx: {
							backgroundColor: darkMode ? '#888' : 'white',
						},
					},
				}}>
				{fonts.map((fontItem, index) => (
					<MenuItem sx={{ fontFamily: fonts[index] }} key={fontItem} value={fontItem}>
						{fontItem}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default FontPicker
