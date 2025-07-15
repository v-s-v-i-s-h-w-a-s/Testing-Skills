# Step 5: Finalizing Your GitHub Actions Workflows and Best Practices

Excellent job implementing AGILE-SCRUM practices with GitHub! 🏆 Now, let's finalize your GitHub Actions knowledge with some advanced features and best practices.

## Learning Objectives

- Learn advanced GitHub Actions features
- Understand workflow optimization techniques
- Implement security best practices
- Create reusable workflows and composite actions

## Advanced GitHub Actions Features

### 1. Workflow Concurrency

Sometimes you want to limit how many instances of your workflow can run at the same time. This is especially important for deployment workflows:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

# Limit to one concurrent deployment
concurrency:
  group: production-deployment
  cancel-in-progress: false
```

### 2. Workflow Dispatch for Manual Triggers

Create a workflow that can be triggered manually with custom inputs:

1. Create a file called `.github/workflows/manual-deployment.yml`:

```yaml
name: Manual Deployment

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      debug:
        description: 'Enable debug mode'
        required: false
        type: boolean
        default: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment }}
    
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
        
      - name: Enable debug mode
        if: ${{ github.event.inputs.debug == 'true' }}
        run: |
          echo "Debug mode enabled"
          env | sort
          
      - name: Deploy to ${{ github.event.inputs.environment }}
        run: |
          echo "Deploying to ${{ github.event.inputs.environment }} environment"
          # Your deployment commands here
```

### 3. Create a Reusable Workflow

Reusable workflows allow you to avoid duplicating code across multiple workflow files:

1. Create a file called `.github/workflows/reusable-node-setup.yml`:

```yaml
name: Reusable Node.js Setup

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        default: '18.x'
        type: string
    outputs:
      node-path:
        description: "The path to the installed Node.js"
        value: ${{ jobs.setup.outputs.node-path }}

jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      node-path: ${{ steps.node-setup.outputs.node-path }}
      
    steps:
      - name: Setup Node.js
        id: node-setup
        uses: actions/setup-node@v3
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
          
      - name: Get Node.js path
        run: echo "node-path=$(which node)" >> $GITHUB_OUTPUT
```

2. Now you can use this workflow in other workflows:

```yaml
name: Use Reusable Workflow

on:
  push:
    branches: [ main ]

jobs:
  call-setup:
    uses: ./.github/workflows/reusable-node-setup.yml
    with:
      node-version: '16.x'
  
  build:
    needs: call-setup
    runs-on: ubuntu-latest
    steps:
      - name: Use node path from previous job
        run: |
          echo "Node.js path: ${{ needs.call-setup.outputs.node-path }}"
```

### 4. Create a Composite Action

Composite actions are reusable units that can be shared across workflows:

1. Create a directory structure for your action:

```
.github/
  actions/
    setup-project/
      action.yml
```

2. Create the `action.yml` file:

```yaml
name: 'Setup Project'
description: 'Sets up Node.js and installs dependencies'
inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '18.x'
  install-command:
    description: 'Command to install dependencies'
    required: false
    default: 'npm ci'

runs:
  using: "composite"
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'
        
    - name: Install dependencies
      shell: bash
      run: ${{ inputs.install-command }}
```

3. Use the composite action in a workflow:

```yaml
name: Use Composite Action

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Setup project
        uses: ./.github/actions/setup-project
        with:
          node-version: '16.x'
          install-command: 'npm ci --production'
```

## GitHub Actions Security Best Practices

### 1. Limit Permissions

Always use the principle of least privilege for workflow permissions:

```yaml
name: Limited Permissions Workflow

on:
  push:
    branches: [ main ]

# Limit permissions to only what's necessary
permissions:
  contents: read
  issues: write

jobs:
  secure-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
```

### 2. Secure Environment Variables

For sensitive information, use GitHub Secrets and limit their exposure:

```yaml
name: Secure Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Use API key securely
        run: |
          # Don't print the secret
          # Bad: echo ${{ secrets.API_KEY }}
          
          # Good: Use it without exposing it
          curl -H "Authorization: Bearer ${{ secrets.API_KEY }}" https://api.example.com
```

### 3. Pin Actions to Specific Versions

Always use specific versions (preferably SHA commits) for third-party actions:

```yaml
steps:
  # Bad: Using major version only
  - uses: actions/checkout@v3
  
  # Good: Using specific version
  - uses: actions/checkout@v3.5.3
  
  # Best: Using SHA commit
  - uses: actions/checkout@a81bbbf8298c0fa03ea29cdc473d45769f953675
```

## Workflow Optimization

### 1. Cache Dependencies

```yaml
- name: Cache npm dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 2. Skip Unnecessary Steps

Use conditional execution to skip steps when possible:

```yaml
- name: Run tests
  if: ${{ !contains(github.event.head_commit.message, '[skip tests]') }}
  run: npm test
```

## Your Task: Create an Optimized Workflow

1. Create a comprehensive workflow file called `.github/workflows/optimized-ci-cd.yml` that incorporates the best practices mentioned above:

```yaml
name: Optimized CI/CD Pipeline

on:
  push:
    branches: [ main, feature-*, release-* ]
  pull_request:
    branches: [ main, release-* ]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

# Limit concurrent deployments
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

# Limit permissions
permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  lint-and-test:
    name: Lint and Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Cache npm dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
        continue-on-error: false
      
      - name: Run tests
        if: ${{ !contains(github.event.head_commit.message, '[skip tests]') }}
        run: npm test
      
      - name: Upload test coverage
        uses: actions/upload-artifact@v3
        with:
          name: code-coverage
          path: coverage
          retention-days: 7

  build:
    name: Build Application
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci --production
      
      - name: Build application
        run: npm run build
      
      - name: Package application
        run: |
          tar -czf app-bundle.tar.gz dist node_modules package.json
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: app-bundle
          path: app-bundle.tar.gz
          retention-days: 1

  deploy-staging:
    name: Deploy to Staging
    if: github.event_name == 'push' || github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'staging'
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging-example.com
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: app-bundle
      
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment..."
          # In a real scenario, you would use your actual deployment commands here
          echo "Deployed successfully to staging!"

  deploy-production:
    name: Deploy to Production
    if: (github.event_name == 'push' && github.ref == 'refs/heads/main') || (github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'production')
    needs: [build, deploy-staging]
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://production-example.com
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: app-bundle
      
      - name: Deploy to production
        run: |
          echo "Deploying to production environment..."
          # In a real scenario, you would use your actual deployment commands here
          echo "Deployed successfully to production!"
      
      - name: Create deployment notification
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number || (context.payload.pull_request ? context.payload.pull_request.number : null),
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Deployment to production was successful!'
            })
```

2. Create a new pull request from your `feature-branch` to the `main` branch if you haven't already done so.

3. Merge the pull request to complete the course.

## Validation Criteria

I'll check for the following to consider this step complete:

- The optimized workflow file exists with proper security practices
- The reusable workflow or composite action is correctly implemented
- The pull request from `feature-branch` to `main` has been merged

## Course Completion

Once you've completed all five steps of this course, you'll have mastered the fundamentals of GitHub Actions and learned how to:

- Set up basic and advanced workflows
- Implement CI/CD pipelines
- Apply AGILE-SCRUM methodologies using GitHub tools
- Follow best practices for GitHub Actions security and optimization

You'll be well-equipped to automate your development workflows and integrate modern software development practices into your projects.

Congratulations on making it this far! 🎓

---

<details>
<summary>Need a hint? Click here!</summary>

If you're having trouble with this final step:

1. Make sure your YAML indentation is correct in all workflow files
2. Verify that you have the correct file structure for composite actions
3. Check that you're using the correct syntax for workflow permissions and concurrency

Remember, in a real project, you would tailor these workflows to your specific needs and deployment targets.
</details>
