import { generateUniqueID } from "../../customConstants/generateUniqueID";

// Mock Data with Unique IDs
export const mockScheduledBooks: Record<string, EventData[]> = {
  "02-08-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 1",
      date: "02-08-2023",
      reader: "John Doe",
      bookNo: "B001",
      totalBooks: "5",
      bookDescription: "Event 1 round",
    },
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 2",
      date: "02-08-2023",
      reader: "Jane Smith",
      bookNo: "B002",
      totalBooks: "3",
      bookDescription: "Event 2 round",
    },
    // Add more events as needed
  ],
  "26-07-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 3",
      date: "26-07-2023",
      reader: "Alice Johnson",
      bookNo: "B003",
      totalBooks: "2",
      bookDescription: "Event 3 round",
    },
    // Add more events as needed
  ],
  "28-07-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 4",
      date: "28-07-2023",
      reader: "Alice Johnson",
      bookNo: "B004",
      totalBooks: "2",
      bookDescription: "Event 4 round",
    },
    // Add more events as needed
  ],
  "03-08-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 5",
      date: "03-08-2023",
      reader: "Alice Johnson",
      bookNo: "B005",
      totalBooks: "7",
      bookDescription: "Event 5 round",
    },
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 6",
      date: "03-08-2023",
      reader: "Alice Johnson",
      bookNo: "B006",
      totalBooks: "7",
      bookDescription: "Event 5 round",
    },
    // Add more events as needed
  ],
};
