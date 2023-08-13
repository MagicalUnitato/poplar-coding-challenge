import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
const GET_PROPERTIES_SEARCH = gql`
  query Query($input: SearchFilter) {
    search(input: $input) {
      firstName
      lastName
      property {
        street
        city
        state
        rent
        zip
      }
    }
  }
`;

function useSearchFilters() {
  const [filters, _updateFilter] = useState({ 
    id: undefined, 
    name: undefined 
  });

  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}

function App() {
  const { operations, models } = useSearchFilters();
  const { data, loading, error, refetch } = useQuery(GET_PROPERTIES_SEARCH);
  if (loading) return "Loading...";
  if (error) return <div>error</div>;
  return (
    <div class="main">
      <div class="sub">
        <Typography variant="h2" component="h2">Poplar Code Challenge</Typography>
        <div>
          <label>Search</label>
          <Input onChange={(e) => operations.updateFilter("name", e.target.value)} type="string"/>
        </div>
        <br/>
        <Button onClick={() =>refetch({input: { firstName: models.filters.name },})}>Submit</Button>
        {/*data.search.map((users) => {
          return <ul key={users.id}>
              <li>{users.lastName},{users.firstName}</li>
              {users.property.map((property) => {
                return <ul key={property.id}>
                    <li>{property.street}</li>
                    <li>{property.city}</li>
                    <li>{property.state}</li>
                    <li>{property.zip}</li>
                    <li>{property.rent}</li>
                </ul>
              })}
          </ul>
        })*/}
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
        </List>
      </div>
    </div>
  );
}

export default App;
