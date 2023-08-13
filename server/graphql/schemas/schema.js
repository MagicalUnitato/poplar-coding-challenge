export default `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    property: [Property!]
  }
  input SearchFilter {
    id: ID
    firstName: String
    lastName: String
  }
  type Property {
    id: ID!
    userId: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    rent: Int!
    user: User!
  }
  type Query {
    properties: [Property!]
    property(id: ID!): Property
    user(id: ID!): User
    users: [User!]
    search(input: SearchFilter!): User
  }
`;