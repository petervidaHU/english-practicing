import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { EnglishLevels } from '@/types/commonTypes';
interface TargetLevelProps {
  handleChange: any,
  selectedLevel: EnglishLevels,
}

const TargetLevel: React.FC<TargetLevelProps> = ({ selectedLevel, handleChange }) => (
  <FormControl
    variant="outlined"
    sx={{ margin: '20px', minWidth: '250px'}}>

    <InputLabel
      id="english-level-label">
      What is the target level of English?
    </InputLabel>

    <Select
      labelId="english-level-label"
      id="english-level-select"
      value={selectedLevel}
      onChange={handleChange}
      label="What is the target level of English?">

      {Object.values(EnglishLevels).map((level) => (
        <MenuItem
          key={level}
          value={level}>
          {level}
        </MenuItem>
      ))}

    </Select>
  </FormControl>
);

export default TargetLevel;