import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { typeDefs } from "../graphql/schema";
import { patients } from "../graphql/mocks/patients";
import { appointments } from "../graphql/mocks/appointments";
import { workflow } from "../graphql/mocks/workflow";
import { mockUsers } from "../graphql/mocks/users";

const schema = makeExecutableSchema({ typeDefs });
let currentUser = null;

const resolvers = {
  Query: {
    me: () => {
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      return currentUser;
    },
    patients: (_, { name, page = 1, limit = 5 }) => {
      let filtered = patients;
      if (name) {
        filtered = patients.filter((p) =>
          p.name.toLowerCase().includes(name.toLowerCase()),
        );
      }

      const totalCount = filtered.length;

      const offset = (page - 1) * limit;
      const items = filtered.slice(offset, offset + limit);

      return {
        items,
        totalCount,
      };
    },
    patient: (_, { id }) => {
      return patients.find((p) => p.id === id);
    },
    appointments: (_, { month, year }) => {
      return appointments.filter((a) => {
        const d = new Date(a.date);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      });
    },

    appointmentsByDate: (_, { date }) => {
      return appointments.filter((a) => a.date === date);
    },
    workflow: () => workflow,
  },
  Mutation: {
    createPatient: (_, args) => {
      const newPatient = {
        id: String(patients.length + 1),
        ...args,
        visits: [],
      };

      patients.unshift(newPatient);
      return newPatient;
    },
    updatePatient: (_, { id, input }) => {
      const index = patients.findIndex((p) => p.id === id);

      if (index === -1) {
        throw new Error("Patient not found");
      }

      patients[index] = {
        ...patients[index],
        ...input,
      };

      return patients[index];
    },
    deletePatient: (_, { id }) => {
      const index = patients.findIndex((p) => p.id === id);

      if (index === -1) {
        throw new Error("Patient not found");
      }

      patients.splice(index, 1);
      return true;
    },
    saveWorkflow: (_, { name, steps, desc }) => {
      workflow.name = name;
      workflow.desc = desc;
      workflow.steps = steps
        .sort((a, b) => a.order - b.order)
        .map((s) => ({ ...s }));

      return workflow;
    },
    login: (_, { email, password }) => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        throw new Error("Email atau password salah");
      }

      currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return {
        accessToken: "mock-token-123",
        user: currentUser,
      };
    },
  },
};

const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers,
  preserveResolvers: true,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: schemaWithMocks }),
});
