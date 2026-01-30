import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query SearchPatients($name: String, $page: Int, $limit: Int) {
    patients(name: $name, page: $page, limit: $limit) {
      # Kita harus masuk ke dalam field 'items'
      items {
        id
        name
        age
        gender
        phone
        email
      }
      # Kita butuh totalCount untuk navigasi pagination di UI
      totalCount
    }
  }
`;

export const GET_PATIENT_DETAIL = gql`
  query GetPatientDetail($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      gender
      phone
      email
      address
      blood_type
      visits {
        id
        date
        complaint
        doctor
      }
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation CreatePatient(
    $name: String!
    $age: String!
    $gender: String!
    $phone: String!
    $email: String!
    $address: String!
    $blood_type: String!
  ) {
    createPatient(
      name: $name
      age: $age
      gender: $gender
      phone: $phone
      email: $email
      address: $address
      blood_type: $blood_type
    ) {
      id
      name
      age
      gender
      phone
      email
      address
      blood_type
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      age
      gender
      phone
      email
      address
      blood_type
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;

export const GET_APPOINTMENTS = gql`
  query GetAppointments($month: Int!, $year: Int!) {
    appointments(month: $month, year: $year) {
      id
      patientName
      doctor
      date
      time
    }
  }
`;

export const GET_WORKFLOW = gql`
  query {
    workflow {
      id
      name
      steps {
        id
        title
        order
        desc
      }
    }
  }
`;

export const SAVE_WORKFLOW = gql`
  mutation SaveWorkflow($name: String!, $steps: [WorkflowStepInput!]!) {
    saveWorkflow(name: $name, steps: $steps) {
      id
      steps {
        id
        title
        order
        desc
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        name
        role
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query Me {
    me {
      id
      name
      email
      role
    }
  }
`;
