import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Search(props) {
  const { filterOptions, setFilterOptions } = props;

  const handleChange = (e) => {
    const filterOptionsCopy = { ...filterOptions };
    filterOptionsCopy.searchInput = e.target.value;
    setFilterOptions(filterOptionsCopy);
  };

  return (
    <FormControl
      data-testid="search-input"
      sx={{ m: 1, width: "75%", borderRadius: "10px" }}
      size="small"
      variant="outlined">
      <OutlinedInput
        endAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        className="mui-textfield"
        value={filterOptions.searchInput}
        onChange={handleChange}
        margin="normal"
        placeholder="Search keyword"
      />
    </FormControl>
  );
}

export default Search;
