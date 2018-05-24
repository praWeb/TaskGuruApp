import gql from 'graphql-tag'

// Create User
export const createUser = gql`
  mutation createUser($id: ID!, $isVerified: Boolean!, $createdAt: String!, $name: String!, $email: String!, $password: String!, $updatedAt: String!) {
    createUser(input: {
      id: $id,
      createdAt: $createdAt,
      updatedAt: $updatedAt,
      name: $name,
      isVerified: $isVerified,
      email: $email,
      password: $password
    }) {
      id
      name
      createdAt
    }
  }
`

// Query to get the user details
export const getUserDetails = gql`
  query getUserDetails($email: String!, $password: String!) {
    getUserDetails(input: { email: $email, password: $password }){
      id
      name
    }
  }
`

// Query for creating task
export const createTask = gql`
  mutation createTask($title: String!, $description: String!, $userId: ID!, $statusId: ID!) {
    addTask(title: $title, description: $description, userId: $userId, statusId: $statusId) {
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

// Delete Task
export const DeleteTask = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
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
  query getTasks($id: ID!, $first: Int!, $skip: Int!){
    allTasks(filter:{ user: { id: $id} }, first: $first, skip: $skip){
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
      user {
        name
        email
      }
    }
  }
`

// Update Status

export const UpdateStatus = gql`
  mutation updateStatusForTask($taskID: ID!, $statusID: ID!){
    putTask(id: $taskID, statusId: $statusID){
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
