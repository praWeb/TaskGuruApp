import gql from 'graphql-tag'

// Create User
export const createUser = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, authProvider: {
      email: { email: $email, password: $password } } ) {
      id
      name
      createdAt
    }
  }
`

// Query to get the user details
export const getUserDetails = gql`
  query UserDetails($email: String!) {
    User(email: $email){
      id
      name
    }
  }
`

// Query for signing in
export const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`

// Query for creating task
export const createTask = gql`
  mutation createTask($title: String!, $description: String!, $userId: ID!, $statusId: ID!) {
    createTask(title: $title, description: $description, userId: $userId, statusId: $statusId) {
        id
        user {
          name
          email
        }
        status {
          id
          title
        }
        title
        description
        createdAt
      }
  }
`

// Task Details
export const TaskDetailsQuery = gql`
  query getTasks($id: ID!) {
    Task(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
      user {
        email
        name
      }
      status {
        id
        title
        percentCompleted
      }
    }
    allStatuses{
      id
      title
      percentCompleted
    }
  }
`

// Task list
export const TaskListQuery = gql`
  query getTasks($id: ID!){
    User(id: $id){
      email
      name
      tasks {
        id
        title
        description
        createdAt
        updatedAt
        status {
          id
          title
          percentCompleted
        }
      }
    }
  }
`

// Update Status

export const UpdateStatus = gql`
  mutation updateStatusForTask($taskID: ID!, $statusID: ID!){
    updateTask(id: $taskID, statusId: $statusID){
      id
      user {
        name
        email
      }
      status {
        id
        title
      }
      title
      description
      createdAt
    }
  }
`
