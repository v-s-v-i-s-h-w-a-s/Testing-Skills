# Step 3: Implementing Continuous Deployment (CD)

Congratulations on creating your CI workflow! 🚀 Now let's take the next step and implement Continuous Deployment (CD) to automatically deploy your application when changes are merged.

## Learning Objectives

- Understand the concepts of continuous deployment
- Set up environment-specific workflows
- Learn how to use GitHub Secrets for secure deployment
- Implement a deployment workflow for a simple application

## What is Continuous Deployment?

Continuous Deployment (CD) is a software development practice where code changes that pass all tests are automatically deployed to production or staging environments. This approach:

- Reduces manual deployment errors
- Enables faster release cycles
- Provides more immediate feedback
- Improves overall software delivery process

## Your Task: Create a CD Workflow

1. Make sure you're on your `feature-branch`:

   ```bash
   git checkout feature-branch
   ```

2. First, let's create a simple Express.js application to deploy. Create a new file called `server.js`:

   ```javascript
   const express = require('express');
   const { add, subtract, multiply, divide } = require('./app');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(express.json());

   app.get('/', (req, res) => {
     res.send('Calculator API is running!');
   });

   app.get('/api/add/:a/:b', (req, res) => {
     const a = parseFloat(req.params.a);
     const b = parseFloat(req.params.b);
     res.json({ result: add(a, b) });
   });

   app.get('/api/subtract/:a/:b', (req, res) => {
     const a = parseFloat(req.params.a);
     const b = parseFloat(req.params.b);
     res.json({ result: subtract(a, b) });
   });

   app.get('/api/multiply/:a/:b', (req, res) => {
     const a = parseFloat(req.params.a);
     const b = parseFloat(req.params.b);
     res.json({ result: multiply(a, b) });
   });

   app.get('/api/divide/:a/:b', (req, res) => {
     const a = parseFloat(req.params.a);
     const b = parseFloat(req.params.b);
     try {
       const result = divide(a, b);
       res.json({ result });
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });

   if (process.env.NODE_ENV !== 'test') {
     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
   }

   module.exports = app; // For testing
   ```

3. Update your `package.json` to include Express and a start script:

   ```json
   {
     "name": "calculator-api",
     "version": "1.0.0",
     "description": "A simple calculator API for GitHub Actions demo",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js",
       "test": "jest",
       "lint": "eslint ."
     },
     "dependencies": {
       "express": "^4.18.2"
     },
     "devDependencies": {
       "eslint": "^8.54.0",
       "jest": "^29.7.0",
       "nodemon": "^3.0.1",
       "supertest": "^6.3.3"
     },
     "engines": {
       "node": ">=14.0.0"
     }
   }
   ```

4. Create a test file for the server called `server.test.js`:

   ```javascript
   const request = require('supertest');
   const app = require('./server');

   describe('Calculator API', () => {
     test('GET / should return status message', async () => {
       const response = await request(app).get('/');
       expect(response.status).toBe(200);
       expect(response.text).toBe('Calculator API is running!');
     });

     test('GET /api/add should add two numbers', async () => {
       const response = await request(app).get('/api/add/5/3');
       expect(response.status).toBe(200);
       expect(response.body).toEqual({ result: 8 });
     });

     test('GET /api/subtract should subtract two numbers', async () => {
       const response = await request(app).get('/api/subtract/5/3');
       expect(response.status).toBe(200);
       expect(response.body).toEqual({ result: 2 });
     });

     test('GET /api/multiply should multiply two numbers', async () => {
       const response = await request(app).get('/api/multiply/5/3');
       expect(response.status).toBe(200);
       expect(response.body).toEqual({ result: 15 });
     });

     test('GET /api/divide should divide two numbers', async () => {
       const response = await request(app).get('/api/divide/6/3');
       expect(response.status).toBe(200);
       expect(response.body).toEqual({ result: 2 });
     });

     test('GET /api/divide should return error for division by zero', async () => {
       const response = await request(app).get('/api/divide/6/0');
       expect(response.status).toBe(400);
       expect(response.body).toEqual({ error: 'Division by zero' });
     });
   });
   ```

5. Create a new CD workflow file `.github/workflows/cd-workflow.yml`:

   ```yaml
   name: Continuous Deployment

   on:
     push:
       branches: [ main ]

   jobs:
     test:
       name: Test
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout repository
         uses: actions/checkout@v3
         
       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18.x'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Run tests
         run: npm test

     deploy-staging:
       name: Deploy to Staging
       needs: test
       runs-on: ubuntu-latest
       environment:
         name: staging
         url: ${{ steps.deploy-to-staging.outputs.deployment-url }}
       
       steps:
       - name: Checkout repository
         uses: actions/checkout@v3
         
       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18.x'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Deploy to staging environment
         id: deploy-to-staging
         # In a real scenario, you would use a deployment action here
         # For example: uses: your-deployment-action@v1
         run: |
           echo "Deploying to staging environment..."
           echo "deployment-url=https://staging-example.herokuapp.com" >> $GITHUB_OUTPUT
           
       - name: Run smoke tests against staging
         run: |
           echo "Running smoke tests against staging environment..."
           # In a real scenario, you would run actual tests here
           echo "Smoke tests passed!"

     deploy-production:
       name: Deploy to Production
       needs: deploy-staging
       runs-on: ubuntu-latest
       environment:
         name: production
         url: ${{ steps.deploy-to-production.outputs.deployment-url }}
       
       steps:
       - name: Checkout repository
         uses: actions/checkout@v3
         
       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18.x'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Deploy to production environment
         id: deploy-to-production
         # In a real scenario, you would use a deployment action here
         # For example: uses: your-deployment-action@v1
         run: |
           echo "Deploying to production environment..."
           echo "deployment-url=https://example.herokuapp.com" >> $GITHUB_OUTPUT
           
       - name: Notify deployment completion
         run: |
           echo "Application successfully deployed to production!"
   ```

6. Create a `.gitignore` file if you don't have one already:

   ```
   node_modules/
   coverage/
   .env
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   ```

7. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Add CD workflow and Express application"
   git push origin feature-branch
   ```

8. Create a pull request from your `feature-branch` to the `main` branch.

## What's Happening?

The CD workflow you just created:

1. Runs only when changes are pushed to the `main` branch (typically after a PR is merged)
2. First runs the tests to ensure the code is working correctly
3. Deploys to a staging environment if tests pass
4. Runs smoke tests against the staging environment
5. Deploys to production if the staging deployment is successful

## Environments and Deployment Approvals

In a real-world scenario, you might want to add approval requirements for production deployments. GitHub allows you to configure environments with required reviewers, which means a human must approve the deployment before it runs.

## GitHub Secrets

For real deployments, you would typically use GitHub Secrets to store sensitive information like API keys, deployment tokens, and database credentials. These secrets can be accessed in your workflows like this:

```yaml
run: |
  echo "Deploying with token: ${{ secrets.DEPLOYMENT_TOKEN }}"
```

## Validation Criteria

I'll check for the following to consider this step complete:

- The `cd-workflow.yml` file exists with the correct configuration
- The Express.js application files are properly created
- The pull request from `feature-branch` to `main` has been created

## Next Steps

Once this step is complete and your PR is open (no need to merge it yet), we'll move on to implementing AGILE-SCRUM practices using GitHub's project management features.

Do you have any questions about this step? I'm here to help!

---

<details>
<summary>Need a hint? Click here!</summary>

If you're having trouble with the CD workflow:

1. Make sure your Express application code is correct
2. Check the YAML indentation in your workflow file
3. Remember that in a real scenario, you would replace the placeholder deployment steps with actual deployment actions

For the GitHub Environments feature, you may need to go to your repository settings and configure the environments manually.
</details>
