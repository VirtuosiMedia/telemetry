# Sample AngularJS Login Application

This is a sample development environment setup with bare bones login application built with AngularJS. The environment setup relies on a number of technologies including VirtualBox, Vagrant, Ansible, NodeJS, Grunt, and Bower. All of those technologies work together to create a consistent development environment with a good development workflow and the ability to have clean dependency management, run tests, build docs, and create a build package to be deployed to a production server.

## Installation

Once each dependency has been installed, upgrades and the development workflow will be streamlined and low impact. These instructions assume OSX, but may work for Linux too with slight adaptation.

### Dependencies

Each of these should be installed globally.

1. [Install Vagrant](https://www.vagrantup.com/downloads.html).
2. [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads).
3. [Install Ansible](http://docs.ansible.com/ansible/intro_installation.html).
4. [Install NodeJS](https://nodejs.org/en/download/stable/). If Node is already installed, make sure it's updated to the latest version.
5. [Install Bower](http://bower.io/#install-bower).
6. Clone this repository to your local machine.

### Environment Setup

First, let's set up the development environment. Starting in the root directory of the application, run the following commands in the console:

```
cd configuration
vagrant up
ansible-playbook setup.yml
```

This will spool up a virtual machine that will run all of the application code. It downloads an Ubuntu 12.04 LTS 64-bit image and install nginx and NodeJS on it. It also maps the `source` directory on your local machine to the `app` directory on the VM, so any changes you make locally will automatically be reflected on the VM. 

The `configuration` directory contains all of the environment configuration files that will be needed to spin up the VM. These files are lightweight and can be stored in source control so that every developer has access to the same development environment. If there are changes to the configuration, one simply needs to run `vagrant destroy` in the `configuration` directory, fetch the changes from the repository, and repeat the commands above.

The next step will be to get SSH access. First, create a `~/.ssh/config` file if it does not already exist. Then, run the following command:

```
vagrant ssh-config
```

Copy the output and paste it into `~/.ssh/config`. Save the file. Now you should be able to SSH into the virtual machine simply by typing `ssh telemetry`. In this case, `telemetry` is the name of the virtual machine. This will only need to be done once, even if the VM has been built and destroyed multiple times.

Now we need to retrieve the IP address for the VM so that the server can be accessed via the browser.

```
ssh telemetry
ifconfig
```

The output of the `ifconfig` command will show the IP address we need under the `eth1` section, second line down, labeled `inet addr:`. Copy the IP address and exit the VM by simply typing `exit`. You can paste the IP address into your browser and, if everything has been installed correctly, it should show the sample AngularJS application.

We can take this a step further, though, and [edit the hosts file](http://www.tekrevue.com/tip/edit-hosts-file-mac-os-x/) for your local machine to create an easy to remember alias for the IP address. To do this, open up `/private/etc/hosts` (on OSX), scroll to the bottom, and add the IP address, followed by a space and then `telemetry.dev`. Save the file and now you should be able to access the VM via `telemetry.dev` in your browser.

**Note**: The current Vagrant configuration of this app assumes a wireless network setup, which may cause the IP to be dynamic, depending on your network configuration. If you are unable to access the IP address later, you may need to reverify the IP by SSHing back into the VM and editing the hosts file again. Vagrant can, however, be easily configured to use a static IP instead.

### Dependency Management

The development workflow and build process rely on proper dependency management, so let's install the remainder of the tools we'll need to set that up. There are 3 directories that are implied by this application infrastructure that are not tracked by git: `bower_components`, `docs`, and `node__modules`. The reason they are not tracked is because they can easily be reconstructed and updated given the configuration files that are already present in the repository, so storing them isn't necessary. This cuts down on project complexity and ensures a cleaner process. We can install/update all dependencies with a single command:

```
npm install
```

This will install all Node dependencies and then will run Bower when it is finished. The dependencies are handled in `package.json` and `bower.json` respectively. If the version of a dependency needs to be incremented, it can be done simply by editing one of those two files.

## Development Workflow

The majority of the development environment setup should only need to be done once. Once setup, the development workflow becomes very easy thanks to Grunt, a task runner. First, let's talk about its current configuration and then about what else can be done. The current configuration allows you to:

- Lint all JavaScript files.
- Create a build package that concatenates and minifies all application JavaScript files into a single file.
- The build package also copies the latest AngularJS files from the dependency folders. These aren't concatenated with the app files as they may already be cached in the user's browser.
- Auto-generate documentation according to the JSDoc syntax.
- Run unit tests on demand and as part of the build process.

In addition to Grunt, there is also a custom JavaScript file included, `source/assets/javascript/manifest.js` that dynamically loads app files individually or the concatenated app file depending on the environment. The environment toggle is currently manually toggleable, but it could be relegated to an environmental variable that is dependent on the machine it is running on. Also, the file list in `manifest.js` is currently hardcoded, but it could be generated automatically as a part of the build process.

The commands for using Grunt are simple and should be run from the root application directory:

- `grunt test` - run the test suite.
- `grunt docs` - generate the docs.
- `grunt build` - generate the build package.

### Future Workflow Possibilities

Without going into great detail, here are a few more things that could be automated with Grunt:

- End to end tests (E2E) using Protractor or Selenium.
- LESS/SASS compilation.
- CSS concatenation and minification.
- Web font compilation.
- Image compression.
- Run select commands whenever specified files are changed or when files are added/removed from specified directories.
- Custom template interpolation for localization purposes.

## Known Issues

Because this project was my first experience with AngularJS/Karma/Jasmine, I was unable to get the test suite running properly, so the tests have been disabled from the Grunt commands. I believe I am close and that a few small changes to a few lines of code would get it working properly, but unfortunately every bit of documentation or tutorial I found only covered a Hello World or a ToDo List app and they all seemed to use slightly different syntaxes. The problem appears to be that the test dependencies aren't properly being injected into the tests, but I wasn't able to uncover the reason in time given the incomplete documentation. However, given more time and/or a few helpful suggestions in the right direction, I am confident that I would be able to implement it successfully as I have written multiple unit testing suites before.

I also noticed that the default AngularJS email validation is incorrect as it does not require a domain extension. In an actual application, this could be fixed with a custom validator.

Given more time, I would also like to play more with the validation events in the login form. Ideally, both fields should display errors on an empty submit, an error should be display `onBlur` of an invalid field and the error should be removed (but not displayed) `onChange`. I am currently unsure of the proper Angular way of handling this use case, but suspect that it would require a good deal more investment to get working properly.

The UI design itself should be considered provisional and not a final polished representation.