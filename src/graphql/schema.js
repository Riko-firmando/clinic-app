// src/graphql/schema.js
export const typeDefs = `
  type Visit {
    id: ID!
    date: String!
    complaint: String!
    doctor: String!
  }

  type Patient {
    id: ID!
    name: String!
    age: String!
    gender: String!
    phone: String!
    email: String!
    address: String
    blood_type: String
    visits: [Visit]
  }

  type Appointment {
    id: ID!
    patientId: ID!
    patientName: String!
    doctor: String!
    date: String!   # YYYY-MM-DD
    time: String!   # HH:mm
  }

  type PatientResponse {
    items: [Patient]
    totalCount: Int!
  }

  type WorkflowStep {
    id: ID!
    title: String!
    order: Int!
    desc: String!
  }

  type Workflow {
    id: ID!
    name: String!
    steps: [WorkflowStep!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthPayload {
    accessToken: String!
    user: User!
  }

  input WorkflowStepInput {
    id: ID!
    title: String!
    order: Int!
    desc: String!
  }

  input UpdatePatientInput {
    name: String
    age: Int
    gender: String
    phone: String
    email: String
    address: String
    blood_type: String
  }

  type Mutation {
    createPatient(
      name: String!, 
      email: String!
      age: String!, 
      gender: String!, 
      phone: String!,
      address: String!,
      blood_type: String!
    ): Patient

    updatePatient(
      id: ID!
      input: UpdatePatientInput!
    ): Patient

    deletePatient(id: ID!): Boolean!

    saveWorkflow(
      name: String!
      steps: [WorkflowStepInput!]!
    ): Workflow

    login(email: String!, password: String!): AuthPayload!
  }
  
    
  type Query {
    patients(name: String, page: Int, limit: Int): PatientResponse
    patient(id: ID!): Patient
    appointments(month: Int!, year: Int!): [Appointment!]!
    appointmentsByDate(date: String!): [Appointment!]!
    workflow: Workflow
    me: User!
  }
`;
