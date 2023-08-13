import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  if (loading) return "Loading...";
  if (error) return <div>error</div>;
  return (
    <div class="main">
      <div class="sub">
        <Typography variant="h2" component="h2">Poplar Code Challenge</Typography>
        <div>
          <Autocomplete /* autocomplete search */
            id="free-solo-demo"
            freeSolo
            options={data.search.map((users) => users.firstName)}
            onInputChange={(e,value) => operations.updateFilter("name", value)}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </div>
        <br/>
        <Button onClick={() =>refetch({input: { firstName: models.filters.name },})}>Submit</Button>
      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
        {data.search.map((users) => { /* map data given from query */
          return ( 
            <div>
            <ListItem key={users.id} onClick={handleClick}>
                <ListItemText primary={users.firstName} secondary={users.lastName}/>
            </ListItem>
                <List component='li' disablePadding key={users.firstName}>
                    {users.property.map(property => { /* map property array from users */
                        return (
                          <div>
                            <ListItem key={property.id}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText key={property.id} primary={property.street} secondary="Street"/>
                            </ListItem>
                            <ListItem key={property.id}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText key={property.id} primary={property.city} secondary="City"/>
                            </ListItem>
                            <ListItem key={property.id}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText key={property.id} primary={property.state} secondary="State"/>
                            </ListItem>
                            <ListItem key={property.id}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText key={property.id} primary={property.zip} secondary="Zip"/>
                            </ListItem>
                            <ListItem key={property.id}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText key={property.id} primary={property.rent} secondary="Rent"/>
                            </ListItem>
                            <Divider />
                          </div>
                        )
                    })}
                </List>
            <Divider />
        </div>
          )
        })}
      </List>
      </div>
    </div>
  );
}

export default App;
