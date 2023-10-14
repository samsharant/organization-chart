import { FormControl, MenuItem, Select } from "@mui/material";

function FilterByTeam({ team, handleChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select labelId="select-team-label" value={team} onChange={handleChange}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="product">Product</MenuItem>
        <MenuItem value="leadership">Leadership</MenuItem>
        <MenuItem value="finance">Finance</MenuItem>
        <MenuItem value="business">Business</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterByTeam;
