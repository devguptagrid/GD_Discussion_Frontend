export const mockQuestions = [
  {
    id: 1,
    text: "How does React's virtual DOM improve performance compared to direct DOM manipulation?",
    user: "Alice Chen",
    timestamp: "2 hours ago",
    answers: [
      { id: 101, text: "React creates a lightweight copy of the actual DOM. When state changes, it calculates the minimal set of changes needed (diffing) and applies only those changes to the real DOM, avoiding expensive full re-renders.", user: "Bob Kumar", upvotes: 12, isBest: true },
      { id: 102, text: "Think of it like editing a draft before publishing. React edits its virtual draft first, then only updates the final version where things actually changed.", user: "Sara Lee", upvotes: 8 },
    ],
  },
  {
    id: 2,
    text: "What is the difference between useEffect and useLayoutEffect?",
    user: "David Park",
    timestamp: "5 hours ago",
    answers: [
      { id: 201, text: "useEffect runs asynchronously after the browser paints, while useLayoutEffect runs synchronously before the browser paints. Use useLayoutEffect when you need to measure DOM elements or prevent visual flicker.", user: "Maria Garcia", upvotes: 15, isBest: true },
    ],
  },
  {
    id: 3,
    text: "Can someone explain closures in JavaScript with a simple example?",
    user: "Emma Wilson",
    timestamp: "1 day ago",
    answers: [
      { id: 301, text: "A closure is a function that remembers variables from its outer scope even after the outer function has returned. Example: function counter() { let count = 0; return () => ++count; }", user: "James Liu", upvotes: 20, isBest: true },
      { id: 302, text: "Think of closures as a backpack — the inner function carries around the variables it needs from the outer function.", user: "Nina Patel", upvotes: 10 },
      { id: 303, text: "Closures are used heavily in React hooks. Each render creates a closure over the current state values.", user: "Tom Brown", upvotes: 6 },
    ],
  },
  {
    id: 4,
    text: "What are the best practices for structuring a large React application?",
    user: "Oliver Smith",
    timestamp: "2 days ago",
    answers: [
      { id: 401, text: "Use feature-based folder structure, keep components small and focused, separate business logic from UI, use custom hooks for reusable logic, and implement proper state management.", user: "Rachel Kim", upvotes: 18, isBest: true },
    ],
  },
  {
    id: 5,
    text: "How does CSS Grid differ from Flexbox? When should I use each?",
    user: "Sophia Martinez",
    timestamp: "3 days ago",
    answers: [
      { id: 501, text: "Flexbox is one-dimensional (row OR column), Grid is two-dimensional (rows AND columns). Use Flexbox for component-level layouts and Grid for page-level layouts.", user: "Liam Johnson", upvotes: 14, isBest: true },
      { id: 502, text: "A good rule of thumb: if you're laying items out in a line, use Flexbox. If you need to control both rows and columns simultaneously, use Grid.", user: "Ava Williams", upvotes: 9 },
    ],
  },
];

export const getSearchResults = (query) => {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  return mockQuestions
    .filter((q) => q.text.toLowerCase().includes(lower))
    .map((q) => ({
      ...q,
      preview: q.answers[0]?.text.slice(0, 100) + "..." || "No answers yet",
    }));
};
