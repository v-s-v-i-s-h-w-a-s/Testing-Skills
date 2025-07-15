# Troubleshooting Guide - GitHub Actions Basics Course

This guide helps you resolve common issues that may arise during the GitHub Actions Basics course.

## General Issues

### Issue: I can't see the next step instructions

**Solution:**
1. Check that you've completed all requirements for the current step
2. Make sure you've pushed your changes to the correct branch
3. Allow a minute or two for the GitHub Actions workflow to run
4. Refresh the issue page to see new comments

### Issue: Workflow isn't running after I push changes

**Solution:**
1. Verify you pushed to the correct branch specified in the instructions
2. Check the Actions tab in your repository to see if there are any failed workflows
3. Ensure that GitHub Actions is enabled in your repository settings
4. Check that your workflow file is in the correct location (`.github/workflows/`)

## Step 1 Issues

### Issue: "setup-actions" branch not being detected

**Solution:**
1. Make sure you created the branch with the exact name `setup-actions` (check for typos)
2. Verify you pushed the branch to your GitHub repository with `git push -u origin setup-actions`
3. Check that your workflow file is named exactly `hello-world.yml`

### Issue: Hello World workflow validation fails

**Solution:**
1. Make sure the workflow file is in the correct location: `.github/workflows/hello-world.yml`
2. Check your YAML syntax for errors (indentation is important)
3. Verify the content matches what was specified in the instructions

## Step 2 Issues

### Issue: CI workflow failing

**Solution:**
1. Check for JavaScript syntax errors in your app.js and app.test.js files
2. Ensure your package.json has all the required dependencies
3. Make sure your tests are passing locally with `npm test`
4. Verify that your ESLint configuration is correct

### Issue: Node.js matrix strategy not working

**Solution:**
1. Check the syntax of your matrix configuration in the workflow file
2. Make sure you're using supported Node.js versions
3. Ensure you've properly set up the cache for npm

## Step 3 Issues

### Issue: PR not being detected for CD workflow

**Solution:**
1. Make sure your PR is from `feature-branch` to `main`
2. Verify that you've included all the required files (server.js, server.test.js, etc.)
3. Check that your workflow file is named exactly `cd-workflow.yml`
4. Ensure your PR title and description don't contain any special characters

### Issue: Environment URLs not showing up

**Solution:**
1. Make sure you've correctly set the environment URLs in your workflow outputs
2. Check that you have permissions to create environment variables
3. Verify the syntax of your environment configuration

## Step 4 Issues

### Issue: AGILE-SCRUM label not being detected

**Solution:**
1. Make sure you've created an issue with the exact label `agile-scrum` (all lowercase with a hyphen)
2. Verify that the issue has the correct title and description
3. Try removing and re-adding the label if it's not being detected

### Issue: Project board not showing up

**Solution:**
1. Make sure you've created a project board with "AGILE-SCRUM" in the name
2. Check that you've set up all the required columns
3. Make sure your project is visible and public
4. Verify that you have the necessary permissions to create projects

## Step 5 Issues

### Issue: Final workflow not being detected

**Solution:**
1. Make sure your PR from `feature-branch` to `main` has been merged
2. Verify that you've created the optimized workflow file
3. Check that the workflow file has all the required components
4. Make sure the file is in the correct location: `.github/workflows/optimized-ci-cd.yml`

### Issue: Course not marked as complete

**Solution:**
1. Verify that all previous steps have been completed successfully
2. Check the Actions tab to see if there are any pending or failed workflows
3. Make sure all your PRs have been merged
4. Refresh the course issue to see if there are any new comments

## GitHub Actions Specific Issues

### Issue: Actions limited by permissions

**Solution:**
1. Check your workflow permissions configuration
2. Make sure your workflow has the necessary permissions for the tasks it's performing
3. Verify that you have the correct permissions in your repository settings

### Issue: Secret values not being used correctly

**Solution:**
1. Ensure you've added all required secrets in your repository settings
2. Check that you're referencing secrets correctly with `${{ secrets.SECRET_NAME }}`
3. Make sure you're not exposing secret values in logs

### Issue: Workflow syntax errors

**Solution:**
1. Use a YAML validator to check your workflow syntax
2. Pay close attention to indentation in your YAML files
3. Check for missing or misplaced quotes, brackets, or parentheses
4. Verify that all required fields are present

## Getting Additional Help

If you're still experiencing issues:

1. Check the GitHub Actions documentation at https://docs.github.com/en/actions
2. Look for similar issues in the repository's Issues tab
3. Create a new issue with details about your problem
4. Include screenshots or links to your workflow runs
5. Describe what you've already tried to fix the problem

---

If you find an issue that's not covered in this guide, please let us know so we can update it for future students!
