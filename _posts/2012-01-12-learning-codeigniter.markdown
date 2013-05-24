---
layout: post
title:  "Learning CodeIgniter: Part 1"
date:   2012-01-12
---

I've been working on a project using PHP and Code Igniter recently. While I have
used both PHP and CodeIgniter in the past, this is the first project of this
scale that I've been involved with using said technologies.

When I first joined this project there was already an established codebase. PHP
and CodeIgniter were the primary technologies with the addition of Ruckusing for
database migrations, Capistrano for deployment and Mercurial hosted on BitBucket
for source control. Not a bad sounding set-up.

This post is undoubtedly going to fall into the tl;dr category, but I want to
spend some time digging into the Code Igniter framework and do some comparisons
and hopefully air some of my grievances related to not only the Code Igniter
framework, but also the PHP language in general. This is going to end up as a
multi-part post (as indicated by the "Part 1" in the title).

The first thing that I want to point out about CodeIgniter is the installation
process. It is extraordinarily simple to do, it essentially boils down to
unzipping CodeIgniter to a directory. While this is extremely easy and entirely
fool-proof, I cannot honestly imagine a worse way to install framework code. The
implications of this installation method are that every CodeIgniter project is a
fork of the CodeIgniter framework. Imagine upgrading from one version of
CodeIgniter to another (or just take a look at the instructions). Compare this to
a tool like pip for Python or gem for Ruby, it's not even a comparison. Running a
single command vs. following a set of instructions depending on your current
version and target version. It's ludicrous, and I don't understand how any self
respecting developer can be alright with this.

Alright, enough about my installation rant, let's take a look at some
functionality that CodeIgniter provides. Looking at the directory structure of a
CodeIgniter project, it seems very similar to Rails. In fact, according to the
CodeIgniter documentation it is very similar to Rails in that it offers an MVC
architecture, provides clean urls, and utilized a "modified version" of the
Active Record pattern. The major difference that I see when comparing CodeIgniter
and PHP to Rails and Ruby is that with Rails I don't have to write very much code
to get a lot done and with CodeIgniter, unfortunately, I do. Let's look at some
code.

Here is a simple controller action for a Rails app:

{% highlight ruby %}
def create
  @tag = Tag.new(params[:tag])
  if @tag.save
    redirect_to(@tag, :notice => 'Tag was successfully created.')
  else
    render :action => "new"
  end
end
{% endhighlight %}

Here is a similar controller action for a CodeIgniter app:
{% highlight php %}
<?
public function create()
{
    $this->load->helper('form');
    $this->load->helper('url');
    $this->load->library('session');
    $this->load->library('form_validation');
    $this->load->model('tags_model');
 
    $this->form_validation->set_rules('name', 'Name', 'required');
 
    if ($this->form_validation->run() === TRUE)
    {
        $data = array(
            'name' => $this->input->post('name')
        );
        $this->tags_model->db->insert('tags', $data);
        $this->session->set_flashdata('notice', 'Tag was successfully created.');
        redirect('/tags');
    }
    else
    {
        $this->load->view('tags/new');
    }
}
?>
{% endhighlight %}

Obviously, there are some pretty significant differences here. Granted, the
CodeIgniter source could be refactored to remove a majority of the noise, but
right out of the box none of that is done for you, whereas in Rails, it has
already been done. Also, there is a lot of extra noise added by PHP's syntax vs
Ruby's in this example. PHP's

{% highlight php %}
<?
public function create()
?>
{% endhighlight %}


compared to Ruby's
{% highlight ruby %}
def create
{% endhighlight %}


and CodeIgniter's
{% highlight php %}
<?
$this->load->model('tags_model');
$this->tags_model
?>
{% endhighlight %}
compared to Rails'
{% highlight ruby %}
Tag
{% endhighlight %}

Also, I've found that CodeIgniter's so-called "modified Active Record pattern" is
really not anything resembling the Active Record pattern at all. Essentially,
CodeIgniter's modified "Active Record" pattern is simply dependency injection of
a database handle into a model object. In the Rails example:
{% highlight ruby %}
@tag = Tag.new(params[:tag])
@tag.save
{% endhighlight %}

This creates a new Tag and saves it, which is abundantly clear by looking at the
code. In the CodeIgniter example:
{% highlight php %}
<?
$this->load->model('tags_model');
$data = array(
    'name' => $this->input->post('name');
);
$this->tags_model->db->insert('tags', $data); 
?>
{% endhighlight %}


we must load the model, map the data from the post data to a temporary location
that we will eventually use to insert into the database, use the tag model's db
attribute and call the insert method, give it the name of the table that we are
inserting into and an associative array of the column names and data we want
inserted. Phew, that reeks of unnecessary ceremony and is absolutely not anything
that resembles the Active Record pattern. But again, this could all be refactored
to look better it's just up to me to do it.

Interacting with CodeIgniter's "ORM" is pretty painful at best. It really amounts
to some sort of awkward PHP SQL wrapper code. To be honest, I'd much rather just
write sql then use a PHP API that mimic's SQL closely enough that I'm calling
db->insert, db->update, db->join, db->from, db->select, db->where, etc.

I have two last things to mention regarding CodeIgniter's database integration.
One is DataMapper and the other is Ruckusing. These two projects extend
CodeIgniter in different ways. DataMapper seems to fill some of the gap left by
the out-of-the-box CodeIgniter ORM, however I've had a lot of issues getting it
to just work the way it appears that it should. Ruckusing, on the other hand,
does a very good job of handling database migrations. While Ruckusing could use a
few helpers (similar to those provided by Rails and Django that are able to
generate migrations) the api is fairly clean and easy enough to use and write
migrations by hand.

This is where I will leave Part 1. There is much more to cover in future
installments including but not limited too hooks, routing, controllers and
alternative php syntax.
