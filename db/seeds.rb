# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create a seed user for exercises
seed_user = User.find_or_create_by!(email: 'admin@vimgolf.com') do |user|
  user.password = 'password123'
  user.password_confirmation = 'password123'
end

# Clear existing exercises to make this idempotent
Exercise.destroy_all

exercises_data = [
  {
    title: "Add Function Parameter",
    description: "Add a new parameter 'userId' to the function signature and update the function call",
    start_file: "function fetchData(apiKey) {\n  return fetch('/api/data', {\n    headers: { 'X-API-Key': apiKey }\n  });\n}\n\nfetchData('abc123');",
    end_file: "function fetchData(apiKey, userId) {\n  return fetch('/api/data', {\n    headers: { 'X-API-Key': apiKey, 'User-Id': userId }\n  });\n}\n\nfetchData('abc123', '42');"
  },
  {
    title: "Convert var to const",
    description: "Replace all 'var' declarations with 'const' in this JavaScript code",
    start_file: "var name = 'Alice';\nvar age = 30;\nvar city = 'Berlin';\nvar country = 'Germany';",
    end_file: "const name = 'Alice';\nconst age = 30;\nconst city = 'Berlin';\nconst country = 'Germany';"
  },
  {
    title: "Add Error Handling",
    description: "Wrap the function body in a try-catch block",
    start_file: "function parseJSON(data) {\n  const result = JSON.parse(data);\n  return result;\n}",
    end_file: "function parseJSON(data) {\n  try {\n    const result = JSON.parse(data);\n    return result;\n  } catch (error) {\n    console.error('Failed to parse JSON:', error);\n    return null;\n  }\n}"
  },
  {
    title: "Convert Single Quotes to Double Quotes",
    description: "Replace all single quotes with double quotes in this Python code",
    start_file: "name = 'Alice'\ncity = 'Paris'\ngreeting = 'Hello, World!'\nmessage = 'Welcome to Python'",
    end_file: "name = \"Alice\"\ncity = \"Paris\"\ngreeting = \"Hello, World!\"\nmessage = \"Welcome to Python\""
  },
  {
    title: "Extract Variable",
    description: "Extract the repeated calculation into a variable named 'basePrice'",
    start_file: "const total = items.length * 10 + tax;\nconst discount = (items.length * 10) * 0.1;\nconst final = items.length * 10 - discount;",
    end_file: "const basePrice = items.length * 10;\nconst total = basePrice + tax;\nconst discount = basePrice * 0.1;\nconst final = basePrice - discount;"
  },
  {
    title: "Add JSDoc Comment",
    description: "Add a JSDoc comment block above the function",
    start_file: "function calculateArea(width, height) {\n  return width * height;\n}",
    end_file: "/**\n * Calculates the area of a rectangle\n * @param {number} width - The width of the rectangle\n * @param {number} height - The height of the rectangle\n * @returns {number} The area\n */\nfunction calculateArea(width, height) {\n  return width * height;\n}"
  },
  {
    title: "Convert Array to Object Destructuring",
    description: "Convert array indexing to object destructuring",
    start_file: "const user = ['Alice', 30, 'alice@example.com'];\nconst name = user[0];\nconst age = user[1];\nconst email = user[2];",
    end_file: "const user = { name: 'Alice', age: 30, email: 'alice@example.com' };\nconst { name, age, email } = user;"
  },
  {
    title: "Add Import Statement",
    description: "Add the missing import statement at the top of the file",
    start_file: "export function createUser(name) {\n  return {\n    id: uuid(),\n    name,\n    createdAt: new Date()\n  };\n}",
    end_file: "import { uuid } from './utils';\n\nexport function createUser(name) {\n  return {\n    id: uuid(),\n    name,\n    createdAt: new Date()\n  };\n}"
  },
  {
    title: "Convert forEach to map",
    description: "Replace forEach with map to create a new array",
    start_file: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = [];\nnumbers.forEach(n => {\n  doubled.push(n * 2);\n});",
    end_file: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);"
  },
  {
    title: "Add Type Annotations (TypeScript)",
    description: "Add TypeScript type annotations to the function",
    start_file: "function greet(name) {\n  return `Hello, ${name}!`;\n}",
    end_file: "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}"
  },
  {
    title: "Convert if-else to Ternary",
    description: "Convert the if-else statement to a ternary operator",
    start_file: "let status;\nif (age >= 18) {\n  status = 'adult';\n} else {\n  status = 'minor';\n}",
    end_file: "const status = age >= 18 ? 'adult' : 'minor';"
  },
  {
    title: "Add Default Parameter",
    description: "Add default parameter values to the function",
    start_file: "function createConfig(host, port, protocol) {\n  return { host, port, protocol };\n}",
    end_file: "function createConfig(host = 'localhost', port = 3000, protocol = 'http') {\n  return { host, port, protocol };\n}"
  },
  {
    title: "Convert Template String",
    description: "Convert string concatenation to template literals",
    start_file: "const message = 'Hello, ' + name + '! You are ' + age + ' years old.';\nconst url = 'https://' + domain + '/api/' + endpoint;",
    end_file: "const message = `Hello, ${name}! You are ${age} years old.`;\nconst url = `https://${domain}/api/${endpoint}`;"
  },
  {
    title: "Add Async/Await",
    description: "Convert the promise chain to async/await",
    start_file: "function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data.user);\n}",
    end_file: "async function fetchUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  const data = await res.json();\n  return data.user;\n}"
  },
  {
    title: "Add Object Shorthand",
    description: "Use object property shorthand notation",
    start_file: "const name = 'Alice';\nconst age = 30;\nconst city = 'Paris';\nconst user = { name: name, age: age, city: city };",
    end_file: "const name = 'Alice';\nconst age = 30;\nconst city = 'Paris';\nconst user = { name, age, city };"
  },
  {
    title: "Convert to Arrow Function",
    description: "Convert the function expression to an arrow function",
    start_file: "const double = function(x) {\n  return x * 2;\n};\nconst add = function(a, b) {\n  return a + b;\n};",
    end_file: "const double = (x) => x * 2;\nconst add = (a, b) => a + b;"
  },
  {
    title: "Add Array Spread",
    description: "Use spread operator to combine arrays",
    start_file: "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = arr1.concat(arr2);",
    end_file: "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];"
  },
  {
    title: "Convert Class to Function",
    description: "Convert the ES6 class to a regular function with prototype",
    start_file: "class Counter {\n  constructor(initial) {\n    this.count = initial;\n  }\n  increment() {\n    this.count++;\n  }\n}",
    end_file: "function Counter(initial) {\n  this.count = initial;\n}\nCounter.prototype.increment = function() {\n  this.count++;\n};"
  },
  {
    title: "Add Null Coalescing",
    description: "Replace OR operator with nullish coalescing operator",
    start_file: "const port = config.port || 3000;\nconst host = config.host || 'localhost';\nconst timeout = config.timeout || 5000;",
    end_file: "const port = config.port ?? 3000;\nconst host = config.host ?? 'localhost';\nconst timeout = config.timeout ?? 5000;"
  },
  {
    title: "Convert to Optional Chaining",
    description: "Use optional chaining to safely access nested properties",
    start_file: "const userName = user && user.profile && user.profile.name;\nconst userCity = user && user.address && user.address.city;",
    end_file: "const userName = user?.profile?.name;\nconst userCity = user?.address?.city;"
  },
  {
    title: "Duplicate Lines",
    description: "Duplicate each console.log line",
    start_file: "console.log('Starting application');\nconsole.log('Loading configuration');\nconsole.log('Connecting to database');",
    end_file: "console.log('Starting application');\nconsole.log('Starting application');\nconsole.log('Loading configuration');\nconsole.log('Loading configuration');\nconsole.log('Connecting to database');\nconsole.log('Connecting to database');"
  },
  {
    title: "Reverse Lines",
    description: "Reverse the order of the array elements",
    start_file: "const days = [\n  'Monday',\n  'Tuesday',\n  'Wednesday',\n  'Thursday',\n  'Friday'\n];",
    end_file: "const days = [\n  'Friday',\n  'Thursday',\n  'Wednesday',\n  'Tuesday',\n  'Monday'\n];"
  },
  {
    title: "Sort Import Statements",
    description: "Sort the import statements alphabetically",
    start_file: "import { useState } from 'react';\nimport axios from 'axios';\nimport { useEffect } from 'react';\nimport { Button } from './components';",
    end_file: "import axios from 'axios';\nimport { useEffect } from 'react';\nimport { useState } from 'react';\nimport { Button } from './components';"
  },
  {
    title: "Add Return Type",
    description: "Add explicit return type to all functions",
    start_file: "function add(a: number, b: number) {\n  return a + b;\n}\nfunction greet(name: string) {\n  return `Hello, ${name}`;\n}",
    end_file: "function add(a: number, b: number): number {\n  return a + b;\n}\nfunction greet(name: string): string {\n  return `Hello, ${name}`;\n}"
  },
  {
    title: "Convert Switch to Object",
    description: "Convert switch statement to object lookup",
    start_file: "function getColor(status) {\n  switch(status) {\n    case 'success': return 'green';\n    case 'error': return 'red';\n    case 'warning': return 'yellow';\n    default: return 'gray';\n  }\n}",
    end_file: "function getColor(status) {\n  const colors = {\n    success: 'green',\n    error: 'red',\n    warning: 'yellow'\n  };\n  return colors[status] || 'gray';\n}"
  },
  {
    title: "Add Enum Values",
    description: "Convert string literals to enum values",
    start_file: "const status1 = 'pending';\nconst status2 = 'completed';\nconst status3 = 'failed';",
    end_file: "enum Status {\n  Pending = 'pending',\n  Completed = 'completed',\n  Failed = 'failed'\n}\nconst status1 = Status.Pending;\nconst status2 = Status.Completed;\nconst status3 = Status.Failed;"
  },
  {
    title: "Remove Console Logs",
    description: "Remove all console.log statements from the code",
    start_file: "function processData(data) {\n  console.log('Processing:', data);\n  const result = data.map(x => x * 2);\n  console.log('Result:', result);\n  return result;\n}",
    end_file: "function processData(data) {\n  const result = data.map(x => x * 2);\n  return result;\n}"
  },
  {
    title: "Add Guard Clause",
    description: "Add early return guard clauses",
    start_file: "function processUser(user) {\n  if (user) {\n    if (user.isActive) {\n      return user.name.toUpperCase();\n    }\n  }\n  return null;\n}",
    end_file: "function processUser(user) {\n  if (!user) return null;\n  if (!user.isActive) return null;\n  return user.name.toUpperCase();\n}"
  },
  {
    title: "Convert to Named Export",
    description: "Convert default export to named export",
    start_file: "export default function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}",
    end_file: "export function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}"
  },
  {
    title: "Add Const Assertion",
    description: "Add 'as const' assertion to object literals",
    start_file: "const config = {\n  API_URL: 'https://api.example.com',\n  TIMEOUT: 5000,\n  MAX_RETRIES: 3\n};",
    end_file: "const config = {\n  API_URL: 'https://api.example.com',\n  TIMEOUT: 5000,\n  MAX_RETRIES: 3\n} as const;"
  },
  {
    title: "Wrap in IIFE",
    description: "Wrap the code in an Immediately Invoked Function Expression",
    start_file: "const x = 10;\nconst y = 20;\nconst result = x + y;\nconsole.log(result);",
    end_file: "(function() {\n  const x = 10;\n  const y = 20;\n  const result = x + y;\n  console.log(result);\n})();"
  },
  {
    title: "Convert JSON to YAML",
    description: "Convert the JSON object to YAML format",
    start_file: "{\n  \"name\": \"my-app\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"express\": \"^4.18.0\"\n  }\n}",
    end_file: "name: my-app\nversion: 1.0.0\ndependencies:\n  express: ^4.18.0"
  },
  {
    title: "Add Semicolons",
    description: "Add semicolons to all statement endings",
    start_file: "const name = 'Alice'\nconst age = 30\nconst greet = () => console.log('Hello')\ngreet()",
    end_file: "const name = 'Alice';\nconst age = 30;\nconst greet = () => console.log('Hello');\ngreet();"
  },
  {
    title: "Remove Semicolons",
    description: "Remove all semicolons from the code",
    start_file: "const name = 'Alice';\nconst age = 30;\nconst greet = () => console.log('Hello');\ngreet();",
    end_file: "const name = 'Alice'\nconst age = 30\nconst greet = () => console.log('Hello')\ngreet()"
  },
  {
    title: "Increment All Numbers",
    description: "Increment all numeric values by 1",
    start_file: "const values = [5, 10, 15, 20];\nconst offset = 100;\nconst limit = 50;",
    end_file: "const values = [6, 11, 16, 21];\nconst offset = 101;\nconst limit = 51;"
  },
  {
    title: "Convert camelCase to snake_case",
    description: "Convert all variable names from camelCase to snake_case",
    start_file: "const firstName = 'Alice';\nconst lastName = 'Smith';\nconst userAge = 30;\nconst isActive = true;",
    end_file: "const first_name = 'Alice';\nconst last_name = 'Smith';\nconst user_age = 30;\nconst is_active = true;"
  },
  {
    title: "Add Readonly Modifier",
    description: "Add readonly modifier to all class properties",
    start_file: "class User {\n  name: string;\n  email: string;\n  id: number;\n}",
    end_file: "class User {\n  readonly name: string;\n  readonly email: string;\n  readonly id: number;\n}"
  },
  {
    title: "Convert Array Methods Chain",
    description: "Convert separate array operations to a single method chain",
    start_file: "const numbers = [1, 2, 3, 4, 5];\nconst filtered = numbers.filter(n => n > 2);\nconst doubled = filtered.map(n => n * 2);\nconst sum = doubled.reduce((a, b) => a + b, 0);",
    end_file: "const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers\n  .filter(n => n > 2)\n  .map(n => n * 2)\n  .reduce((a, b) => a + b, 0);"
  },
  {
    title: "Add Constructor Parameters",
    description: "Convert class properties to constructor parameters (TypeScript shorthand)",
    start_file: "class Point {\n  x: number;\n  y: number;\n  \n  constructor(x: number, y: number) {\n    this.x = x;\n    this.y = y;\n  }\n}",
    end_file: "class Point {\n  constructor(public x: number, public y: number) {}\n}"
  },
  {
    title: "Convert to Record Type",
    description: "Convert interface to Record type",
    start_file: "interface StringMap {\n  [key: string]: string;\n}",
    end_file: "type StringMap = Record<string, string>;"
  },
  {
    title: "Add Logging Wrapper",
    description: "Wrap each function call with console.log statements",
    start_file: "fetchData();\nprocessResult();\nsaveToDatabase();",
    end_file: "console.log('Calling fetchData');\nfetchData();\nconsole.log('Calling processResult');\nprocessResult();\nconsole.log('Calling saveToDatabase');\nsaveToDatabase();"
  }
]

# Create all exercises
exercises_data.each do |exercise_data|
  Exercise.create!(
    title: exercise_data[:title],
    description: exercise_data[:description],
    start_file: exercise_data[:start_file],
    end_file: exercise_data[:end_file],
    user: seed_user
  )
end

puts "Seeded #{exercises_data.count} coding exercises!"