# Git tldr
The basic git commands along with a short explainaion are provided here for convenience.


Check out some the guides below from atlassian's tutorial site.

#### Atlassian Git Guides:
+ [_Starting Guide_](https://www.atlassian.com/git/tutorials/setting-up-a-repository "Getting Started")

+ [_Branches Guide_](https://www.atlassian.com/git/tutorials/using-branches "Branch Tutorial")

+ [_Workflow Guide_](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

![Branching example](https://datasift.github.io/gitflow/GitFlowReleaseBranch.png)
Workflow Example


## Basic Git Commands

### Starting
```git
git init
git remote add origin git@github.com:...
```
**Remote** is gits connection to the outside.

**Origin** is a name you define here to refer to the external repo, i.e. pushing to the remote named origin means pushing local changes to the external repo

### Most Used
```git
git status
git log
git add .
git commit -m "description"
git push -u <remote> <branch>
```

## Branching
Were using [branches](https://www.atlassian.com/git/tutorials/using-branches "Branch Tutorial") to organize updates and keep things clean and sane.


#### Starting
Create a new branch to start a new feature
```git
git branch <branch>
git checkout <branch>
git fetch <remote> <branch> or --all
```
**Checkout** to switch branches

**Fetch** update branches

### Merging Branches
![img](https://www.atlassian.com/dam/jcr:83323200-3c57-4c29-9b7e-e67e98745427/Branch-1.png)
Merge the branch to main branch when its complete.

To merge feature into develop:

```git
git checkout develop
git merge feature
```

If conflicts arise, changes need to be made in code to resolve them. To locate the issues use:

```git
git log --merge
```

### Deleting
Delete the branch after the work for it is done and has been merged:
```git
git branch -d <branch>
```
