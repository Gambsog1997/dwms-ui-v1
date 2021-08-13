import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onChange, onSearch, placeholder }) => {
  return (
    <Search
      onChange={onChange}
      style={{
        width: 200,
        marginBottom: 10,
      }}
      onSearch={onSearch}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
