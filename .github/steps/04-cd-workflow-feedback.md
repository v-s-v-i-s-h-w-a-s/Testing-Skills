# Step 4: Implementing AGILE-SCRUM with GitHub

Great progress so far! 🌟 You've set up CI/CD pipelines using GitHub Actions. Now, let's explore how to implement AGILE-SCRUM methodologies using GitHub's built-in project management features.

## Learning Objectives

- Understand AGILE-SCRUM principles and how they apply to GitHub
- Set up a GitHub Project board for sprint planning
- Learn how to manage issues, pull requests, and milestones for AGILE workflows
- Automate project management with GitHub Actions

## What is AGILE-SCRUM?

AGILE is a set of principles for software development that values:
- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

SCRUM is a framework within AGILE that organizes work into fixed-length iterations called sprints, typically 1-4 weeks long.

## Your Task: Set Up AGILE-SCRUM Practices

1. Create a new issue titled "AGILE-SCRUM Implementation" with the label `agile-scrum`:

   - Go to the "Issues" tab in your repository
   - Click "New issue"
   - Enter "AGILE-SCRUM Implementation" as the title
   - In the description, write:
     ```
     As part of our GitHub Actions Basics course, we're implementing AGILE-SCRUM methodologies using GitHub's project management tools.
     
     - [ ] Create a GitHub Project board
     - [ ] Set up sprint columns
     - [ ] Create user stories as issues
     - [ ] Assign story points
     - [ ] Plan a sprint
     ```
   - Add the label `agile-scrum` to the issue
   - Click "Submit new issue"

2. Create a GitHub Project board:

   - Go to the "Projects" tab in your repository
   - Click "Create project"
   - Choose "Board" as the template
   - Name it "AGILE-SCRUM Demo"
   - Click "Create"

3. Set up your board with the following columns:

   - **Backlog**: Stories that are not yet scheduled
   - **Sprint Planning**: Stories selected for the upcoming sprint
   - **In Progress**: Stories currently being worked on
   - **Review**: Stories waiting for code review or testing
   - **Done**: Completed stories

4. Create the following user stories as issues:

   - Issue 1: "As a user, I want to perform basic calculations"
   - Issue 2: "As a developer, I want automated testing for my code"
   - Issue 3: "As a team lead, I want continuous deployment to staging"
   - Issue 4: "As a product owner, I want a release approval process"

5. Add your issues to the project board and organize them into the appropriate columns.

6. Create a milestone called "Sprint 1" and assign the first two issues to it.

7. Create a second milestone called "Sprint 2" and assign the remaining two issues to it.

8. Update your original "AGILE-SCRUM Implementation" issue with a comment detailing your progress.

## GitHub Project Automation

GitHub Projects can be automated with Actions. Let's create a workflow that automatically moves issues based on their status.

Create a file called `.github/workflows/project-automation.yml`:

```yaml
name: Project Board Automation

on:
  issues:
    types: [opened, reopened, closed, labeled, unlabeled]
  pull_request:
    types: [opened, reopened, closed, review_requested]

jobs:
  automate_projects:
    runs-on: ubuntu-latest
    steps:
      - name: Move new issues into Backlog
        if: github.event_name == 'issues' && github.event.action == 'opened'
        uses: alex-page/github-project-automation-plus@v0.8.3
        with:
          project: AGILE-SCRUM Demo
          column: Backlog
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Move issues with 'in-progress' label to In Progress
        if: github.event_name == 'issues' && github.event.action == 'labeled' && github.event.label.name == 'in-progress'
        uses: alex-page/github-project-automation-plus@v0.8.3
        with:
          project: AGILE-SCRUM Demo
          column: In Progress
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Move closed issues to Done
        if: github.event_name == 'issues' && github.event.action == 'closed'
        uses: alex-page/github-project-automation-plus@v0.8.3
        with:
          project: AGILE-SCRUM Demo
          column: Done
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Move PRs awaiting review into Review column
        if: github.event_name == 'pull_request' && github.event.action == 'review_requested'
        uses: alex-page/github-project-automation-plus@v0.8.3
        with:
          project: AGILE-SCRUM Demo
          column: Review
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## Daily Stand-ups with GitHub Discussions

AGILE-SCRUM teams typically have daily stand-up meetings. You can simulate this using GitHub Discussions:

1. Go to the "Discussions" tab in your repository (enable it in repository settings if not available)
2. Create a new discussion category called "Stand-ups"
3. Create a new discussion called "Sprint 1 Stand-ups"
4. In the discussion, create a template for team members to fill out:

```
## Daily Stand-up Report

### What did I accomplish yesterday?
- 

### What will I work on today?
- 

### Are there any blockers or impediments?
- 

```

## Sprint Retrospectives

At the end of each sprint, AGILE-SCRUM teams conduct retrospectives. Create a discussion for this purpose:

1. Create a new discussion called "Sprint 1 Retrospective"
2. Use the following template:

```
## Sprint Retrospective

### What went well?
- 

### What could be improved?
- 

### Action items for the next sprint
- 

```

## Validation Criteria

I'll check for the following to consider this step complete:

- The "AGILE-SCRUM Implementation" issue is created with the `agile-scrum` label
- A GitHub Project board is set up with the correct columns
- At least 4 user stories are created as issues
- The `project-automation.yml` workflow file exists
- Milestones are created for sprint planning

## Next Steps

Once this step is complete, we'll move on to the final step where you'll finalize your GitHub Actions workflow and complete the course.

Do you have any questions about this step? I'm here to help!

---

<details>
<summary>Need a hint? Click here!</summary>

If you're having trouble with the GitHub Projects:

1. Make sure you've enabled Projects in your repository settings
2. For the project board automation, you might need to adjust the project name in the workflow file to match your actual project name
3. If you're using GitHub's new Projects experience, some of the automation steps might need to be adjusted

Remember that in a real team environment, you would typically involve all team members in sprint planning, backlog grooming, and retrospectives.
</details>
