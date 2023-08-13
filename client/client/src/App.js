import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_PROPERTIES = gql`
query Query {
  users {
    id
    firstName
    lastName
    property {
      id
      street
      city
      state
      zip
      rent
    }
  }
}
`;
function DisplayProperties() {
  const { data , loading , error} = useQuery(GET_PROPERTIES);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  data.users.map((users) => {console.log(users)})
  return (
    <div>
        {data.users.map((users) => {
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
        })}
    </div>
  )
}
function App() {
  return (
    <div class="main">
      <div class="sub">
        <h2>My first Apollo app 🚀</h2>
        <div>
          <label>Search</label>
          <input
            onChange={(e) => { /* Handle updating search/filter text */ }}
            type="string"
          />
        </div>
        <br/>
          <button
          onClick={() => { /* Handle search/filter */ }}
          >
            Submit
          </button>
        <DisplayProperties />
      </div>
    </div>
  );
}

export default App;
