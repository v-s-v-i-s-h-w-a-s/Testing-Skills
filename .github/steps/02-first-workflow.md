# Step 2: Building Your First CI Workflow

Great job on setting up your first GitHub Actions workflow! 🎉 Now, let's build a more practical continuous integration (CI) workflow.

## Learning Objectives

- Understand the concepts of continuous integration
- Build a workflow that runs tests automatically
- Learn how to use matrix strategies for testing across multiple environments

## What is Continuous Integration?

Continuous Integration (CI) is a software development practice where team members integrate their work frequently, usually multiple times per day. Each integration is verified by an automated build and tests to detect errors quickly.

Benefits of CI include:

- Finding bugs earlier in development
- Reducing integration problems
- Enabling more frequent releases
- Improving code quality

## Your Task: Create a CI Workflow

1. Create a new branch called `feature-branch` from the main branch:

   ```bash
   git checkout main
   git pull
   git checkout -b feature-branch
   ```

2. Create a simple JavaScript application to test. First, create a file called `app.js`:

   ```javascript
   function add(a, b) {
     return a + b;
   }

   function subtract(a, b) {
     return a - b;
   }

   function multiply(a, b) {
     return a * b;
   }

   function divide(a, b) {
     if (b === 0) {
       throw new Error("Division by zero");
     }
     return a / b;
   }

   module.exports = {
     add,
     subtract,
     multiply,
     divide
   };
   ```

3. Create a test file called `app.test.js`:

   ```javascript
   const { add, subtract, multiply, divide } = require('./app');

   test('add function adds two numbers correctly', () => {
     expect(add(2, 3)).toBe(5);
   });

   test('subtract function subtracts two numbers correctly', () => {
     expect(subtract(5, 2)).toBe(3);
   });

   test('multiply function multiplies two numbers correctly', () => {
     expect(multiply(3, 4)).toBe(12);
   });

   test('divide function divides two numbers correctly', () => {
     expect(divide(10, 2)).toBe(5);
   });

   test('divide function throws error on division by zero', () => {
     expect(() => divide(10, 0)).toThrow('Division by zero');
   });
   ```

4. Create a `package.json` file:

   ```json
   {
     "name": "simple-calculator",
     "version": "1.0.0",
     "description": "A simple calculator for GitHub Actions demo",
     "main": "app.js",
     "scripts": {
       "test": "jest",
       "lint": "eslint ."
     },
     "devDependencies": {
       "eslint": "^8.54.0",
       "jest": "^29.7.0"
     }
   }
   ```

5. Create a CI workflow file `.github/workflows/ci-workflow.yml`:

   ```yaml
   name: Continuous Integration

   on:
     push:
       branches: [ main, feature-* ]
     pull_request:
       branches: [ main ]

   jobs:
     test:
       runs-on: ubuntu-latest
       
       strategy:
         matrix:
           node-version: [14.x, 16.x, 18.x]
       
       steps:
       - name: Checkout repository
         uses: actions/checkout@v3
         
       - name: Set up Node.js ${{ matrix.node-version }}
         uses: actions/setup-node@v3
         with:
           node-version: ${{ matrix.node-version }}
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Run linting
         run: npm run lint
         
       - name: Run tests
         run: npm test
         
       - name: Archive test results
         uses: actions/upload-artifact@v3
         with:
           name: test-results-node-${{ matrix.node-version }}
           path: |
             coverage
             test-report.xml
           retention-days: 5
   ```

6. Add an `.eslintrc.js` file for linting:

   ```javascript
   module.exports = {
     env: {
       commonjs: true,
       es2021: true,
       node: true,
       jest: true
     },
     extends: 'eslint:recommended',
     parserOptions: {
       ecmaVersion: 'latest'
     },
     rules: {
       'indent': ['error', 2],
       'linebreak-style': ['error', 'unix'],
       'quotes': ['error', 'single'],
       'semi': ['error', 'always']
     }
   };
   ```

7. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Add CI workflow with testing"
   git push -u origin feature-branch
   ```

## What's Happening?

The CI workflow you just created:

1. Runs whenever changes are pushed to `main` or any branch starting with `feature-`
2. Uses a matrix strategy to test on multiple Node.js versions (14.x, 16.x, and 18.x)
3. Checks out the code, sets up Node.js, and installs dependencies
4. Runs linting checks to ensure code quality
5. Runs tests to verify functionality
6. Archives test results as artifacts for later inspection

## Matrix Builds

The `matrix` strategy allows you to test your code across multiple environments. In this example, we're testing across three different Node.js versions. This ensures your code works consistently across different versions.

## Artifacts

The workflow saves test results as artifacts, which you can download after the workflow runs. This is useful for debugging and maintaining records of test results over time.

## Validation Criteria

I'll check for the following to consider this step complete:

- The `ci-workflow.yml` file exists with the correct configuration
- The JavaScript application files are properly created
- The workflow has run successfully on your feature branch

## Next Steps

Once this step is complete, we'll move on to creating a continuous deployment workflow that will automatically deploy your application when changes are merged to main.

Do you have any questions about this step? I'm here to help!

---

<details>
<summary>Need a hint? Click here!</summary>

If you're having trouble with the CI workflow, make sure:

1. All your JavaScript files have the correct syntax
2. Your `package.json` file includes all the necessary dependencies
3. The YAML indentation in your workflow file is correct

To fix Node.js dependency issues, you may need to use `npm install` locally to generate a `package-lock.json` file, then commit that file as well.

</details>
