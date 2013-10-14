---
layout: post
title:  'Getting started with Chef'
date:   2013-10-13
---

It seems like there are tons of articles about getting started with [Chef][chef] and a whole bunch
of documentation on the [Opscode website][chef], but I do not think that it is enough. Given all of
the resources out there dedicated to helping people learn Chef, it still seems very difficult.

I began using chef about 2 years ago and at the time it seemed very overwhelming to try to grasp all
of the concepts being introduced in the chef documentation. At the time, having a dedicated chef server
seemed like overkill so I opted to use [Chef Solo][chef-solo]. That has worked great, however once you
grow the number of servers that you manage from 2 to somewhere around 20 it gets to be a bit tedious. Now
I am ready to move to full blown chef and have a dedicated server manage the rest of my servers.

Before I begin walking through the step by step instructions there are a few things that you will need to
know up front. First, if you are going to follow along with me you will need at least 2 servers as well as
a workstation. I am going to be using [Rackspace][rackspace] to spin up all of the machines that I will need.
These machines represent your development machine, your chef server and your production server (be it a web
server, database server or whatever else it may be).

### Step 1: Spin up the machines

I am going to be using Rackspace, as I mentioned before and I am creating 3 machines using the Ubuntu 12.04
image with 20 GB of disk space and 512 MB of ram.

Before you go any further, there is one quick thing to set up that will make things work a bit more smoothly.
Log on to each of the machines and edit the `/etc/hosts` file to contain the following:
{% highlight bash %}
IP_OF_CHEF_MACHINE chef-server
{% endhighlight %}
(Make sure you replace IP_OF_CHEF_MACHINE with the actual IP address) This is so that we do not have to mess
with setting up any DNS stuff for the time being.

### Step 2: Set up the [Chef server][chef-server]

This process actually is very simple. [This][install-chef-server] is a great resource for setting up a chef
server, however around step 9 things started getting confusing. Here are the steps to get the chef server up
and running.

* ssh to your chef-server box.
* download the chef server installer (In my case I am using [this one][chef-server-installer]) like this:
{% highlight bash %}
$ wget https://opscode-omnibus-packages.s3.amazonaws.com/ubuntu/12.04/x86_64/chef-server_11.0.8-1.ubuntu.12.04_amd64.deb
{% endhighlight %}
* run the install, like this:
{% highlight bash %}
$ dpkg -i chef-server_11.0.8-1.ubuntu.12.04_amd64.deb
{% endhighlight %}
* run the following command:
{% highlight bash %}
$ sudo chef-server-ctl reconfigure
{% endhighlight %}
* verify everything is working like this:
{% highlight bash %}
$ sudo chef-server-ctl test
{% endhighlight %}

That is it! Your chef server is now up and running. Now if you open up `https://chef-server`
in your browser, you should see a page that looks like this one (if you do not, you may need to update your `/etc/hosts` file):
![Chef Server UI](/assets/images/chef-server.png)

If you notice on the right-hand side there are some instructions for logging in for the first time. Follow
those instructions and you will be prompted to change the admin password and regenerate your private key. After
completing that you should see a page that looks like this:

![Chef Server UI](/assets/images/chef-server-loggedin.png)

Before we move onto the next step, lets create a new client that we will use in some future steps. Click on the
clients tab, then click create. Choose a user name (I am going to call this client `test`) and go ahead and
check the `admin` checkbox. After submitting that form, you will be given a public and private key. Save those,
you will need them again soon.

### Step 3: Set up a workstation

* Log onto your workstation box (or you can also just use your local machine).
* Make sure you have Ruby installed, I reccomend using [rvm][rvm].
* Install Chef using this command: `gem install chef`
* Verify that you have the knife command by typing `knife`
* Create a directory that will be used to store all of your chef configuration. I am calling mine `chef`.
* `cd` into your newly created directory
* Configure knife using the command `knife configure`. This will prompt you multiple times:
   * Where should I put the config file? (I am entering `knife.rb`)
   * Please enter the chef server URL: (I am entering https://chef-server)
   * Please enter an existing username or client name for the API: (I am entering `test`)
   * Please enter the validation clientname: (I am using `test` for this one also)
   * Please enter the location of the validation key: (I am entering `test.pem` - more on this in a minute)
   * Please enter the path to a chef repository (I am leaving this blank)

* At this point you should have a file called `knife.rb` in your directory that looks like this:
{% highlight ruby %}
log_level                :info
log_location             STDOUT
node_name                'test'
client_key               '/root/chef/test.pem'
validation_client_name   'test'
validation_key           '/root/chef/test.pem'
chef_server_url          'https://chef-server'
syntax_check_cache_path  '/root/chef/syntax_check_cache'
{% endhighlight %}

* To keep things simple I am going to modify this file slightly so that it looks like this:
{% highlight ruby %}
log_level                :info
log_location             STDOUT
node_name                'test'
client_key               'test.pem'
validation_client_name   'test'
validation_key           'test.pem'
chef_server_url          'https://chef-server'
syntax_check_cache_path  'syntax_check_cache'
{% endhighlight %}

* Remember when we created the `test` admin user and saved the public and private keys? Copy
the private key and save it in the directory with your `knife.rb` file and name it `test.pem`.

* At this point you should have a directory with 2 files in it. `knife.rb` and `test.pem`. Everything
that you need should be configured now. To test that everything is working run the following command:
{% highlight bash %}
$ knife client list
{% endhighlight %}
You should see 3 things:
{% highlight bash %}
chef-validator
chef-webui
test
{% endhighlight %}

This means that our workstation can talk to our chef server via the knife command line tool. The next
step is to get some cookbooks.

### Step 4: Get some cookbooks

There is a lot of information that I am going to gloss over here. Really, the only thing that you need
to know is that cookbooks is how recipes are distributed and recipes are what contain the instructions
that will be run on the target server(s). You can read more about chef cookbooks and what they are made
of [here][cookbooks].

You will be on your workstation using the knife command.

* Create a `cookbooks` directory inside of your `chef` directory that we created when you set up your workstation
* Create a `.gitkeep` dummy file inside of the cookbooks directory
* Add the following line to your `knife.rb` file:
{% highlight ruby %}
cookbook_path 'cookbooks'
{% endhighlight %}
* Create a new git repo in your `chef` directory that we created when we set up your workstation
* Add your `knife.rb` file and your `cookbooks/.gitkeep` file to git and commit them.
* Get the chef-client cookbook
{% highlight bash %}
knife cookbook site install chef-client
{% endhighlight %}

This will download the `chef-client` cookbook from the opscode community site as well as any other cookbooks
which it may require as dependents.

* Upload these cookbooks to your chef server using this command:
{% highlight bash %}
knife cookbook upload --all
{% endhighlight %}

You should see something like this:
{% highlight bash %}
Uploading chef-client   [3.1.0]
Uploading cron          [1.2.8]
Uploading logrotate     [1.4.0]
Uploaded all cookbooks.
{% endhighlight %}

When you pull up `https://chef-server/cookbooks` in your browser you should see something like this:
![Chef Cookbooks](/assets/images/chef-server-cookbooks.png)

At this point we have successfully set up a chef server and a workstation where we can interact with the
server. We have published some cookbooks to our chef server and now we are ready for the final step. We
need to tell the chef server to set up our production box the way we want.

### Step 5: Use Chef to install some stuff

So far, we have used 2 of our 3 machines. We have used our workstation machine to run the knife command,
and we used the chef server machine to install the chef server. Now it is time that we do something with
our last machine.

* The first step is getting chef-client running on it. Chef client will check in with the chef server from
time to time to see if there are any updates or new cookbooks that need to be installed. To start chef-client
run the following command from the workstation machine (just substitute the IP address, username and password):
{% highlight bash %}
knife bootstrap IP_OF_PROD_SERVER --ssh-user USER --ssh-password SSH_PASSWORD --run-list 'recipe[chef-client]' -j '{"chef_client": {"interval": 5}}'
{% endhighlight %}

If you go out to `https://chef-server/status` you should now see something like this:
![Chef Node](/assets/images/chef-node.png)

The command that we just executed ran the chef-client cookbook on our production server and set the check in interval to 5 minutes.

Lets say that we want to install nginx on our production server.

* First, we need to get the nginx cookbook.
{% highlight bash %}
knife cookbook site install nginx
{% endhighlight %}
* Then we need to upload it to our chef server
{% highlight bash %}
knife cookbook upload --all
{% endhighlight %}
* Then we need to add the nginx recipe to our production run list
{% highlight bash %}
knife node run_list add prod-server 'recipe[nginx]'
{% endhighlight %}

That should be it. Once your production server checks in with the chef server again it will have nginx installed.
Then you should be able to hit the IP address of your production server in a browser and see the default nginx 404.

It is not really anything great, but I hope you can see the possibilities. If you made it all the way through, then
you should have been able to successfully setup a production server without having to ever log onto it (with the exception
of the hosts file hack that we did early on - which you would not really do for a real server).

I hope this helps!


[chef]: http://www.opscode.com/chef/
[chef-solo]: http://docs.opscode.com/chef_solo.html
[chef-server]: http://docs.opscode.com/chef_overview_server.html
[rackspace]: http://www.rackspace.com/
[install-chef-server]: http://docs.opscode.com/install_server.html
[chef-server-installer]: https://opscode-omnibus-packages.s3.amazonaws.com/ubuntu/12.04/x86_64/chef-server_11.0.8-1.ubuntu.12.04_amd64.deb
[rvm]:https://rvm.io/
[cookbooks]: http://docs.opscode.com/essentials_cookbooks.html
