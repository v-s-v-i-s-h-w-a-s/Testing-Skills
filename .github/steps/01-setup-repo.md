# Step 1: Setting Up Your GitHub Repository for Actions

Welcome to the GitHub Actions Basics course! 👋 In this first step, we'll set up your repository to work with GitHub Actions.

## Learning Objectives

- Understand what GitHub Actions is and how it works
- Learn about the `.github/workflows` directory structure
- Create your first GitHub Actions workflow file

## What is GitHub Actions?

GitHub Actions is an automation platform that helps you build, test, and deploy your code directly from your GitHub repository. With GitHub Actions, you can automate your software development workflows using a variety of tools and services.

![GitHub Actions Overview](https://docs.github.com/assets/cb-25535/mw-1440/images/help/actions/overview-actions-simple.webp)

Key components of GitHub Actions include:

- **Workflows**: Automated procedures that you add to your repository
- **Events**: Specific activities that trigger workflows to run
- **Jobs**: Sets of steps that execute on the same runner
- **Steps**: Individual tasks that can run commands or actions
- **Actions**: Reusable units of code for workflows
- **Runners**: Servers that run your workflows

## Your Task: Create Your First Workflow File

1. Create a new branch called `setup-actions` from the main branch:

   ```bash
   git checkout -b setup-actions
   ```

2. Create a directory structure for GitHub Actions workflows:

   ```bash
   mkdir -p .github/workflows
   ```

3. Create a new file called `.github/workflows/hello-world.yml` with the following content:

   ```yaml
   name: Hello World

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     hello:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout repository
         uses: actions/checkout@v3
         
       - name: Say Hello
         run: echo "Hello, GitHub Actions!"
         
       - name: Show Workflow Information
         run: |
           echo "Repository: $GITHUB_REPOSITORY"
           echo "Branch: $GITHUB_REF"
           echo "Event: $GITHUB_EVENT_NAME"
   ```

4. Commit your changes and push to your branch:

   ```bash
   git add .github/workflows/hello-world.yml
   git commit -m "Add Hello World workflow"
   git push -u origin setup-actions
   ```

5. Create a pull request from the `setup-actions` branch to the `main` branch.

6. Merge the pull request to trigger the workflow.

## What's Happening?

The workflow you just created will run whenever changes are pushed to the `main` branch or when a pull request is opened against the `main` branch. It performs three steps:

1. Checks out your repository code
2. Prints a "Hello, GitHub Actions!" message
3. Displays information about the workflow run

## Validation Criteria

I'll check for the following to consider this step complete:

- The `.github/workflows` directory exists
- The `hello-world.yml` file exists with the correct content
- The workflow has been successfully triggered at least once

## Next Steps

Once this step is complete, we'll move on to creating a more advanced workflow that implements continuous integration.

Do you have any questions about this step? I'm here to help!

---

<details>
<summary>Need a hint? Click here!</summary>

Make sure the YAML indentation in your workflow file is correct. YAML is very sensitive to proper indentation.

Also, ensure that the file is saved in the correct location: `.github/workflows/hello-world.yml`.

If you're getting errors when pushing your branch, you might need to authenticate with GitHub. Try running:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

</details>
