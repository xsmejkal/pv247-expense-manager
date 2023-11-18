export type mockDataType = {
    users: [{id: string, username: string}], categories: any[], expenses: any[];
}

export const mockData: mockDataType = {
  users: [
    { id: "user1", username: "user1" },
    // Add more users as needed
  ],
  categories: [
    {
      id: 1,
      name: "Category 1",
      description: "Description 1",
      userId: "user1",
    },
    {
      id: 2,
      name: "Category 2",
      description: "Description 2",
      userId: "user1",
    },
    {
      id: 3,
      name: "Category 3",
      description: "Description 3",
      userId: "user1",
    },
    // Add more categories as needed
  ],
  expenses: [
    {
      id: 1,
      name: "Expense 1",
      description: "Expense Description 1",
      amount: 10.0,
      date: new Date(),
      userId: "user1",
      categoryId: 1,
    },
    {
      id: 2,
      name: "Expense 2",
      description: "Expense Description 2",
      amount: 20.0,
      date: new Date(),
      userId: "user1",
      categoryId: 1,
    },
    {
      id: 3,
      name: "Expense 3",
      description: "Expense Description 3",
      amount: 30.0,
      date: new Date(),
      userId: "user1",
      categoryId: 1,
    },
    {
      id: 4,
      name: "Expense 4",
      description: "Expense Description 4",
      amount: 15.0,
      date: new Date(),
      userId: "user1",
      categoryId: 2,
    },
    {
      id: 5,
      name: "Expense 5",
      description: "Expense Description 5",
      amount: 25.0,
      date: new Date(),
      userId: "user1",
      categoryId: 2,
    },
    {
      id: 6,
      name: "Expense 6",
      description: "Expense Description 6",
      amount: 35.0,
      date: new Date(),
      userId: "user1",
      categoryId: 2,
    },
    {
      id: 7,
      name: "Expense 7",
      description: "Expense Description 7",
      amount: 12.0,
      date: new Date(),
      userId: "user1",
      categoryId: 3,
    },
    {
      id: 8,
      name: "Expense 8",
      description: "Expense Description 8",
      amount: 22.0,
      date: new Date(),
      userId: "user1",
      categoryId: 3,
    },
    {
      id: 9,
      name: "Expense 9",
      description: "Expense Description 9",
      amount: 32.0,
      date: new Date(),
      userId: "user1",
      categoryId: 3,
    },
    // Add more expenses as needed
  ],
};
