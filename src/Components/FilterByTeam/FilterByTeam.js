import { FormControl, MenuItem, Select } from "@mui/material";
import { teams } from "../../constants";

function FilterByTeam({ team, handleChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select labelId="select-team-label" value={team} onChange={handleChange}>
        <MenuItem value={teams.all}>All</MenuItem>
        <MenuItem value={teams.product}>Product</MenuItem>
        <MenuItem value={teams.leadership}>Leadership</MenuItem>
        <MenuItem value={teams.finance}>Finance</MenuItem>
        <MenuItem value={teams.business}>Business</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterByTeam;
